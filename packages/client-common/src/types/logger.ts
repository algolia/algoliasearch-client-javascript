export const LogLevelEnum: Readonly<Record<string, LogLevelType>> = {
  Debug: 1,
  Info: 2,
  Error: 3,
};

export type LogLevelType = 1 | 2 | 3;

export type Logger = {
  /**
   * Logs debug messages.
   */
  debug: (message: string, args?: any | undefined) => Promise<void>;

  /**
   * Logs info messages.
   */
  info: (message: string, args?: any | undefined) => Promise<void>;

  /**
   * Logs error messages.
   */
  error: (message: string, args?: any | undefined) => Promise<void>;
};
