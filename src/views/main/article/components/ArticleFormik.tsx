import React from 'react';
import { ErrorMessage, Field, Formik } from 'formik';

import formik from 'src/components/formik';
import { Article, articleValidation, StatusNames } from 'src/models/article';

interface Props {
  initialValues: Article;
  onSubmit: (article: Article) => void;
}
export default function ArticleFormik({
  initialValues,
  onSubmit,
}: Props): React.ReactElement | null {
  const { Form, TextField } = formik(initialValues);
  return (
    <Formik initialValues={initialValues} validationSchema={articleValidation} onSubmit={onSubmit}>
      <Form>
        {initialValues.id && <TextField label="id" name="id" readOnly />}
        <TextField label="title" name="title" />
        <TextField label="description" name="description" />
        <div>
          <Field as="select" name="status">
            {Object.entries(StatusNames).map(([k, n]) => (
              <option key={k} value={k}>
                {n}
              </option>
            ))}
          </Field>
          <ErrorMessage name="status" />
        </div>
        <button type="submit">提交</button>
      </Form>
    </Formik>
  );
}
