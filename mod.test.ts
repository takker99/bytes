import {
  getBigUint64BE,
  getBigUint64LE,
  getInt16BE,
  getInt16LE,
  getInt8,
  getUint16BE,
  getUint16LE,
  getUint32BE,
  getUint32LE,
  getUint64BE,
  getUint64LE,
  getUint8,
  setUintBE,
  setUintLE,
} from "@takker/bytes";
import { assertEquals, assertNotEquals } from "@std/assert";

Deno.test("getUint8()", () => {
  const buffer = new Uint8Array([0x01, 0x80, 0xFF]);
  assertEquals(getUint8(buffer, 0), 0x01);
  assertEquals(getUint8(buffer, 1), 0x80);
  assertEquals(getUint8(buffer, 2), 0xFF);

  const view = new DataView(buffer.buffer);
  assertEquals(getUint8(buffer, 0), view.getUint8(0));
  assertEquals(getUint8(buffer, 1), view.getUint8(1));
  assertEquals(getUint8(buffer, 2), view.getUint8(2));

  const buffer2 = new Uint8Array([1, -128, -1]);
  assertEquals(getUint8(buffer2, 0), 0x01);
  assertEquals(getUint8(buffer2, 1), 0x80);
  assertEquals(getUint8(buffer2, 2), 0xFF);

  const view2 = new DataView(buffer2.buffer);
  assertEquals(getUint8(buffer2, 0), view2.getUint8(0));
  assertEquals(getUint8(buffer2, 1), view2.getUint8(1));
  assertEquals(getUint8(buffer2, 2), view2.getUint8(2));
});

Deno.test("getInt8()", () => {
  const buffer = new Uint8Array([0x01, 0x80, 0xFF]);
  assertEquals(getInt8(buffer, 0), 1);
  assertEquals(getInt8(buffer, 1), -128);
  assertEquals(getInt8(buffer, 2), -1);

  const view = new DataView(buffer.buffer);
  assertEquals(getInt8(buffer, 0), view.getInt8(0));
  assertEquals(getInt8(buffer, 1), view.getInt8(1));
  assertEquals(getInt8(buffer, 2), view.getInt8(2));

  const buffer2 = new Uint8Array([1, -128, -1]);
  assertEquals(getInt8(buffer2, 0), 1);
  assertEquals(getInt8(buffer2, 1), -128);
  assertEquals(getInt8(buffer2, 2), -1);

  const view2 = new DataView(buffer.buffer);
  assertEquals(getInt8(buffer2, 0), view2.getInt8(0));
  assertEquals(getInt8(buffer2, 1), view2.getInt8(1));
  assertEquals(getInt8(buffer2, 2), view2.getInt8(2));
});

Deno.test("getUint16LE()", () => {
  const buffer = new Uint8Array([0x01, 0x02, 0xa3, 0xb4]);
  assertEquals(getUint16LE(buffer, 0), 0x0201);
  assertEquals(getUint16LE(buffer, 1), 0xa302);
  assertEquals(getUint16LE(buffer, 2), 0xb4a3);

  const view = new DataView(buffer.buffer);
  assertEquals(getUint16LE(buffer, 0), view.getUint16(0, true));
  assertEquals(getUint16LE(buffer, 1), view.getUint16(1, true));
  assertEquals(getUint16LE(buffer, 2), view.getUint16(2, true));
});

Deno.test("getUint16BE()", () => {
  const buffer = new Uint8Array([0x01, 0x02, 0xa3, 0xb4]);
  assertEquals(getUint16BE(buffer, 0), 0x0102);
  assertEquals(getUint16BE(buffer, 1), 0x02a3);
  assertEquals(getUint16BE(buffer, 2), 0xa3b4);

  const view = new DataView(buffer.buffer);
  assertEquals(getUint16BE(buffer, 0), view.getUint16(0));
  assertEquals(getUint16BE(buffer, 1), view.getUint16(1));
  assertEquals(getUint16BE(buffer, 2), view.getUint16(2));
});

Deno.test("getInt16LE()", () => {
  const buffer = new Uint8Array([0x01, 0x80, 0xFF, 0x7F]);
  assertEquals(getInt16LE(buffer, 0), -32767);
  assertEquals(getInt16LE(buffer, 1), -128);
  assertEquals(getInt16LE(buffer, 2), 32767);

  const view = new DataView(buffer.buffer);
  assertEquals(getInt16LE(buffer, 0), view.getInt16(0, true));
  assertEquals(getInt16LE(buffer, 1), view.getInt16(1, true));
  assertEquals(getInt16LE(buffer, 2), view.getInt16(2, true));

  const buffer2 = new Uint8Array([1, -128, -1, 127]);
  assertEquals(getInt16LE(buffer2, 0), -32767);
  assertEquals(getInt16LE(buffer2, 1), -128);
  assertEquals(getInt16LE(buffer2, 2), 32767);

  const view2 = new DataView(buffer2.buffer);
  assertEquals(getInt16LE(buffer2, 0), view2.getInt16(0, true));
  assertEquals(getInt16LE(buffer2, 1), view2.getInt16(1, true));
  assertEquals(getInt16LE(buffer2, 2), view2.getInt16(2, true));
});

Deno.test("getInt16BE()", () => {
  const buffer = new Uint8Array([0x01, 0x80, 0xFF, 0x7F]);
  assertEquals(getInt16BE(buffer, 0), 0x0180);
  assertEquals(getInt16BE(buffer, 1), -32513);
  assertEquals(getInt16BE(buffer, 2), -129);

  const view = new DataView(buffer.buffer);
  assertEquals(getInt16BE(buffer, 0), view.getInt16(0));
  assertEquals(getInt16BE(buffer, 1), view.getInt16(1));
  assertEquals(getInt16BE(buffer, 2), view.getInt16(2));

  const buffer2 = new Uint8Array([1, -128, -1, 127]);
  assertEquals(getInt16BE(buffer2, 0), 0x0180);
  assertEquals(getInt16BE(buffer2, 1), -32513);
  assertEquals(getInt16BE(buffer2, 2), -129);

  const view2 = new DataView(buffer2.buffer);
  assertEquals(getInt16BE(buffer2, 0), view2.getInt16(0));
  assertEquals(getInt16BE(buffer2, 1), view2.getInt16(1));
  assertEquals(getInt16BE(buffer2, 2), view2.getInt16(2));
});

Deno.test("getUint32LE()", () => {
  const buffer = new Uint8Array([0x01, 0x02, 0xa3, 0xb4, 0x05, 0x06]);
  assertEquals(getUint32LE(buffer, 0), 0xb4a30201);
  assertEquals(getUint32LE(buffer, 1), 0x05b4a302);
  assertEquals(getUint32LE(buffer, 2), 0x0605b4a3);
});

Deno.test("getUint32BE()", () => {
  const buffer = new Uint8Array([0x01, 0x02, 0x03, 0x04, 0x05, 0x06]);
  assertEquals(getUint32BE(buffer, 0), 0x01020304);
  assertEquals(getUint32BE(buffer, 1), 0x02030405);
  assertEquals(getUint32BE(buffer, 2), 0x03040506);
});

Deno.test("getUint64LE()", async (t) => {
  await t.step("< Number.MAX_SAFE_INTEGER", () => {
    // deno-fmt-ignore
    const buffer = new Uint8Array([0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x17, 0x00, 0x00, 0x01]);
    assertEquals(getUint64LE(buffer, 0), 0x0017060504030201);
    assertNotEquals(getUint64LE(buffer, 0), 0x0017060504030202);
    assertNotEquals(getUint64LE(buffer, 0), 0x0017060504030203);
  });
  await t.step(">= Number.MAX_SAFE_INTEGER", () => {
    // deno-fmt-ignore
    const buffer = new Uint8Array([0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0A]);
    assertEquals(getUint64LE(buffer, 0), 0x0807060504030201);
    // 0x0807060504030201 is larger than `Number.MAX_SAFE_INTEGER`, so it will be rounded.
    assertEquals(getUint64LE(buffer, 0), 0x0807060504030202);
    assertEquals(getUint64LE(buffer, 0), 0x0807060504030203);
    assertEquals(getUint64LE(buffer, 2), 0x0A09080706050403);
    // 0x0A09080706050403 is larger than `Number.MAX_SAFE_INTEGER`, so it will be rounded.
    assertEquals(getUint64LE(buffer, 2), 0x0A09080706050404);
    assertEquals(getUint64LE(buffer, 2), 0x0A09080706050405);
  });
});

Deno.test("getUint64BE()", async (t) => {
  await t.step("< Number.MAX_SAFE_INTEGER", () => {
    // deno-fmt-ignore
    // deno-fmt-ignore
    const buffer = new Uint8Array([0x00,0x17, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06]);
    assertEquals(getUint64BE(buffer, 0), 0x0017010203040506);
    assertNotEquals(getUint64BE(buffer, 0), 0x0017010203040507);
    assertNotEquals(getUint64BE(buffer, 0), 0x0017010203040508);
  });
  await t.step(">= Number.MAX_SAFE_INTEGER", () => {
    // deno-fmt-ignore
    const buffer = new Uint8Array([0x08, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0A]);
    assertEquals(getUint64BE(buffer, 0), 0x0802030405060708);
    // 0x0807060504030201 is larger than `Number.MAX_SAFE_INTEGER`, so it will be rounded.
    assertEquals(getUint64BE(buffer, 0), 0x0802030405060709);
    assertEquals(getUint64BE(buffer, 0), 0x080203040506070A);

    assertEquals(getUint64BE(buffer, 2), 0x030405060708090A);
    // 0x0A09080706050403 is larger than `Number.MAX_SAFE_INTEGER`, so it will be rounded.
    assertEquals(getUint64BE(buffer, 2), 0x030405060708090B);
    assertEquals(getUint64BE(buffer, 2), 0x030405060708090C);
  });
});

Deno.test("getBigUint64LE()", () => {
  // deno-fmt-ignore
  const buffer = new Uint8Array([ 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0A]);
  assertEquals(getBigUint64LE(buffer, 0), 0x0807060504030201n);
  // BigInt can represents numbers larger than `Number.MAX_SAFE_INTEGER` exactly.
  assertNotEquals(getBigUint64LE(buffer, 0), 0x0807060504030202n);
  assertNotEquals(getBigUint64LE(buffer, 0), 0x0807060504030203n);

  assertEquals(getBigUint64LE(buffer, 2), 0x0A09080706050403n);
  // BigInt can represents numbers larger than `Number.MAX_SAFE_INTEGER` exactly.
  assertNotEquals(getBigUint64LE(buffer, 2), 0x0A09080706050404n);
  assertNotEquals(getBigUint64LE(buffer, 2), 0x0A09080706050405n);

  const view = new DataView(buffer.buffer);
  assertEquals(getBigUint64LE(buffer, 0), view.getBigUint64(0, true));
  assertEquals(getBigUint64LE(buffer, 1), view.getBigUint64(1, true));
  assertEquals(getBigUint64LE(buffer, 2), view.getBigUint64(2, true));
});

Deno.test("getBigUint64BE()", () => {
  // deno-fmt-ignore
  const buffer = new Uint8Array([0x08, 0x01, 0x0F, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09]);
  assertEquals(getBigUint64BE(buffer, 0), 0x08010F0304050607n);
  // BigInt can represents numbers larger than `Number.MAX_SAFE_INTEGER` exactly.
  assertNotEquals(getBigUint64BE(buffer, 0), 0x08010F0304050608n);
  assertNotEquals(getBigUint64BE(buffer, 0), 0x08010F0304050609n);

  assertEquals(getBigUint64BE(buffer, 2), 0x0F03040506070809n);
  // BigInt can represents numbers larger than `Number.MAX_SAFE_INTEGER` exactly.
  assertNotEquals(getBigUint64BE(buffer, 2), 0x0F0304050607080An);
  assertNotEquals(getBigUint64BE(buffer, 2), 0x0F0304050607080Bn);

  const view = new DataView(buffer.buffer);
  assertEquals(getBigUint64BE(buffer, 0), view.getBigUint64(0));
  assertEquals(getBigUint64BE(buffer, 1), view.getBigUint64(1));
  assertEquals(getBigUint64BE(buffer, 2), view.getBigUint64(2));
});

Deno.test("setUintLE()", () => {
  const buffer = new Uint8Array(4);
  assertEquals(setUintLE(buffer, 0, 0x04030201), 4);
  assertEquals(buffer, new Uint8Array([0x01, 0x02, 0x03, 0x04]));

  assertEquals(setUintLE(buffer, 1, 0x08), 2);
  assertEquals(buffer, new Uint8Array([0x01, 0x08, 0x03, 0x04]));
});

Deno.test("setUintBE()", () => {
  const buffer = new Uint8Array(4);

  setUintBE(buffer, 0, 0x01020304);
  assertEquals(buffer, new Uint8Array([0x01, 0x02, 0x03, 0x04]));

  setUintBE(buffer, 1, 0x05060708);
  assertEquals(buffer, new Uint8Array([0x01, 0x05, 0x06, 0x07]));

  setUintBE(buffer, 2, 0x090a0b0c);
  assertEquals(buffer, new Uint8Array([0x01, 0x05, 0x09, 0x0a]));
});
