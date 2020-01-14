import { Transporter } from '@algolia/transporter';

export type RecommendationClient = {
  /**
   * The application id.
   */
  readonly appId: string;

  /**
   * The underlying transporter.
   */
  readonly transporter: Transporter;

  /**
   * The client version.
   */
  readonly version: string;
};
