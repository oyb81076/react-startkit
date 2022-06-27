import { SetStateAction, useCallback, useEffect, useReducer, useRef } from 'react';

export interface QueryResult<T> {
  loading: boolean;
  error: Error | null;
  data: T | undefined;
  refresh: () => void;
  mutation: (data: SetStateAction<T>) => void;
}

interface Options<T> {
  defaultValue?: T;
  fetchKey?: string | number | null;
}

function useQuery<T>(fetcher: () => Promise<T>): QueryResult<T>;
function useQuery<T, Variables>(
  fetcher: (args: Variables) => Promise<T>,
  variables: Variables,
  options?: Options<T>,
): QueryResult<T>;
function useQuery<T, Variables>(
  fetcher: (arg?: Variables) => Promise<T>,
  variables?: Variables,
  options?: Options<T>,
): QueryResult<T> {
  const defaultValue = options?.defaultValue;
  const hash = JSON.stringify(variables);
  const ref = useRef<RefObject<T, Variables>>({
    hash: null,
    variables,
    fetcher,
    key: 0,
    defaultValue,
    mount: true,
  });
  const [state, dispatch] = useReducer<QueryReducer<T>>(queryReducer, {
    loading: defaultValue === undefined,
    data: defaultValue,
    error: null,
  });
  useEffect(() => {
    ref.current.variables = variables;
    ref.current.fetcher = fetcher;
  });
  useEffect(() => {
    const { current } = ref;
    current.mount = true;
    return () => {
      current.mount = false;
    };
  }, []);

  const refresh = useCallback(() => {
    execute(ref, dispatch);
  }, []);
  useEffect(() => {
    if (hash !== ref.current.hash) {
      ref.current.hash = hash;
      if (ref.current.defaultValue !== undefined) {
        ref.current.defaultValue = undefined;
      } else {
        execute(ref, dispatch);
      }
    }
  }, [hash, options?.fetchKey]);
  const mutation = useCallback((value: React.SetStateAction<T>) => {
    dispatch({ type: 'mutation', value });
  }, []);
  return { loading: state.loading, error: state.error, data: state.data, refresh, mutation };
}

export default useQuery;

interface RefObject<T, Variables> {
  hash: string | null;
  fetcher: (arg?: Variables) => Promise<T>;
  variables: Variables | undefined;
  key: number;
  defaultValue: T | undefined;
  mount: boolean;
}

function execute<T, Variables>(
  ref: React.MutableRefObject<RefObject<T, Variables>>,
  dispatch: React.Dispatch<QueryAction<T>>,
) {
  const { current } = ref;
  current.key += 1;
  const { key, fetcher, variables } = current;
  dispatch({ type: 'pending' });
  fetcher(variables)
    .then(
      (data) => {
        if (current.mount && current.key === key) {
          dispatch({ type: 'success', data });
        }
      },
      (error: Error) => {
        if (current.mount && current.key === key) {
          dispatch({ type: 'fail', error });
        }
      },
    )
    .finally(() => {
      if (current.key === key) current.hash = null;
    });
}

export interface QueryState<T> {
  loading: boolean;
  data: T | undefined;
  error: Error | null;
}
interface Pending {
  type: 'pending';
}
interface Success<T> {
  type: 'success';
  data: T;
}
interface Mutation<T> {
  type: 'mutation';
  value: React.SetStateAction<T>;
}
interface Fail {
  type: 'fail';
  error: Error;
}
export type QueryReducer<T> = (state: QueryState<T>, action: QueryAction<T>) => QueryState<T>;
export type QueryAction<T> = Pending | Success<T> | Fail | Mutation<T>;
export function queryReducer<T>(state: QueryState<T>, action: QueryAction<T>): QueryState<T> {
  switch (action.type) {
    case 'pending':
      return state.loading ? state : { loading: true, data: state.data, error: state.error };
    case 'fail':
      return { loading: false, data: undefined, error: action.error };
    case 'success':
      return { loading: false, data: action.data, error: null };
    case 'mutation': {
      if (typeof action.value !== 'function') {
        return { loading: false, data: action.value, error: null };
      }
      if (state.data === undefined) {
        return state;
      }
      const value = (action.value as (obj: T) => T)(state.data);
      return { loading: false, data: value, error: null };
    }
    default:
      return state;
  }
}
