import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

import DateFormat from 'src/components/DateFormat';
import NumberFormat from 'src/components/NumberFormat';
import { Article, StatusNames } from 'src/models/article';

interface Props {
  rows?: Article[];
}
export default function ArticleTable({ rows }: Props): React.ReactElement | null {
  return (
    <Table>
      <thead>
        <tr>
          <th>ID</th>
          <th>nail</th>
          <th>title</th>
          <th>status</th>
          <th>authorId</th>
          <th>price</th>
          <th>sales</th>
          <th>ctime</th>
          <th>handle</th>
        </tr>
      </thead>
      <tbody>
        {rows?.map((x) => (
          <tr key={x.id}>
            <td>{x.id}</td>
            <td>{x.nail}</td>
            <td>{x.title}</td>
            <td>{StatusNames[x.status]}</td>
            <td>{x.authorId}</td>
            <td>
              <NumberFormat value={x.price} decimal />
            </td>
            <td>
              <NumberFormat value={x.sales} />
            </td>
            <td>
              <DateFormat value={x.ctime} />
            </td>
            <td>
              <Link to={x.id}>详情</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  td,
  th {
    padding: 5px 10px;
    border: 1px solid;
  }
`;
