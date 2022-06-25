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

export const StatusNames: Record<ArticleStatus, string> = {
  [ArticleStatus.PRIVATE]: '私人的',
  [ArticleStatus.EXAMINE]: '审核中',
  [ArticleStatus.PUBLIC]: '公开的',
};
