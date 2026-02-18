export const AuthMode: Readonly<Record<string, AuthModeType>> = {
  /**
   * Algolia credentials are sent as query parameters
   */
  WithinQueryParameters: 0,

  /**
   * Algolia credentials are sent as headers
   */
  WithinHeaders: 1,

  /**
   * Algolia credentials are sent as part of the body
   */
  WithinBody: 2,
};

export type AuthModeType = 0 | 1 | 2;
