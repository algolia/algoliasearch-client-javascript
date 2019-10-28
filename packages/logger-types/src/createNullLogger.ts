import { Logger } from './types/Logger';

export function createNullLogger(): Logger {
  /* eslint @typescript-eslint/no-unused-vars: 0 */

  return {
    debug(message: string, args: any): void {},
    info(message: string, args: any): void {},
    error(message: string, args: any): void {},
  };
}
