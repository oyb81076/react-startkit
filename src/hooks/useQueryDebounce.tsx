import React from 'react';

import { QueryAction, queryReducer, QueryState } from './useQuery';

/**
 * 防止因数据获取速度过快的时候出现闪屏
 * 这个是一个有争议的功能
 *
 * 为了防止出现闪屏, 当${LOADING_SHOW_DELAY}ms内返回的时候就不会有 loading = true 这个状态,
 * 会是从 { loading: false, data: current, error: null } 变为 { loading: false, data: next, error: null }
 * 当 { loading: true } 的时候, loading 会持续至少 1s
 */
const LOADING_SHOW_DELAY = 200;
const LOADING_MIN_DURATION = 1000;

interface Result<T> {
  loading: boolean;
  error: Error | undefined;
  data: T | undefined;
  refresh: () => void;
}

function useQueryDebounce<R>(fetcher: () => Promise<R>): Result<R>;
function useQueryDebounce<R, Variables>(
  fetcher: (args: Variables) => Promise<R>,
  variables?: Variables,
  options?: { defaultValue?: R; fetchKey?: string | number | null },
): Result<R>;
function useQueryDebounce<R, Variables>(
  fetcher: (arg?: Variables) => Promise<R>,
  variables?: Variables,
  options?: { defaultValue?: R; fetchKey?: string | number | null },
): Result<R> {
  const defaultValue = options?.defaultValue;
  const hash = JSON.stringify(variables);
  const [state, dispatch] = React.useReducer<React.Reducer<QueryState<R>, QueryAction<R>>>(
    queryReducer,
    { loading: defaultValue !== undefined, data: defaultValue, error: undefined },
  );
  const ref = React.useRef({ variables, fetcher, defaultValue, key: {} });
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
    let pending = 0;
    let timer = window.setTimeout(() => {
      if (ref.current.key !== key) return;
      pending = Date.now();
      timer = 0;
      dispatch({ type: 'pending' });
    }, LOADING_SHOW_DELAY);

    ref.current
      .fetcher(ref.current.variables)
      .then(
        (data): QueryAction<R> => ({ type: 'success', data }),
        (error: Error): QueryAction<R> => ({ type: 'fail', error }),
      )
      .then((action: QueryAction<R>) => {
        if (timer) {
          window.clearTimeout(timer);
        }
        if (ref.current.key !== key) return;
        const delay = pending + LOADING_MIN_DURATION - Date.now();
        if (delay <= 0) {
          dispatch(action);
        } else {
          window.setTimeout(() => {
            if (ref.current.key === key) {
              dispatch(action);
            }
          }, delay);
        }
      })
      // eslint-disable-next-line no-console
      .catch(console.error);
  }, []);
  React.useEffect(() => {
    if (ref.current.defaultValue !== undefined) {
      ref.current.defaultValue = undefined;
    } else {
      refresh();
    }
  }, [refresh, hash, options?.fetchKey]);
  return { refresh, loading: state.loading, error: state.error, data: state.data };
}

export default useQueryDebounce;
