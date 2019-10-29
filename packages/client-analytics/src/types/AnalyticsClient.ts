import { TransporterAware } from '@algolia/transporter/src/types/TransporterAware';

export type AnalyticsClient = {
  readonly appId: string;
} & TransporterAware;
