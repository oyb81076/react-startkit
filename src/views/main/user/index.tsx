import React from 'react';
import { Route, Routes } from 'react-router';

import UserDetail from './UserDetail';
import UserList from './UserList';

export default function UserRoutes(): React.ReactElement | null {
  return (
    <Routes>
      <Route index element={<UserList />} />
      <Route path=":id" element={<UserDetail />} />
    </Routes>
  );
}
