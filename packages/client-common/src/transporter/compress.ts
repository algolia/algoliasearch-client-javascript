import { gzipSync } from 'fflate';

export const COMPRESSION_THRESHOLD = 750;

/**
 * Compresses a string using gzip via fflate.
 * Works in both Node.js and browsers with no platform-specific code.
 */
export function compress(data: string): Uint8Array {
  return gzipSync(new TextEncoder().encode(data));
}
