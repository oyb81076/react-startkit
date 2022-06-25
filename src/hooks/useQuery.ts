import React from 'react';

interface Result<T> {
  loading: boolean;
  error: Error | undefined;
  data: T | undefined;
  refresh: () => void;
}

function useQuery<R>(fetcher: () => Promise<R>): Result<R>;
function useQuery<R, Variables>(
  fetcher: (args: Variables) => Promise<R>,
  variables: Variables,
  options: { defaultValue?: R; fetchKey?: string | number | null },
): Result<R>;
function useQuery<R, Variables>(
  fetcher: (arg?: Variables) => Promise<R>,
  variables?: Variables,
  options?: { defaultValue?: R; fetchKey?: string | number | null },
): Result<R> {
  const { defaultValue, fetchKey } = options || {};
  const hash = JSON.stringify(variables);
  const ref = React.useRef({ variables, fetcher, key: {}, defaultValue });
  const [state, dispatch] = React.useReducer<React.Reducer<QueryState<R>, QueryAction<R>>>(
    queryReducer,
    { loading: defaultValue !== undefined, data: defaultValue, error: undefined },
  );
  React.useEffect(() => {
    ref.current.variables = variables;
    ref.current.fetcher = fetcher;
  });
  React.useEffect(
    () => () => {
      ref.current.key = {};
    },
    [],
  );

  const refresh = React.useCallback(() => {
    const key = {};
    ref.current.key = key;
    dispatch({ type: 'pending' });
    ref.current.fetcher(ref.current.variables).then(
      (data) => ref.current.key === key && dispatch({ type: 'success', data }),
      (error: Error) => ref.current.key === key && dispatch({ type: 'fail', error }),
    );
  }, []);
  React.useEffect(() => {
    if (ref.current.defaultValue !== undefined) {
      ref.current.defaultValue = undefined;
    } else {
      refresh();
    }
  }, [refresh, hash, fetchKey]);
  return { refresh, loading: state.loading, error: state.error, data: state.data };
}

export default useQuery;

export interface QueryState<T> {
  loading: boolean;
  data: T | undefined;
  error: Error | undefined;
}
interface Pending {
  type: 'pending';
}
interface Success<T> {
  type: 'success';
  data: T;
}
interface Fail {
  type: 'fail';
  error: Error;
}
export type QueryAction<T> = Pending | Success<T> | Fail;
export function queryReducer<T>(state: QueryState<T>, action: QueryAction<T>): QueryState<T> {
  switch (action.type) {
    case 'pending':
      return state.loading ? state : { loading: true, data: state.data, error: state.error };
    case 'fail':
      return { loading: false, data: undefined, error: action.error };
    case 'success':
      return { loading: false, data: action.data, error: undefined };
    default:
      return state;
  }
}
