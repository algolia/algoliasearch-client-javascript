import { AnalyticsClientOptions } from '@algolia/client-analytics';
import { ClientTransporterOptions } from '@algolia/client-common';
import { RecommendationClientOptions } from '@algolia/client-recommendation';
import { SearchClientOptions } from '@algolia/client-search';

export type WithoutCredentials<TClient> = Pick<
  TClient,
  Exclude<keyof TClient, 'appId'> & Exclude<keyof TClient, 'apiKey'>
>;

export type AlgoliaSearchOptions = Partial<ClientTransporterOptions> &
  WithoutCredentials<SearchClientOptions>;

export type InitAnalyticsOptions = Partial<ClientTransporterOptions> &
  WithoutCredentials<AnalyticsClientOptions>;

export type InitRecommendationOptions = Partial<ClientTransporterOptions> &
  WithoutCredentials<RecommendationClientOptions>;
