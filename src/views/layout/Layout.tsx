import React, { Suspense } from 'react';
import { Outlet } from 'react-router';
import { NavLink } from 'react-router-dom';
import styled from '@emotion/styled';

export default function Layout(): React.ReactElement | null {
  return (
    <Article>
      <Header>
        <div>Brand</div>
        <span>Logout</span>
      </Header>
      <Section>
        <Aside>
          <Menu to="/">首页</Menu>
          <Menu to="/article">文章</Menu>
          <Menu to="/user">用户</Menu>
          <Menu to="/experiment">experiment</Menu>
        </Aside>
        <Main>
          <Suspense fallback={<>Loading...</>}>
            <Outlet />
          </Suspense>
        </Main>
      </Section>
    </Article>
  );
}
function Menu({ to, children }: { to: string; children: React.ReactNode }) {
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
`;
const Aside = styled.aside`
  width: 300px;
  min-width: 300px;
`;
const Main = styled.main`
  position: relative;
  flex-grow: 1;
`;
