import { TransporterAware } from '@algolia/transporter/types/TransporterAware';

export type SearchIndex = {
  readonly indexName: string;
} & TransporterAware;
