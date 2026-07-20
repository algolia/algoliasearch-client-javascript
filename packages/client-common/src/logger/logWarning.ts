import type { Logger } from '../types';

/**
 * Prefers the logger's optional `warn` method and falls back to `console.warn`, so warnings stay visible with the default no-op logger.
 */
export function logWarning(logger: Logger, message: string): void {
  if (logger.warn) {
    // a rejecting custom `warn` must not become a fatal unhandled rejection
    void Promise.resolve(logger.warn(message)).catch(() => {});
  } else {
    console.warn(message);
  }
}
