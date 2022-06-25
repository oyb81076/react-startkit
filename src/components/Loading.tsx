import React from 'react';
import styled from '@emotion/styled';

export default function Loading(): React.ReactElement | null {
  return <SLoading>Loading...</SLoading>;
}

const SLoading = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
`;
