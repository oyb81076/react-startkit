import React from 'react';

import { getUsers } from 'src/apis/userApi';
import Loader from 'src/components/Loader';
import useQuery from 'src/hooks/useQuery';

export default function UserIndex(): React.ReactElement | null {
  const { data, loading, error } = useQuery(getUsers);
  return (
    <Loader loading={loading} error={error}>
      {data?.map((x) => (
        <div key={x.id}>
          <span>{x.id}</span>
          <span>{x.name}</span>
        </div>
      ))}
    </Loader>
  );
}
