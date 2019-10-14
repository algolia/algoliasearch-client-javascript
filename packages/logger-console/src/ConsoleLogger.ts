/* eslint no-console: 0 */

import { Logger, LogLevel, LogLevelType } from '@algolia/logger-types';

export class ConsoleLogger implements Logger {
  private readonly logLevel: LogLevelType;

  public constructor(logLevel: LogLevelType) {
    this.logLevel = logLevel;
  }

  public debug(message: string, args: any): void {
    if (LogLevel.Debug >= this.logLevel) {
      console.debug(message, args);
    }
  }

  public info(message: string, args: any): void {
    if (LogLevel.Info >= this.logLevel) {
      console.info(message, args);
    }
  }

  public error(message: string, args: any): void {
    console.error(message, args);
  }
}
