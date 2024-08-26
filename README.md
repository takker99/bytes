# bytes

[![JSR](https://jsr.io/badges/@takker/bytes)](https://jsr.io/@takker/bytes)
[![test](https://github.com/takker99/bytes/workflows/ci/badge.svg)](https://github.com/takker99/bytes/actions?query=workflow%3Aci)

A utility pack for byte operations without `DataView`

This is useful when you reduce the bundle size of your project.

# Usage

```ts
import { getUint16LE, setUintBE } from "@takker/bytes";
import { assertEquals } from "@std/assert";

const buffer = new Uint8Array([0x01, 0x02, 0x03, 0x04]);
const value = getUint16LE(buffer, 1);
assertEquals(value, 0x0302);

setUintBE(buffer, 1, 0x0506);
assertEquals(buffer, new Uint8Array([0x01, 0x05, 0x06, 0x04]));
```
