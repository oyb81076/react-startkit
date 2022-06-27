import httpClient from 'src/modules/httpClient';

export function login(body: {
  username: string;
  password: string;
}): Promise<{ ok: boolean; err: string }> {
  return httpClient.post('/api/login', body);
}
export function logout(): Promise<void> {
  return httpClient.post('/api/logout');
}
