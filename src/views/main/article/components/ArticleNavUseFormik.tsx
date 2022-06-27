import React from 'react';
import { useFormik } from 'formik';

import useSearch from 'src/hooks/useSearch';
import { ArticleStatus, StatusNames } from 'src/models/article';
import { enumValues } from 'src/modules/enums';

export default React.memo(ArticleNavUseFormik);
function ArticleNavUseFormik(): React.ReactElement | null {
  const search = useSearch();
  const { values, handleChange, handleSubmit, setValues } = useFormik({
    initialValues: {
      title: search.str('title'),
      status: search.enum('status', ArticleStatus),
    },
    onSubmit: search.navigate,
  });
  React.useEffect(() => {
    setValues({
      title: search.str('title'),
      status: search.enum('status', ArticleStatus),
    }).catch(() => {});
  }, [search, setValues]);
  return (
    <form onSubmit={handleSubmit}>
      <select name="status" value={values.status ?? ''} onChange={handleChange}>
        <option value="">全部</option>
        {enumValues(ArticleStatus).map((v) => (
          <option key={v} value={v}>
            {StatusNames[v]}
          </option>
        ))}
      </select>
      <input type="string" name="title" value={values.title ?? ''} onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>
  );
}
