import { TransporterAware } from '@algolia/transporter';

export type SearchClient = {
  readonly appId: string;
} & TransporterAware;
