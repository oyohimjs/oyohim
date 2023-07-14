export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS' | 'ALL'

export interface QuesterConfig {
  baseURL?: string
  url?: string
  method?: HttpMethod
  headers?: QuesterHeaders
  timeout?: number
  httpAgent?: any
  httpsAgent?: any
  data?: Record<string, any>
}

export interface QuesterAdapter {
  readonly name: string
  entity: (config: QuesterConfig) => any
  quester: <T = any>(method: HttpMethod, config: QuesterConfig) => Promise<QuesterAdapterResponse<T>>
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
