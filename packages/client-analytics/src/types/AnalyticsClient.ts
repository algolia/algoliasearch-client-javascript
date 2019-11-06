import { TransporterAware } from '@algolia/transporter';

export type AnalyticsClient = {
  readonly appId: string;
} & TransporterAware;
