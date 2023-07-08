import { createHash, randomInt } from 'node:crypto'

export class DynamicSecret {
  constructor(private salt: string) { }

  private sample(array: Array<any>, count: number) {
    let shuffled = array.slice(0), i = array.length, min = i - count, temp, index
    while (i-- > min) {
      index = (Math.floor((i + 1) * Math.random()))
      temp = shuffled[index]
      shuffled[index] = shuffled[i]
      shuffled[i] = temp
    }
    return shuffled.slice(min)
  }

  private v1() {
    let t: string = Math.round(new Date().getTime() / 1000).toString()
    let r: string = this.sample('abcdefghijklmnopqrstuvwxyz0123456789'.split(''), 6).join('')
    let c: string = this.hash({ t, r }, this.salt)
    return `${t},${r},${c}`
  }

  private v2(body?: Record<string, any>, params?: Record<string, any>) {
    let t: string = Math.round(new Date().getTime() / 1000).toString()
    let r: string = randomInt(100001, 200000).toString()
    let b: string = body ? JSON.stringify(body) : ''
    let q: string = params ? encodeURI(JSON.stringify(params)) : ''
    let c: string = this.hash({ t, r, b, q })
    return `${t},${r},${c}`
  }

  //TODO
  private v3() { }

  protected hash(value: Record<string, any>, salt: string = this.salt): string {
    let temp: string[] = ['salt=' + salt];
    Object.keys(value).forEach(key => {
      temp.push(`${key}=${value[key]}`)
    })
    return createHash('md5').update(temp.join('&')).digest('hex')
  }

  createSign<T extends DynamicSecret.Version>(type: T): DynamicSecret.Constructor<T> {
    return this[type as string] as DynamicSecret.Constructor<T>
  }
}

export namespace DynamicSecret {
  export type Type = 'cn' | 'os'
  export enum Version {
    Native = 'v1',
    WebView = 'v2'
  }
  export type Constructor<V extends Version> =
    V extends Version.Native
    ? (salt?: string) => string
    : V extends Version.WebView
    ? (body?: Record<string, any>, params?: Record<string, any>) => string
    : never
  export type SaltType = 'k2' | 'lk2' | '4x' | '6x' | 'prod'
  export type SemVer = `${number}.${number}.${number}${never}`
  export type Salt = {
    [key in SaltType]: string | [SemVer, string][]
  }
}

export const Salts: Record<DynamicSecret.Type, DynamicSecret.Salt> = {
  cn: require('./saltCN.json'),
  os: require('./saltOS.json')
}
