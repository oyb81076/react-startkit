import { date, number, object, string } from 'yup';

import { enumValues } from 'src/modules/enums';

export interface Article {
  id: string;
  nail: string;
  title: string;
  status: ArticleStatus;
  authorId: string;
  description: string;
  ctime: Date | string;
  price: number;
  sales: number;
}

export enum ArticleStatus {
  PRIVATE = 0,
  EXAMINE = 1,
  PUBLIC = 2,
}

export const articleValidation = object({
  id: string().nullable(),
  nail: string().url(),
  title: string().max(255).required(),
  status: number().integer().oneOf(enumValues(ArticleStatus)),
  authorId: string().nullable(),
  description: string(),
  ctime: date(),
  price: number().integer().required(),
  sales: number().integer().required(),
});

export const StatusNames: Record<ArticleStatus, string> = {
  [ArticleStatus.PRIVATE]: '私人的',
  [ArticleStatus.EXAMINE]: '审核中',
  [ArticleStatus.PUBLIC]: '公开的',
};
