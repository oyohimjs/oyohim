import { Quester } from '@oyohim/quester'
import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'

declare module '@oyohim/quester' {
  interface Quester {
    axios<T = any>(config?: AxiosRequestConfig): Promise<AxiosResponse<T>>
  }
}

export class AxiosAdapter {
  readonly name = 'axios'

  entity(config: Quester.Config) {
    return axios(config)
  }

  quester<T = any>(method: Quester.Method, config: Quester.Config & AxiosRequestConfig) {
    return axios.request<T>({ method, ...config })
  }
}
