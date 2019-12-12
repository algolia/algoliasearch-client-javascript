import { Transporter } from '@algolia/transporter';

export type RecommendationClient = {
  readonly appId: string;
  readonly transporter: Transporter;
};
