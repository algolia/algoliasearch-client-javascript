export const LogLevelEnum: Readonly<Record<string, LogLevelType>> = {
  Debug: 1,
  Info: 2,
  Error: 3,
};

export type LogLevelType = 1 | 2 | 3;
