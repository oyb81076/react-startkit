import React from 'react';
import { Navigate, NavLink, Route, Routes } from 'react-router-dom';

import SWR from './SWR';
import UseQuery from './UseQuery';

export default function index(): React.ReactElement | null {
  return (
    <div>
      <NavLink to="swr">swr</NavLink>
      <NavLink to="use-query">UseQuery</NavLink>
      <Routes>
        <Route index element={<Navigate to="swr" />} />
        <Route path="swr" element={<SWR />} />
        <Route path="use-query" element={<UseQuery />} />
      </Routes>
    </div>
  );
}
