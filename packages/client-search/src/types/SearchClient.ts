import { Transporter } from '@algolia/transporter';

export type SearchClient = {
  readonly appId: string;
  readonly transporter: Transporter;
  readonly addAlgoliaAgent: (segment: string, version?: string) => void;
};
