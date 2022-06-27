import React, { Suspense } from 'react';
import styled from '@emotion/styled';

interface Props {
  children?: React.ReactNode;
}

export default function AppContent({ children }: Props): React.ReactElement | null {
  return (
    <Content>
      <Suspense fallback={<>Loading...</>}>{children}</Suspense>
    </Content>
  );
}

const Content = styled.main`
  position: relative;
  flex-grow: 1;
  padding: 20px;
`;
