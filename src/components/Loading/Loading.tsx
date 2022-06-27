import React from 'react';
import styled from '@emotion/styled';

import ReactError from '../ReactError';
import Spinning from './Spinning';

interface Props {
  className?: string;
  error: Error | null | undefined;
  refresh?: () => void;
  loading: boolean;
  children?: React.ReactNode;
}
export default function Loading({
  className,
  loading,
  error,
  refresh,
  children,
}: Props): React.ReactElement | null {
  if (error)
    return (
      <LoaderContainer className={className}>
        <ReactError error={error} />
        {refresh && (
          <button type="button" onClick={refresh}>
            重新加载
          </button>
        )}
      </LoaderContainer>
    );
  return (
    <LoaderContainer>
      {loading && <Spinning widget />}
      {children}
    </LoaderContainer>
  );
}

const LoaderContainer = styled.div`
  position: relative;
`;
