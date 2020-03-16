export type AnalyticsClientOptions = {
  /**
   * The application id.
   */
  readonly appId: string;

  /**
   * The api key.
   */
  readonly apiKey: string;

  /**
   * The prefered region.
   */
  readonly region?: 'de' | 'us';
};
