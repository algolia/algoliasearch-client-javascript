/* eslint no-console: 0 */

import { Logger, LogLevel, LogLevelType } from '@algolia/logger-types';

export function createConsoleLogger(logLevel: LogLevelType): Logger {
  return {
    debug(message: string, args: any): void {
      if (LogLevel.Debug >= logLevel) {
        console.debug(message, args);
      }
    },

    info(message: string, args: any): void {
      if (LogLevel.Info >= logLevel) {
        console.info(message, args);
      }
    },

    error(message: string, args: any): void {
      console.error(message, args);
    },
  };
}
