import { Transporter } from '@algolia/transporter';

export type SearchIndex = {
  readonly appId: string;
  readonly indexName: string;
  readonly transporter: Transporter;
};
