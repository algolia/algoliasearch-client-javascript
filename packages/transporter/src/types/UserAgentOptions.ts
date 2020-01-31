export type UserAgentOptions = {
  /**
   * The segment. Usually the integration name.
   */
  readonly segment: string;

  /**
   * The version. Usually the integration version.
   */
  readonly version?: string;
};
