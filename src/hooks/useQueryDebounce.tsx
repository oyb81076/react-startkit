import React from 'react';

import { QueryAction, QueryReducer, queryReducer } from './useQuery';

/**
 * 这个是一个有争议的功能
 * 防止因数据获取速度过快的时候出现闪屏
 *
 * 为了防止出现闪屏, 当${LOADING_SHOW_DELAY}ms内返回的时候就不会有 loading = true 这个状态,
 * 会是从 { loading: false, data: current, error: null } 变为 { loading: false, data: next, error: null }
 * 当 { loading: true } 的时候, loading 会持续至少 1s
 */
const LOADING_SHOW_DELAY = 200;
const LOADING_MIN_DURATION = 1000;

interface Result<T> {
  loading: boolean;
  error: Error | null;
  data: T | undefined;
  refresh: () => void;
}

function useQueryDebounce<T>(fetcher: () => Promise<T>): Result<T>;
function useQueryDebounce<T, Variables>(
  fetcher: (args: Variables) => Promise<T>,
  variables?: Variables,
  options?: { defaultValue?: T; fetchKey?: string | number | null },
): Result<T>;
function useQueryDebounce<T, Variables>(
  fetcher: (arg?: Variables) => Promise<T>,
  variables?: Variables,
  options?: { defaultValue?: T; fetchKey?: string | number | null },
): Result<T> {
  const fetchKey = options?.fetchKey;
  const defaultValue = options?.defaultValue;
  const hash = JSON.stringify(variables);
  const [state, dispatch] = React.useReducer<QueryReducer<T>>(queryReducer, {
    loading: defaultValue !== undefined,
    data: defaultValue,
    error: null,
  });
  const ref = React.useRef<RefObject<T, Variables>>({
    variables,
    fetcher,
    defaultValue,
    key: 0,
    mount: false,
    hash: null,
  });
  React.useEffect(() => {
    ref.current.variables = variables;
    ref.current.fetcher = fetcher;
  });
  React.useEffect(() => {
    const { current } = ref;
    current.mount = true;
    return () => {
      current.mount = false;
    };
  }, []);

  const refresh = React.useCallback(() => {
    execute(ref, dispatch);
  }, []);
  React.useEffect(() => {
    if (ref.current.hash !== hash) {
      ref.current.hash = hash;
      if (ref.current.defaultValue !== undefined) {
        ref.current.defaultValue = undefined;
      } else {
        execute(ref, dispatch);
      }
    }
  }, [hash, fetchKey]);
  return { refresh, loading: state.loading, error: state.error, data: state.data };
}

interface RefObject<T, Variables> {
  hash: string | null;
  variables: Variables | undefined;
  fetcher: (arg?: Variables) => Promise<T>;
  defaultValue: T | undefined;
  key: number;
  mount: boolean;
}
function execute<T, Variables>(
  ref: React.MutableRefObject<RefObject<T, Variables>>,
  dispatch: React.Dispatch<QueryAction<T>>,
) {
  const { current } = ref;
  current.key += 1;
  const { fetcher, variables } = current;
  const options = { dispatch, ref, key: current.key, timer: 0, pending: 0 };
  options.timer = window.setTimeout(() => {
    if (ref.current.key !== options.key) return;
    options.pending = Date.now();
    options.timer = 0;
    dispatch({ type: 'pending' });
  }, LOADING_SHOW_DELAY);

  fetcher(variables).then(
    (data) => dispatchAction({ type: 'success', data }, options),
    (error: Error) => dispatchAction({ type: 'fail', error }, options),
  );
}

function dispatchAction<T, Variables>(
  action: QueryAction<T>,
  options: {
    key: number;
    dispatch: React.Dispatch<QueryAction<T>>;
    ref: React.MutableRefObject<RefObject<T, Variables>>;
    timer: number;
    pending: number;
  },
) {
  const { timer, ref, pending, dispatch, key } = options;
  if (timer) {
    window.clearTimeout(timer);
  }
  if (ref.current.mount && ref.current.key === key) {
    const delay = pending + LOADING_MIN_DURATION - Date.now();
    if (delay <= 0) {
      dispatch(action);
    } else {
      window.setTimeout(() => {
        if (ref.current.mount && ref.current.key === key) {
          dispatch(action);
        }
      }, delay);
    }
  }
}

export default useQueryDebounce;
