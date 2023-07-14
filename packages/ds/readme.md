# @oYoHim/DS

[![npm](https://img.shields.io/npm/v/@oyohim/ds?style=flat-square)](https://www.npmjs.com/package/@oyohim/ds)
![issues](https://img.shields.io/github/issues/oyohimjs/oyohim?style=flat-square)

Create a dynamic secret for oyohim.

## Installation

```shell
npm install @oyohim/ds

# or use yarn

yarn add @oyohim/ds
```

## Usage

```typescript
import { DynamicSecret } from '@oyohim/ds'

const webviewDS = DynamicSecret.createSign(DynamicSecret.Version.WebView)
const DS = webbiewDS({/** post body */}, {/** get query params */})
```

## License

This project is licensed under the [MIT License](./LICENSE).

Only for learning and communication, not for commercial use.
