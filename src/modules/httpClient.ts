type ParamType = string | number | Date | boolean | null | undefined;
type Params = Record<string, ParamType>;

export function get<T>(url: string): Promise<T>;
export function get<T, Q extends Record<keyof Q, ParamType>>(url: string, params: Q): Promise<T>;
export function get<T>(url: string, params?: Params): Promise<T> {
  return request({ method: 'GET', url, params });
}
export function post<T>(url: string, body?: unknown): Promise<T> {
  return request({ method: 'POST', url, body });
}
export function put<T>(url: string, body?: unknown): Promise<T> {
  return request({ method: 'PUT', url, body });
}
export function del<T>(url: string): Promise<T> {
  return request({ method: 'DELETE', url });
}
export function patch<T>(url: string, body?: unknown): Promise<T> {
  return request({ method: 'PATCH', url, body });
}

const httpClient = { get, post, put, del, patch, request };
export default httpClient;

interface AjaxOptions {
  method: 'GET' | 'DELETE' | 'POST' | 'PATCH' | 'PUT';
  url: string;
  params?: Params | null;
  body?: unknown;
}
async function request<T>({ method, url, params, body }: AjaxOptions): Promise<T> {
  let querystring = '';
  if (params) {
    const entries = Object.entries(params)
      .filter(([, v]) => v != null)
      .map(([k, v]) => [k, v instanceof Date ? v.toISOString() : String(v)]);
    const search = new URLSearchParams(entries);
    querystring = `?${search.toString()}`;
  }
  const xhr = await fetch(url + querystring, {
    method,
    credentials: 'include',
    headers: [
      ['accept', 'application/json'],
      ...(body != null ? [['content-type', 'application/json']] : []),
    ],
    body: body != null ? JSON.stringify(body) : undefined,
  });
  if (!xhr.ok) {
    const content = await xhr.text();
    throw new Error(content);
  }
  const json = (await xhr.json()) as { error: string | false; data: T };
  if (json.error) throw new Error(json.error);
  return json.data;
}
