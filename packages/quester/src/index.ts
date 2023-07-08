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

  get<T = any>(url: string, params?: any, config?: Quester.Config): Promise<T> {
    return this('GET', url, { ...config, data: params })
  }

  post<T = any>(url: string, data?: any, config?: Quester.Config): Promise<T> {
    return this('POST', url, { ...config, data })
  }
}

export namespace Quester {
  export type Method = HttpMethod
  export type Headers = QuesterHeaders
  export type Config = QuesterConfig
  export type Adapter = QuesterAdapter

  export function create(adapter: Quester.Adapter, config: Quester.Config = {}): Quester {
    const instance = (async function (method: Quester.Method, url: string, config: Quester.Config = {}) {
      return (await adapter(method, url, { ...instance.config, ...config })).data
    }) as Quester

    instance.config = config
    return instance
  }
}
