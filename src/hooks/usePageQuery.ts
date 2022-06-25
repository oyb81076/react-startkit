import React from 'react';

import { Page } from 'src/models';
import { QueryAction, queryReducer, QueryState } from './useQuery';

type ParamType = string | Date | number | boolean | null | undefined;

export default function usePageQuery<P extends Record<keyof P, ParamType> & { total: number }, R>(
  fetcher: (args: P) => Promise<Page<R>>,
  variables: Omit<P, 'total'>,
  options: { fetchKey?: string | number | null },
): {
  loading: boolean;
  error?: Error;
  data?: Page<R>;
  refresh: () => void;
} {
  const { fetchKey } = options;
  const hash = JSON.stringify(variables);
  const [state, dispatch] = React.useReducer<
    React.Reducer<QueryState<Page<R>>, QueryAction<Page<R>>>
  >(queryReducer, { loading: true, data: undefined, error: undefined });
  const ref = React.useRef({
    variables,
    fetcher,
    key: {},
    countKey: '#',
    total: -1,
    fetchKey,
  });

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

  /**
   * 刷新的时候强制更新 total
   */
  const submit = React.useCallback((forceUpdateTotal: boolean) => {
    const key = {};
    ref.current.key = key;
    dispatch({ type: 'pending' });
    const { current } = ref;
    const countKey = getCountKey(current.variables);
    if (ref.current.countKey !== countKey) {
      ref.current.countKey = countKey;
      ref.current.total = -1;
    }
    const total = forceUpdateTotal ? -1 : ref.current.total;
    const args = { ...ref.current.variables, total } as P;
    dispatch({ type: 'pending' });
    ref.current.fetcher(args).then(
      (data) => {
        if (ref.current.countKey !== key) return;
        if (ref.current.key === countKey) ref.current.total = data.total;
        dispatch({ type: 'success', data });
      },
      (error: Error) => {
        if (ref.current.countKey !== key) return;
        dispatch({ type: 'fail', error });
      },
    );
  }, []);
  const refresh = React.useCallback(() => submit(true), [submit]);
  React.useEffect(() => {
    submit(ref.current.fetchKey !== fetchKey);
    ref.current.fetchKey = fetchKey;
  }, [submit, hash, fetchKey]);
  return { refresh, loading: state.loading, error: state.error, data: state.data };
}

function getCountKey(
  variables: Record<string, string | number | boolean | Date | null | undefined>,
) {
  return JSON.stringify(
    Object.fromEntries(
      Object.entries(variables).filter(
        (x) => x[0] !== 'current' && x[0] !== 'total' && x[0] !== 'size',
      ),
    ),
  );
}
