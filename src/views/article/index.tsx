import React from 'react';
import { Route, Routes } from 'react-router';

import ArticleDetail from './ArticleDetail';
import ArticleIndex from './ArticleIndex';

export default function ArticleRoutes(): React.ReactElement | null {
  return (
    <Routes>
      <Route index element={<ArticleIndex />} />
      <Route path=":id" element={<ArticleDetail />} />
    </Routes>
  );
}
