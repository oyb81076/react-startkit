import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from '@emotion/styled';

export default function AppMenu({ to, children }: { to: string; children: React.ReactNode }) {
  return <Link to={to}>{children}</Link>;
}
const Link = styled(NavLink)`
  &:hover {
    color: white;
    background-color: #888;
  }

  &.active {
    color: white;
    background-color: black;
  }

  display: block;
  padding: 5px 10px;
  color: inherit;
  text-decoration: none;
  background-color: #ccc;
`;
