/* eslint no-console: 0 */

import { Logger, LogLevelEnum, LogLevelType } from '@algolia/logger-common';

export function createConsoleLogger(logLevel: LogLevelType): Logger {
  return {
    debug(message: string, args: any): void {
      if (LogLevelEnum.Debug >= logLevel) {
        console.debug(message, args);
      }
    },

    info(message: string, args: any): void {
      if (LogLevelEnum.Info >= logLevel) {
        console.info(message, args);
      }
    },

    error(message: string, args: any): void {
      console.error(message, args);
    },
  };
}
