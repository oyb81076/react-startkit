import React from 'react';
import { Navigate, Route, Routes } from 'react-router';

import AppLayout from 'src/components/AppLayout';
import Error404 from './components/Error404';
import Login from './components/Login';

export default function AppRoutes(): React.ReactElement | null {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<AppLayout />}>
        <Route index element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/main/*" element={<MainRoutes />} />
        <Route path="/experiment/*" element={<ExperimentRoutes />} />
        <Route path="*" element={<Error404 />} />
      </Route>
    </Routes>
  );
}

const Home = React.lazy(() => import('./home'));
const MainRoutes = React.lazy(() => import('./main'));
const ExperimentRoutes = React.lazy(() => import('./experiment'));
