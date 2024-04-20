import { Transporter } from '@sefai/transporter';

export type AnalyticsClient = {
  /**
   * The application id.
   */
  readonly appId: string;

  /**
   * The underlying transporter.
   */
  readonly transporter: Transporter;
};
