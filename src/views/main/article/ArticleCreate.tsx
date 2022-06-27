import React from 'react';

import { Article, ArticleStatus } from 'src/models/article';
import { asyncError, thenAlert } from 'src/modules/messages';
import { createArticle } from 'src/services/articleService';
import ArticleFormik from './components/ArticleFormik';

export default function ArticleCreate(): React.ReactElement | null {
  const initialValues: Article = {
    id: '',
    nail: '',
    title: '',
    authorId: '',
    description: '',
    status: ArticleStatus.PUBLIC,
    price: 0,
    sales: 0,
    ctime: new Date(),
  };
  const handleSubmit = React.useCallback((values: Article) => {
    createArticle(values).then(thenAlert('保存成功')).catch(asyncError);
  }, []);
  return (
    <>
      <ArticleFormik initialValues={initialValues} onSubmit={handleSubmit} />
    </>
  );
}
