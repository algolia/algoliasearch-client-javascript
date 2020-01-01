import { AnalyticsClientOptions } from '@algolia/client-analytics';
import { RecommendationClientOptions } from '@algolia/client-recommendation';
import { SearchClientOptions } from '@algolia/client-search';
import { TransporterOptions } from '@algolia/transporter';

type Options = SearchClientOptions &
  AnalyticsClientOptions &
  RecommendationClientOptions &
  Partial<TransporterOptions>;

export type AlgoliaSearchOptions = Pick<
  Options,
  Exclude<keyof Options, 'appId'> & Exclude<keyof Options, 'apiKey'>
>;
