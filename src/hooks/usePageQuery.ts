import React, { useCallback, useEffect, useReducer, useRef } from 'react';

import { QueryAction, QueryReducer, queryReducer, QueryResult } from './useQuery';

type ParamType = string | Date | number | boolean | null | undefined;
interface Page<T> {
  total: number;
  rows: T[];
}

export default function usePageQuery<P extends Record<keyof P, ParamType> & { total: number }, T>(
  fetcher: (args: P) => Promise<Page<T>>,
  variables: Omit<P, 'total'>,
  options?: { fetchKey?: string | number | null },
): Omit<QueryResult<Page<T>>, 'mutation'> {
  const fetchKey = options?.fetchKey;
  const hash = JSON.stringify(variables);
  const [state, dispatch] = useReducer<QueryReducer<Page<T>>>(queryReducer, {
    loading: true,
    data: undefined,
    error: null,
  });
  const ref = useRef<RefObject<P, T>>({
    hash: null,
    mount: false,
    variables,
    fetcher,
    key: 0,
    countKey: null,
    total: -1,
    fetchKey,
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
    execute(ref, dispatch, false);
  }, []);
  useEffect(() => {
    if (ref.current.hash !== hash) {
      execute(ref, dispatch, ref.current.fetchKey !== fetchKey);
      ref.current.hash = hash;
      ref.current.fetchKey = fetchKey;
    }
  }, [hash, fetchKey]);
  return { refresh, loading: state.loading, error: state.error, data: state.data };
}
interface RefObject<P, T> {
  hash: string | null;
  mount: boolean;
  variables: Omit<P, 'total'>;
  fetcher: (args: P) => Promise<Page<T>>;
  key: number;
  countKey: string | null;
  total: number;
  fetchKey: string | number | null | undefined;
}

function execute<P extends Record<keyof P, ParamType> & { total: number }, T>(
  ref: React.MutableRefObject<RefObject<P, T>>,
  dispatch: React.Dispatch<QueryAction<Page<T>>>,
  forceUpdateTotal: boolean,
) {
  const { current } = ref;
  current.key += 1;
  const { key, variables, fetcher } = current;
  dispatch({ type: 'pending' });
  const countKey = serializeCountKey(variables);
  if (current.countKey !== countKey) {
    current.countKey = countKey;
    current.total = -1;
  }
  const total = forceUpdateTotal ? -1 : current.total;
  dispatch({ type: 'pending' });
  fetcher({ ...variables, total } as P).then(
    (data) => {
      if (current.countKey === countKey) current.total = data.total;
      if (current.key !== key) return;
      dispatch({ type: 'success', data });
    },
    (error: Error) => {
      if (current.key !== key) return;
      dispatch({ type: 'fail', error });
    },
  );
}

function serializeCountKey(
  variables: Record<string, string | number | boolean | Date | null | undefined>,
) {
  return JSON.stringify(
    Object.fromEntries(
      Object.entries(variables).filter(
        ([k]) => k !== 'current' && k !== 'total' && k !== 'size' && k !== 'sort' && k !== 'asc',
      ),
    ),
  );
}
