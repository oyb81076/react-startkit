import { User } from 'src/models';
import httpClient from 'src/modules/httpClient';

export function getUser(id: string): Promise<User | null> {
  return httpClient.get(`/api/user/${id}`);
}
export function getUsers(): Promise<User[]> {
  return httpClient.get('/api/user');
}
export function createUser(): Promise<User> {
  return httpClient.post('/api/user');
}
export function updateUser(body: Omit<User, 'ctime'>): Promise<User> {
  return httpClient.put(`/api/user/${body.id}`, body);
}

export function deleteUser(id: string): Promise<void> {
  return httpClient.del(`/api/user/${id}`);
}
