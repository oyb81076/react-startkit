import { Page } from 'src/models';
import httpClient from 'src/modules/httpClient';
import { Article, ArticleStatus } from '../models/article';

export function getArticle(id: string): Promise<Article | null> {
  return httpClient.get(`/api/article/${id}`);
}
interface GetPageInput {
  title: string | null;
  status: ArticleStatus | null;
  authorId: string | null;
  current: number;
  size: number;
  total: number;
}
export function getArticlePage(params: GetPageInput): Promise<Page<Article>> {
  return httpClient.get('/api/article', params);
}

export function createArticle(body: Article): Promise<Article> {
  return httpClient.post('/api/article', body);
}

export function updateArticle(body: Omit<Article, 'ctime'>) {
  return httpClient.put(`/api/article/${body.id}`, body);
}

export function removeArticle(id: string): Promise<{ id: string }> {
  return httpClient.del(`/api/article/${id}`);
}
