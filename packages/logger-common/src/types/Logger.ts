export type Logger = {
  /**
   * Logs debug messages.
   */
  readonly debug: (message: string, args?: any) => Readonly<Promise<void>>;

  /**
   * Logs info messages.
   */
  readonly info: (message: string, args?: any) => Readonly<Promise<void>>;

  /**
   * Logs error messages.
   */
  readonly error: (message: string, args?: any) => Readonly<Promise<void>>;
};
