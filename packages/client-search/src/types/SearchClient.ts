import { TransporterAware } from '@algolia/transporter/types/TransporterAware';

export type SearchClient = {
  readonly appId: string;
} & TransporterAware;
