import { Transporter } from '@algolia/transporter';

export type SearchIndex = {
  readonly transporter: Transporter;
  readonly indexName: string;
};
