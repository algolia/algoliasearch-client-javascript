import { Transporter } from '@sefai/transporter';

export type SearchIndex = {
  /**
   * The application id.
   */
  readonly appId: string;

  /**
   * The index name.
   */
  readonly indexName: string;

  /**
   * The underlying transporter.
   */
  readonly transporter: Transporter;
};
