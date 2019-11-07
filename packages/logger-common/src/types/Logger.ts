export type Logger = {
  readonly debug: (message: string, args: any) => Readonly<Promise<void>>;
  readonly info: (message: string, args: any) => Readonly<Promise<void>>;
  readonly error: (message: string, args: any) => Readonly<Promise<void>>;
};
