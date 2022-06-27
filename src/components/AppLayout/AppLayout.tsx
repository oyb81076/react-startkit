import React, { Suspense } from 'react';
import { Outlet } from 'react-router';
import { NavLink } from 'react-router-dom';
import styled from '@emotion/styled';

export default function AppLayout(): React.ReactElement | null {
  return (
    <Article>
      <Header>
        <div className="brand">Brand</div>
        <NavLink className="link" to="/home">
          home
        </NavLink>
        <NavLink className="link" to="/main">
          main
        </NavLink>
        <NavLink className="link" to="/experiment">
          experiment
        </NavLink>
        <div className="placeholder" />
        <span>Logout</span>
      </Header>
      <Section>
        <Suspense fallback={<>Loading Components....</>}>
          <Outlet />
        </Suspense>
      </Section>
    </Article>
  );
}

const Article = styled.article`
  display: flex;
  flex-direction: column;
`;
const Section = styled.section`
  display: flex;
`;
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  padding: 0 10px;
  background-color: #eee;

  .link {
    display: block;
    height: 40px;
    padding: 0 20px;
    color: inherit;
    line-height: 40px;
    text-decoration: none;

    &.active {
      text-decoration: underline;
      background-color: white;
    }
  }

  .brand {
    width: 100px;
  }

  .placeholder {
    flex-grow: 1;
  }
`;
