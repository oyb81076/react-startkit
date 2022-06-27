import React from 'react';

import Loading from 'src/components/Loading';
import Pagination from 'src/components/Pagination/Pagination';
import usePageQuery from 'src/hooks/usePageQuery';
import useSearch from 'src/hooks/useSearch';
import { ArticleStatus } from 'src/models/article';
import { getArticlePage } from 'src/services/articleService';
import ArticleNavForm from './components/ArticleNavForm';
import ArticleNavFormik from './components/ArticleNavFormik';
import ArticleNavUseFormik from './components/ArticleNavUseFormik';
import ArticleTable from './components/ArticleTable';

export default function ArticlePage(): React.ReactElement | null {
  const search = useSearch();
  const title = search.str('title');
  const status = search.enum('status', ArticleStatus);
  const authorId = search.id('authorId');
  const { loading, data, error, refresh } = usePageQuery(getArticlePage, {
    title,
    current: search.current(),
    size: 10,
    status,
    authorId,
  });
  return (
    <>
      <ArticleNavForm />
      <ArticleNavFormik />
      <ArticleNavUseFormik />
      <Loading loading={loading} error={error} refresh={refresh}>
        <ArticleTable rows={data?.rows} />
        <Pagination total={data?.total} size={10} />
      </Loading>
    </>
  );
}
