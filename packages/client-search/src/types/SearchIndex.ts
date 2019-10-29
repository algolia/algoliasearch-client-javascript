import { createTransporter } from '@algolia/transporter';

export type SearchIndex = {
  readonly transporter: ReturnType<typeof createTransporter>;
  readonly indexName: string;
};
