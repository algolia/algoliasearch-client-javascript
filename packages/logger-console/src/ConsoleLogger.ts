/* eslint no-console: 0 */

import { Logger } from '@algolia/logger-types';

export class ConsoleLogger implements Logger {
  public debug(message: string, args: any): void {
    console.debug(message, args);
  }

  public info(message: string, args: any): void {
    console.info(message, args);
  }

  public error(message: string, args: any): void {
    console.error(message, args);
  }
}
