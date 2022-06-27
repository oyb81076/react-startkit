import React from 'react';
import { useLocation } from 'react-router';

import Loading from 'src/components/Loading';
import useQuery from 'src/hooks/useQuery';
import { User } from 'src/models';
import { getUsers } from 'src/services/userService';

let delay = 0;
function thenDelay<T>(ms: number): (v: T) => Promise<T> {
  return (v) =>
    new Promise((r) => {
      setTimeout(() => r(v), ms);
    });
}
const getUserListDelay = () => getUsers().then(thenDelay(delay));

export default function UseQuery(): React.ReactElement | null {
  const { state } = useLocation();
  const { data, loading, error, refresh } = useQuery(getUserListDelay, null, {
    defaultValue: state as User[],
  });
  return (
    <Loading loading={loading} error={error}>
      {data?.map((x) => (
        <div key={x.id}>
          <span>{x.id}</span>
          <span>{x.name}</span>
          <span>{x.age}</span>
        </div>
      ))}
      <button
        type="button"
        onClick={() => {
          delay = 0;
          refresh();
        }}
      >
        刷新 立即获取数据
      </button>
      <button
        type="button"
        onClick={() => {
          delay = 500;
          refresh();
        }}
      >
        刷新延迟获取数据
      </button>
    </Loading>
  );
}
