import { Quester } from '@oyohim/quester'
import axios, { AxiosResponse, AxiosRequestConfig, AxiosHeaders } from 'axios'

declare module '@oyohim/quester' {
  interface Quester {
    axios<T = any>(config?: AxiosRequestConfig): Promise<AxiosResponse<T>>
  }
  namespace Quester {
  }
}

export class AxiosAdapter implements Quester.Adapter {
  readonly name = 'axios'

  entity(config: Quester.Config) {
    return axios(config)
  }

  async quester<T = any>(method: Quester.Method, config: Quester.Config & AxiosRequestConfig) {
    const response = await axios.request<T>({ method, ...config })
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers as unknown as Quester.Headers,
    }
  }
}
