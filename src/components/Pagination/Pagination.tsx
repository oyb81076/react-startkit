import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import clsx from 'clsx';

interface Props {
  total?: number;
  size: number;
  center?: boolean;
}

export default React.memo(Pagination);
function Pagination({ total, size, center }: Props): React.ReactElement | null {
  const { search } = useLocation();
  const params = React.useMemo(() => new URLSearchParams(search), [search]);
  const baseURL = useBaseURL(params);
  const current = getCurrent(params);
  const totalRef = React.useRef(total);
  if (total != null) totalRef.current = total;
  const computeTotal = totalRef.current;
  if (computeTotal == null || !baseURL) return null;
  const totalPage = Math.ceil(computeTotal / size) || 1;
  const [start, end] = getLinkOffsets(totalPage, current);
  const links = Array(end - start + 1)
    .fill(0)
    .map((_, i) => start + i);
  return (
    <SPagination className={clsx({ center })}>
      <CtrlLink
        className={current === 1 ? 'disabled' : undefined}
        onClick={onClick}
        to={`${baseURL}1`}
      >
        首页
      </CtrlLink>
      <CtrlLink
        className={current === 1 ? 'disabled' : undefined}
        onClick={onClick}
        to={`${baseURL}${Math.max(1, current - 1)}`}
      >
        上页
      </CtrlLink>
      {links.map((page) => (
        <MidLink
          key={page}
          className={clsx({ active: page === current })}
          onClick={onClick}
          to={baseURL + page.toString()}
        >
          {page}
        </MidLink>
      ))}
      <CtrlLink
        className={current === totalPage ? 'disabled' : undefined}
        onClick={onClick}
        to={`${baseURL}${Math.min(totalPage, current + 1)}`}
      >
        下页
      </CtrlLink>
      <CtrlLink
        className={current === totalPage ? 'disabled' : undefined}
        onClick={onClick}
        to={baseURL + totalPage.toString()}
      >
        末页
      </CtrlLink>
    </SPagination>
  );
}

function useBaseURL(params: URLSearchParams) {
  return React.useMemo(() => {
    const search = new URLSearchParams(params);
    search.delete('current');
    const qs = search.toString();
    if (qs) {
      return `?${qs}&current=`;
    }
    return '?current=';
  }, [params]);
}

function onClick(e: React.MouseEvent<HTMLAnchorElement>) {
  const { classList } = e.currentTarget;
  if (classList.contains('disabled') || classList.contains('active')) {
    e.preventDefault();
  }
}
const SPagination = styled.div`
  &.center {
    display: flex;
    justify-content: center;
  }
`;
const CtrlLink = styled(Link)`
  display: inline-block;
  padding: 2px 4px;
  color: inherit;
  text-decoration: none;

  &.disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;
const MidLink = styled(Link)`
  display: inline-block;
  margin: 0 2px;
  padding: 2px 4px;
  color: inherit;
  text-decoration: none;

  &.active {
    text-decoration: underline;
    opacity: 0.6;
  }
`;

function getLinkOffsets(totalPage: number, current: number): [start: number, end: number] {
  const linkSize = 11;
  if (totalPage <= linkSize) {
    return [1, totalPage];
  }
  const half = Math.floor(linkSize / 2);
  if (current - half <= 1) {
    return [1, linkSize];
  }
  if (current + half >= totalPage) {
    return [totalPage - linkSize + 1, totalPage];
  }
  return [current - half, current + half];
}
function getCurrent(params: URLSearchParams) {
  const i = params.get('current');
  if (!i) return 1;
  return parseInt(i, 10) || 1;
}
