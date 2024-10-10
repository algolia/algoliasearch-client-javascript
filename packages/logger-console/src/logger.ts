import type { LogLevelType, Logger } from '@algolia/client-common';
import { LogLevelEnum } from '@algolia/client-common';

export function createConsoleLogger(logLevel: LogLevelType): Logger {
  return {
    debug(message: string, args?: any): Readonly<Promise<void>> {
      if (LogLevelEnum.Debug >= logLevel) {
        console.debug(message, args);
      }

      return Promise.resolve();
    },

    info(message: string, args?: any): Readonly<Promise<void>> {
      if (LogLevelEnum.Info >= logLevel) {
        console.info(message, args);
      }

      return Promise.resolve();
    },

    error(message: string, args?: any): Readonly<Promise<void>> {
      console.error(message, args);

      return Promise.resolve();
    },
  };
}
