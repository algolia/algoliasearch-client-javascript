export type Logger = {
  readonly debug: (message: string, args: any) => void;
  readonly info: (message: string, args: any) => void;
  readonly error: (message: string, args: any) => void;
};

export const LogLevel: { readonly [key: string]: LogLevelType } = {
  Debug: 1,
  Info: 2,
  Error: 3,
};

export type LogLevelType = 1 | 2 | 3;
