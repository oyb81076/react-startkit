import React from 'react';

interface Props {
  className?: string;
  error: Error | null;
}
export default function ReactError({ className, error }: Props): React.ReactElement | null {
  if (!error) return null;
  return <pre className={className}>{error.stack}</pre>;
}
