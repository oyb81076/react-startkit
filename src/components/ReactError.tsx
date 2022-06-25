import React from 'react';

interface Props {
  error: Error | null;
}
export default function ReactError({ error }: Props): React.ReactElement | null {
  if (!error) return null;
  return <pre>{error.stack}</pre>;
}
