export const AuthMode: Readonly<Record<string, AuthModeType>> = {
  /**
   * If auth credentials should be in query parameters.
   */
  WithinQueryParameters: 0,

  /**
   * If auth credentials should be in headers.
   */
  WithinHeaders: 1,
};

export type AuthModeType = 0 | 1;
