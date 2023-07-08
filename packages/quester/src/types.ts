export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'ALL';

export interface QuesterConfig {
  baseURL?: string
  headers?: QuesterHeaders
  timeout?: number
  httpAgent?: any
  httpsAgent?: any
  params?: Record<string, any>
  [propName: string]: any
}

export interface QuesterAdapter {
  <T = any>(method: HttpMethod, url: string, config?: QuesterConfig): Promise<QuesterAdapterResponse<T>>
}

export interface QuesterAdapterResponse<T> {
  data: T
  status: number
  statusText: string
  headers: QuesterHeaders
}

export interface QuesterHeaders {
  [key: string]: string;
}

export enum RequestMethod {
  GET = 'GET',
  POST = 'POST',
  DELETE = 'DELETE',
  PUT = 'PUT',
  PATCH = 'PATCH',
  ALL = 'ALL',
  OPTIONS = 'OPTIONS',
  HEAD = 'HEAD',
}

export type ErrorHandler<TRequest = any, TResponse = any> = (
  error: any,
  req: TRequest,
  res: TResponse,
  next?: Function,
) => any;

export type RequestHandler<TRequest = any, TResponse = any> = (
  req: TRequest,
  res: TResponse,
  next?: Function,
) => any;
