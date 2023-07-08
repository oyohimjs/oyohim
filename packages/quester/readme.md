# @oyoHiM/Quester

[![npm](https://img.shields.io/npm/v/@oyohim/quester?style=flat-square)](https://www.npmjs.com/package/@oyohim/quester)
[![GitHub](https://img.shields.io/github/license/oyohimjs/oyohim?style=flat-square)](./LICENSE)

Simple http request framework for oyohim.

> Because of current demand is get and post, so this package only support get and post.

## Installation

```shell
npm install @oyohim/quester

# or use yarn

yarn add @oyohim/quester
```

## Usage

```typescript
import { Quester } from '@oyohim/quester';
import { AdapterAxios } from '@oyohim/adapter-axios';

const http = new Quester(AdapterAxios, {
  baseURL: 'https://api.github.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

const respose = await http.get('/users/oyohimjs');
```

## API

### class `Quester()`

- adapter: `Quester.Adapter`
- config: `Quester.Config`

#### `.get<T>()`:Promise\<QuesterAdapterResponse\<T\>\>

- url: `string`
- config?: `Quester.Config`

#### `.post<T>()`:Promise\<QuesterAdapterResponse\<T\>\>

- url: `string`
- config?: `Quester.Config`

## Adapter

- [AdapterAxios](../../adapter/axios)
- [AdapterFetch](../../adapter/fetch)

## Thanks

- [satori](https://github.com/satorijs/satori)
- [axios](https://github.com/axios/axios)

## License

This project is licensed under the [MIT License](./LICENSE).
