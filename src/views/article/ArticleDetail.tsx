import React from 'react';
import { useParams } from 'react-router';
import useSWR from 'swr';

import { getArticle } from 'src/apis/articleApi';

export default function ArticleDetail(): React.ReactElement | null {
  const { id } = useParams();
  const data = useSWR(id, getArticle);
  return (
    <>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
}
