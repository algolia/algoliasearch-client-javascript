import { TransporterAware } from '@algolia/transporter';

export type SearchIndex = {
  readonly indexName: string;
} & TransporterAware;
