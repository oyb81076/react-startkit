import React from 'react';
import { Route, Routes } from 'react-router';

import ArticleDetail from './ArticleDetail';
import ArticlePage from './ArticlePage';

export default function ArticleRoutes(): React.ReactElement | null {
  return (
    <Routes>
      <Route index element={<ArticlePage />} />
      <Route path=":id" element={<ArticleDetail />} />
    </Routes>
  );
}
