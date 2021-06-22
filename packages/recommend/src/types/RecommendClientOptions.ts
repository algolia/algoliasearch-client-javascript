import { AuthModeType } from '@algolia/client-common';

export type RecommendClientOptions = {
  /**
   * The application id.
   */
  readonly appId: string;

  /**
   * The api key.
   */
  readonly apiKey: string;

  /**
   * The auth mode type. In browser environments credentials may
   * be passed within the headers.
   */
  readonly authMode?: AuthModeType;
};
