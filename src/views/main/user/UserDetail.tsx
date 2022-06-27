import React from 'react';
import { useLocation, useParams } from 'react-router';

import Loading from 'src/components/Loading';
import useQuery from 'src/hooks/useQuery';
import { User } from 'src/models';
import { getUser } from 'src/services/userService';

export default function UserDetail(): React.ReactElement | null {
  const { id } = useParams() as { id: string };
  const { state } = useLocation();
  const { data, loading, error } = useQuery(getUser, id, { defaultValue: state as User | null });
  return (
    <Loading loading={loading} error={error}>
      <h5>详情</h5>
      <div>id:{data?.id}</div>
      <div>name:{data?.name}</div>
    </Loading>
  );
}
