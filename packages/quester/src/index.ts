import { HttpMethod, QuesterAdapter, QuesterConfig, QuesterHeaders } from "./types"

export interface Quester {
  <T = any>(method: Quester.Method, config?: Quester.Config): Promise<T>
  <T = any>(method: Quester.Method, url: string, config?: Quester.Config): Promise<T>
  config: Quester.Config
}

export class Quester {
  constructor(adapter: Quester.Adapter, config: Quester.Config) {
    return Quester.create(adapter, config)
  }

  /**
   * create a get quester instance
   * @param url URL or path
   * @param params query params
   * @param config quester config
   */
  get<T = any>(url: string, params?: Record<string, any>, config?: Quester.Config): Promise<T> {
    return this('GET', url, { ...config, data: params })
  }

  /**
   * create a post quester instance
   * @param url URL or path
   * @param data body data
   * @param config quester config
   */
  post<T = any>(url: string, data?: Record<string, any>, config?: Quester.Config): Promise<T> {
    return this('POST', url, { ...config, data })
  }
}

export namespace Quester {
  export type Method = HttpMethod
  export type Headers = QuesterHeaders
  export type Adapter = QuesterAdapter
  export interface Config extends QuesterConfig {}

  export function create(adapter: Quester.Adapter, config: Quester.Config = {}): Quester {
    const request = (async (method, url, config) => {
      const URI = new URL(url, config.baseURL)
      const res = await adapter.quester(method, { url: URI.href, ...config })
      return res.data
    }) as Quester

    Object.setPrototypeOf(request, Quester.prototype)
    for (const key in Quester.prototype) {
      if (['constructor'].includes(key)) continue
      request[key] = Quester.prototype[key].bind(request)
    }

    // Mixin the adapter
    request[adapter.name] = adapter.entity

    request.config = config
    return request
  }
}
