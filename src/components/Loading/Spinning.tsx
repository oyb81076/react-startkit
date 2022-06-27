import React from 'react';
import styled from '@emotion/styled';

interface Props {
  className?: string;
  size?: number | string;
  widget?: boolean;
}
function Spinning({ className, size = 20, widget }: Props): JSX.Element | null {
  const element = (
    <Spin className={className} style={{ fontSize: size }}>
      <Dot style={{ top: 0, left: 0 }} />
      <Dot style={{ top: 0, right: 0, animationDelay: '0.4s' }} />
      <Dot style={{ right: 0, bottom: 0, animationDelay: '0.8s' }} />
      <Dot style={{ bottom: 0, left: 0, animationDelay: '1.2s' }} />
    </Spin>
  );
  return widget ? <Widget>{element}</Widget> : element;
}
export default React.memo(Spinning);
export const Widget = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(255 255 255 / 70%);
  inset: 0;
`;

const Spin = styled.div`
  display: inline-block;
  width: 1em;
  height: 1em;
  transform: rotate(45deg);
  animation: spinning 1.2s infinite linear;

  @keyframes spinning {
    to {
      transform: rotate(405deg);
    }
  }
`;

const Dot = styled.i`
  position: absolute;
  display: block;
  width: 40%;
  height: 40%;
  background-color: #1890ff;
  border-radius: 100%;
  transform-origin: 50% 50%;
  opacity: 0.3;
  animation: ant-spin-move 1s infinite linear alternate;

  @keyframes ant-spin-move {
    to {
      opacity: 1;
    }
  }
`;
