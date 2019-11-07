import { Logger } from '.';

export function createNullLogger(): Logger {
  /* eslint @typescript-eslint/no-unused-vars: 0 */

  return {
    debug(message: string, args: any): Readonly<Promise<void>> {
      return Promise.resolve();
    },
    info(message: string, args: any): Readonly<Promise<void>> {
      return Promise.resolve();
    },
    error(message: string, args: any): Readonly<Promise<void>> {
      return Promise.resolve();
    },
  };
}
