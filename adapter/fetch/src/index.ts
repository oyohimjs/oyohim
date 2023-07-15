import { Quester } from '@oyohim/quester'
import { AnyNaptrRecord } from 'dns'

declare module '@oyohim/quester' {
  interface Quester {
    fetch<T = any>(url: string, config?: RequestInit): Promise<T>
  }
  namespace Quester {
    interface Config {
      body?: BodyInit | null
    }
  }
}

export class FetchAdapter implements Quester.Adapter {
  readonly name = 'fetch'

  trimUrl(url: string) {
    return url.replace(/\/$/, '')
  }

  trimConfig(config: Quester.Config) {
    if (config.url) config.url = this.trimUrl(config.url)
    if (config.data) {
      if (config.method === 'GET') config.url += `?${new URLSearchParams(config.data as any)}`
      if (config.method === 'POST') config.body = JSON.stringify(config.data)
    }
    return config
  }

  entity(config: Quester.Config) {
    config = this.trimConfig(config)
    return fetch(config.url, config)
  }

  async quester<T = any>(method: Quester.Method, config: Quester.Config & RequestInit) {
    config.method = method
    config = this.trimConfig(config)
    const response = await fetch(config.url, config)
    return {
      data: await response.json() as T,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers as unknown as Quester.Headers,
    }
  }
}
