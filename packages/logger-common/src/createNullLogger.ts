import { Logger } from '.';

export function createNullLogger(): Logger {
  return {
    debug(_message: string, _args?: any): Readonly<Promise<void>> {
      return Promise.resolve();
    },
    info(_message: string, _args?: any): Readonly<Promise<void>> {
      return Promise.resolve();
    },
    error(_message: string, _args?: any): Readonly<Promise<void>> {
      return Promise.resolve();
    },
  };
}
