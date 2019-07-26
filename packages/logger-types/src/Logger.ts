export interface Logger {
  readonly debug: (message: string, args: any) => void;
  readonly info: (message: string, args: any) => void;
  readonly error: (message: string, args: any) => void;
}
