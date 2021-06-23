import { Transporter } from '@algolia/transporter';

export type PersonalizationClient = {
  /**
   * The application id.
   */
  readonly appId: string;

  /**
   * The underlying transporter.
   */
  readonly transporter: Transporter;
};
