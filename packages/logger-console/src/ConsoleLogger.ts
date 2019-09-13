/* eslint no-console: 0 */

import { Logger, LogLevelType, LogLevel } from '@algolia/logger-types';

export class ConsoleLogger implements Logger {
  private readonly logLevel: LogLevelType;

  public constructor(logLevel: LogLevelType) {
    this.logLevel = logLevel !== undefined ? LogLevel.Error : logLevel;
  }

  public debug(message: string, args: any): void {
    if (this.logLevel >= LogLevel.Debug) {
      console.debug(message, args);
    }
  }

  public info(message: string, args: any): void {
    if (this.logLevel >= LogLevel.Info) {
      console.info(message, args);
    }
  }

  public error(message: string, args: any): void {
    if (this.logLevel >= LogLevel.Error) {
      console.info(message, args);
    }
  }
}
