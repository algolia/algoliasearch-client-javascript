/* eslint no-console: 0 */ // --> OFF
export class ConsoleLogger {
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
