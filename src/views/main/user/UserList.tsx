import React from 'react';
import { Link } from 'react-router-dom';

import Loading from 'src/components/Loading';
import useQuery from 'src/hooks/useQuery';
import { getUsers } from 'src/services/userService';

export default function UserList(): React.ReactElement | null {
  const { data, loading, error, refresh } = useQuery(getUsers);
  return (
    <Loading loading={loading} error={error}>
      {data?.map((x) => (
        <div key={x.id}>
          <span>{x.id}</span>
          <span>{x.name}</span>
          <Link to={x.id} state={x}>
            详情
          </Link>
        </div>
      ))}
      <button type="button" onClick={refresh}>
        刷新
      </button>
    </Loading>
  );
}
