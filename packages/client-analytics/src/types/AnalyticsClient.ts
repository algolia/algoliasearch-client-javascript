import { Transporter } from '@algolia/transporter';

export type AnalyticsClient = {
  readonly appId: string;
  readonly transporter: Transporter;
};
