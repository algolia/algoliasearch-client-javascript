import type { Logger } from '../types/logger';

export function createNullLogger(): Logger {
  return {
    debug(_message: string, _args?: any | undefined): Promise<void> {
      return Promise.resolve();
    },
    info(_message: string, _args?: any | undefined): Promise<void> {
      return Promise.resolve();
    },
    error(_message: string, _args?: any | undefined): Promise<void> {
      return Promise.resolve();
    },
  };
}
