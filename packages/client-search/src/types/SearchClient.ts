import { Transporter } from '@algolia/transporter';

export type SearchClient = {
  readonly appId: string;
  readonly transporter: Transporter;
};
