/**
 * Byte Utilities
 *
 * Although you can do the same operations using {@linkcode DataView},
 * you can take advantage of reducing the bundle size by implementing them without {@linkcode DataView}.
 *
 * These functions are written referring to the following repository:
 * - https://deno.land/std@0.177.0/node/internal/buffer.mjs
 * - https://github.com/101arrowz/fflate
 *
 * @module
 */

/** Read a 8-bit unsigned integer from the `buffer` at the specified `byteOffset`.
 *
 * @param buffer - The input buffer.
 * @param byteOffset - The offset in the buffer to read from.
 * @returns The 8-bit unsigned integer at the specified `byteOffset`.
 */
export const getUint8 = (buffer: Uint8Array, byteOffset: number): number =>
  buffer[byteOffset];

/** Read a 8-bit signed integer from the `buffer` at the specified `byteOffset`.
 *
 * @param buffer - The input buffer.
 * @param byteOffset - The offset in the buffer to read from.
 * @returns The 8-bit signed integer at the specified `byteOffset`.
 */
export const getInt8 = (buffer: Uint8Array, byteOffset: number): number =>
  buffer[byteOffset] | (buffer[byteOffset] & 0x80) * 0x1fffffe;

/** Read a 16-bit little-endian unsigned integer from the `buffer` at the specified `byteOffset`.
 *
 * @param buffer - The input buffer.
 * @param byteOffset - The offset in the buffer to read from.
 * @returns The 16-bit little-endian unsigned integer at the specified `byteOffset`.
 */
export const getUint16LE = (buffer: Uint8Array, byteOffset: number): number =>
  buffer[byteOffset] | (buffer[byteOffset + 1] << 8);

/** Read a 16-bit big-endian unsigned integer from the `buffer` at the specified `byteOffset`.
 *
 * @param buffer - The input buffer.
 * @param byteOffset - The offset in the buffer to read from.
 * @returns The 16-bit big-endian unsigned integer at the specified `byteOffset`.
 */
export const getUint16BE = (buffer: Uint8Array, byteOffset: number): number =>
  (buffer[byteOffset] << 8) | buffer[byteOffset + 1];

/** Read a 16-bit little-endian signed integer from the `buffer` at the specified `byteOffset`.
 *
 * @param buffer - The input buffer.
 * @param byteOffset - The offset in the buffer to read from.
 * @returns The 16-bit little-endian signed integer at the specified `byteOffset`.
 */
export const getInt16LE = (buffer: Uint8Array, byteOffset: number): number => {
  const value = getUint16LE(buffer, byteOffset);
  return value | (value & 0x8000) * 0x1fffe;
};

/** Read a 16-bit big-endian signed integer from the `buffer` at the specified `byteOffset`.
 *
 * @param buffer - The input buffer.
 * @param byteOffset - The offset in the buffer to read from.
 * @returns The 16-bit big-endian signed integer at the specified `byteOffset`.
 */
export const getInt16BE = (buffer: Uint8Array, byteOffset: number): number => {
  const value = getUint16BE(buffer, byteOffset);
  return value | (value & 0x8000) * 0x1fffe;
};

/**  Read a 32-bit little-endian unsigned integer from the `buffer` at the specified `byteOffset`.
 *
 * @param buffer - The input buffer.
 * @param byteOffset - The offset in the buffer to read from.
 * @returns The 32-bit little-endian unsigned integer at the specified `byteOffset`.
 */
export const getUint32LE = (buffer: Uint8Array, byteOffset: number): number =>
  // `>>> 0` converts a signed 32-bit integer to an unsigned 32-bit integer
  getInt32LE(buffer, byteOffset) >>> 0;

/**  Read a 32-bit big-endian unsigned integer from the `buffer` at the specified `byteOffset`.
 *
 * @param buffer - The input buffer.
 * @param byteOffset - The offset in the buffer to read from.
 * @returns The 32-bit big-endian unsigned integer at the specified `byteOffset`.
 */
export const getUint32BE = (buffer: Uint8Array, byteOffset: number): number =>
  // `>>> 0` converts a signed 32-bit integer to an unsigned 32-bit integer
  getInt32BE(buffer, byteOffset) >>> 0;

/**  Read a 32-bit little-endian signed integer from the `buffer` at the specified `byteOffset`.
 *
 * @param buffer - The input buffer.
 * @param byteOffset - The offset in the buffer to read from.
 * @returns The 32-bit little-endian signed integer at the specified `byteOffset`.
 */
export const getInt32LE = (buffer: Uint8Array, byteOffset: number): number =>
  buffer[byteOffset] | (buffer[byteOffset + 1] << 8) |
  (buffer[byteOffset + 2] << 16) | (buffer[byteOffset + 3] << 24);

/**  Read a 32-bit big-endian signed integer from the `buffer` at the specified `byteOffset`.
 *
 * @param buffer - The input buffer.
 * @param byteOffset - The offset in the buffer to read from.
 * @returns The 32-bit big-endian signed integer at the specified `byteOffset`.
 */
export const getInt32BE = (buffer: Uint8Array, byteOffset: number): number =>
  (buffer[byteOffset] << 24) | (buffer[byteOffset + 1] << 16) |
  (buffer[byteOffset + 2] << 8) | buffer[byteOffset + 3];

/** Read a 64-bit little-endian unsigned integer from the `buffer` at the specified `byteOffset`.
 *
 * @param buffer - The input buffer.
 * @param byteOffset - The offset in the buffer to read from.
 * @returns The 64-bit little-endian unsigned integer at the specified `byteOffset`.
 */
export const getUint64LE = (buffer: Uint8Array, byteOffset: number): number =>
  getUint32LE(buffer, byteOffset) +
  getUint32LE(buffer, byteOffset + 4) * 0x100000000;

/** Read a 64-bit big-endian unsigned integer from the `buffer` at the specified `byteOffset`.
 *
 * @param buffer - The input buffer.
 * @param byteOffset - The offset in the buffer to read from.
 * @returns The 64-bit big-endian unsigned integer at the specified `byteOffset`.
 */
export const getUint64BE = (buffer: Uint8Array, byteOffset: number): number =>
  getUint32BE(buffer, byteOffset) * 0x100000000 +
  getUint32BE(buffer, byteOffset + 4);

const i64 = /*#__PURE__*/ BigInt;

/** Read a 64-bit little-endian unsigned integer from the `buffer` at the specified `byteOffset`.
 *
 * @param buffer - The input buffer.
 * @param byteOffset - The offset in the buffer to read from.
 * @returns The 64-bit little-endian unsigned integer at the specified `byteOffset`.
 */
export const getBigUint64LE = (
  buffer: Uint8Array,
  byteOffset: number,
): bigint =>
  i64(getUint32LE(buffer, byteOffset)) +
  (i64(getUint32LE(buffer, byteOffset + 4)) << 32n);

/** Read a 64-bit big-endian unsigned integer from the `buffer` at the specified `byteOffset`.
 *
 * @param buffer - The input buffer.
 * @param byteOffset - The offset in the buffer to read from.
 * @returns The 64-bit big-endian unsigned integer at the specified `byteOffset`.
 */
export const getBigUint64BE = (
  buffer: Uint8Array,
  byteOffset: number,
): bigint =>
  (i64(getUint32BE(buffer, byteOffset)) << 32n) +
  i64(getUint32BE(buffer, byteOffset + 4));

/** Write a little-endian unsigned integer `value` to the `buffer` at the specified `byteOffset`.
 *
 * @param buffer - The input buffer.
 * @param byteOffset - The offset in the buffer to write to.
 * @param value - The unsigned integer to write.
 * @returns The new offset in the buffer after writing the value.
 */
export const setUintLE = (
  buffer: Uint8Array,
  byteOffset: number,
  value: number,
): number => {
  for (; value; ++byteOffset) buffer[byteOffset] = value, value >>>= 8;
  return byteOffset;
};

/** Write a big-endian unsigned integer `value` to the `buffer` at the specified `byteOffset`.
 *
 * @param buffer - The input buffer.
 * @param byteOffset - The offset in the buffer to write to.
 * @param value - The unsigned integer to write.
 * @returns The new offset in the buffer after writing the value.
 */
export const setUintBE = (
  buffer: Uint8Array,
  byteOffset: number,
  value: number,
): number => {
  const splitted: number[] = [];
  for (; value; value >>>= 8) splitted.unshift(value & 0xff);

  for (const val of splitted) buffer[byteOffset++] = val;
  return byteOffset;
};
