import React from 'react';
import { Route, Routes } from 'react-router';

export default function AppRoutes(): React.ReactElement | null {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/article/*" element={<Article />} />
        <Route path="/experiment/*" element={<Experiment />} />
        <Route path="/User/*" element={<User />} />
        <Route path="*" element={<>404 Not Found</>} />
      </Route>
    </Routes>
  );
}

const Article = React.lazy(() => import('src/views/article'));
const User = React.lazy(() => import('src/views/user'));
const Home = React.lazy(() => import('src/views/home'));
const Layout = React.lazy(() => import('src/views/layout'));
const Login = React.lazy(() => import('src/views/login'));
const Experiment = React.lazy(() => import('src/views/experiment'));
