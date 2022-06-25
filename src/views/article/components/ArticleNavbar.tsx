import React from 'react';

import useSearch from 'src/hooks/useSearch';
import { ArticleStatus } from 'src/models';
import { StatusNames } from 'src/models/article';
import { values } from 'src/modules/enums';

export default function ArticleNavbar(): React.ReactElement | null {
  const [title, setTitle] = React.useState('');
  const search = useSearch();
  const [status, setStatus] = React.useState<ArticleStatus | null>(null);
  React.useEffect(() => {
    setTitle(search.str('title') || '');
    setStatus(search.enum('status', ArticleStatus));
  }, [search, setTitle]);
  const onSearch = React.useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      search.navigate({ title, status });
    },
    [search, title, status],
  );
  return (
    <form onSubmit={onSearch}>
      <span>status:</span>
      <select
        value={String(status ?? '')}
        onChange={(x) => setStatus(x.currentTarget.value ? Number(x.currentTarget.value) : null)}
      >
        <option value="">全部</option>
        {values(ArticleStatus).map((v) => (
          <option key={v} value={v}>
            {StatusNames[v]}
          </option>
        ))}
      </select>
      <span>title:</span>
      <input placeholder="title" value={title} onChange={(e) => setTitle(e.currentTarget.value)} />
      <button type="submit">Search</button>
    </form>
  );
}
