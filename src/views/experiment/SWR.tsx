import React from 'react';
import useSWR from 'swr';

import Loader from 'src/components/Loading';
import { User } from 'src/models';
import { getUsers } from 'src/services/userService';

export default function SWR(): React.ReactElement | null {
  const { data, isValidating, error, mutate } = useSWR<User[], Error>('/api/user', getUsers);
  const refreshWithError = () => {
    mutate(() => Promise.reject(new Error('This is some error')), false).catch(() => {});
  };
  const refresh = () => {
    mutate(getUsers, false).catch(() => {});
  };

  return (
    <Loader loading={isValidating} error={error}>
      {data?.map((x) => (
        <div key={x.id}>
          <span>{x.id}</span>
          <span>{x.name}</span>
          <span>{x.age}</span>
        </div>
      ))}
      <button type="button" onClick={refreshWithError}>
        刷新, 生成错误
      </button>
      <button type="button" onClick={refresh}>
        刷新
      </button>
    </Loader>
  );
}
