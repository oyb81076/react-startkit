import React from 'react';

import { getArticlePage } from 'src/apis/articleApi';
import Loader from 'src/components/Loader';
import Pagination from 'src/components/Pagination';
import usePageQuery from 'src/hooks/usePageQuery';
import useSearch from 'src/hooks/useSearch';
import { ArticleStatus } from 'src/models';
import ArticleNavbar from './components/ArticleNavbar';
import ArticleTable from './components/ArticleTable';

export default function ArticleIndex(): React.ReactElement | null {
  const search = useSearch();
  const { loading, data, error, refresh } = usePageQuery(getArticlePage, {
    title: search.str('title'),
    current: search.current(),
    size: 10,
    status: search.enum('status', ArticleStatus),
    authorId: search.id('author_id'),
  });
  return (
    <>
      <ArticleNavbar />
      <Loader loading={loading} error={error} refresh={refresh}>
        <ArticleTable rows={data?.rows} />
        <Pagination total={data?.total} size={10} />
      </Loader>
    </>
  );
}
