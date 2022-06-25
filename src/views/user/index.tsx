import React from 'react';
import { Route, Routes } from 'react-router';

import UserIndex from './UserIndex';

export default function UserRoutes(): React.ReactElement | null {
  return (
    <Routes>
      <Route index element={<UserIndex />} />
    </Routes>
  );
}
