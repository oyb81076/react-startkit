import { Random } from 'mockjs';

import { Article, ArticleStatus, Role, User } from '../src/models';
import { randomEnum, uuid } from './utils';

export const user = (): User => ({
  id: uuid(),
  role: randomEnum(Role),
  name: Random.cname(),
  age: Random.integer(10, 30),
  ctime: new Date(),
});

export const article = (): Article => ({
  id: uuid(),
  authorId: uuid(),
  nail: Random.image(),
  title: Random.ctitle(),
  status: randomEnum(ArticleStatus),
  description: Random.cparagraph(),
  ctime: Random.date(),
  price: Random.integer(1000, 30000),
  sales: Random.integer(0, 100000000),
});
