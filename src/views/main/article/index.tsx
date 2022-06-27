import React from 'react';
import { Route, Routes } from 'react-router';

import ArticleCreate from './ArticleCreate';
import ArticleDetail from './ArticleDetail';
import ArticlePage from './ArticlePage';

export default function ArticleRoutes(): React.ReactElement | null {
  return (
    <Routes>
      <Route index element={<ArticlePage />} />
      <Route path="create" element={<ArticleCreate />} />
      <Route path="detail/:id" element={<ArticleDetail />} />
    </Routes>
  );
}
