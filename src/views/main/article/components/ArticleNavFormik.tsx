import React from 'react';
import { Field, Form, Formik, FormikProps } from 'formik';

import SelectEnum from 'src/components/formik/SelectEnum';
import useSearch from 'src/hooks/useSearch';
import { ArticleStatus, StatusNames } from 'src/models/article';

interface FormValues {
  title: string | null;
  status: ArticleStatus | null;
}
function ArticleNavFormik(): React.ReactElement | null {
  const search = useSearch();
  const ref = React.useRef<FormikProps<FormValues>>(null);
  React.useEffect(() => {
    ref.current?.setValues({
      title: search.str('title'),
      status: search.enum('status', ArticleStatus),
    });
  }, [search]);
  return (
    <Formik
      innerRef={ref}
      initialValues={{
        title: search.str('title'),
        status: search.enum('status', ArticleStatus),
      }}
      onSubmit={search.navigate}
    >
      <Form>
        <SelectEnum name="status" options={StatusNames} optional="全部" />
        <Field type="string" name="title" />
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
}

export default React.memo(ArticleNavFormik);
