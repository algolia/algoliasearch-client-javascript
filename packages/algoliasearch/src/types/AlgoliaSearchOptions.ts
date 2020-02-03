import { AnalyticsClientOptions } from '@algolia/client-analytics';
import { ClientTransporterOptions } from '@algolia/client-common';
import { RecommendationClientOptions } from '@algolia/client-recommendation';
import { SearchClientOptions } from '@algolia/client-search';

export type WithoutCredentials<TClient> = Omit<TClient, 'appId' | 'apiKey'>;

export type AlgoliaSearchOptions = Partial<ClientTransporterOptions> &
  WithoutCredentials<SearchClientOptions>;

export type InitAnalyticsOptions = Partial<ClientTransporterOptions> &
  WithoutCredentials<AnalyticsClientOptions>;

export type InitRecommendationOptions = Partial<ClientTransporterOptions> &
  WithoutCredentials<RecommendationClientOptions>;
