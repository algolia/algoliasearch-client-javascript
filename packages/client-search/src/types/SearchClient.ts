import { TransporterAware } from '@algolia/transporter/src/types/TransporterAware';

export type SearchClient = {
  readonly appId: string;
} & TransporterAware;
