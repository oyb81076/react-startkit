import React from 'react';
import { Navigate, Route, Routes } from 'react-router';

import { AppAside, AppContent, AppMenu } from 'src/components/AppLayout';
import Error404 from '../components/Error404';

export default function MainRoutes(): React.ReactElement | null {
  return (
    <>
      <AppAside>
        <AppMenu to="user">user</AppMenu>
        <AppMenu to="article">article</AppMenu>
      </AppAside>
      <AppContent>
        <Routes>
          <Route index element={<Navigate to="user" replace />} />
          <Route path="/user/*" element={<UserRoutes />} />
          <Route path="/article/*" element={<ArticleRoutes />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </AppContent>
    </>
  );
}

const UserRoutes = React.lazy(() => import('./user'));
const ArticleRoutes = React.lazy(() => import('./article'));
