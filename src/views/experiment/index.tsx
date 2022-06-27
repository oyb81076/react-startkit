import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { AppAside, AppContent, AppMenu } from 'src/components/AppLayout';
import Error404 from '../components/Error404';
import SWR from './SWR';
import UseQuery from './UseQuery';

export default function ExperimentRoutes(): React.ReactElement | null {
  return (
    <>
      <AppAside>
        <AppMenu to="swr">swr</AppMenu>
        <AppMenu to="use-query">UseQuery</AppMenu>
      </AppAside>
      <AppContent>
        <Routes>
          <Route index element={<Navigate to="swr" />} />
          <Route path="swr" element={<SWR />} />
          <Route path="use-query" element={<UseQuery />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </AppContent>
    </>
  );
}
