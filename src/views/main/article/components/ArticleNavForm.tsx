import React from 'react';

import SelectIntEnum from 'src/components/form/SelectIntEnum';
import useSearch from 'src/hooks/useSearch';
import { ArticleStatus, StatusNames } from 'src/models/article';

function ArticleNavForm(): React.ReactElement | null {
  const search = useSearch();
  const [title, setTitle] = React.useState(search.str('title'));
  const [status, setStatus] = React.useState<ArticleStatus | null>(
    search.enum('status', ArticleStatus),
  );
  React.useEffect(() => {
    setTitle(search.str('title'));
    setStatus(search.enum('status', ArticleStatus));
  }, [search]);
  const handleSubmit = React.useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      search.navigate({ title, status });
    },
    [search, title, status],
  );
  return (
    <form onSubmit={handleSubmit}>
      <SelectIntEnum value={status} setValue={setStatus} options={StatusNames} optional="全部" />
      <input value={title ?? ''} onChange={(e) => setTitle(e.currentTarget.value)} />
      <button type="submit">Search</button>
    </form>
  );
}

export default React.memo(ArticleNavForm);
