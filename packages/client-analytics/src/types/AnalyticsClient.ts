import { TransporterAware } from '@algolia/transporter/types/TransporterAware';

export type AnalyticsClient = {
  readonly appId: string;
} & TransporterAware;
