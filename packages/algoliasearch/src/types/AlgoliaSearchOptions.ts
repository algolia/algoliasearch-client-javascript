import { AnalyticsClientOptions } from '@algolia/client-analytics';
import { ClientTransporterOptions } from '@algolia/client-common';
import { RecommendationClientOptions } from '@algolia/client-recommendation';
import { SearchClientOptions } from '@algolia/client-search';

type Credentials = { readonly appId: string; readonly apiKey: string };
export type WithoutCredentials<TClientOptions extends Credentials> = Omit<
  TClientOptions,
  keyof Credentials
>;
export type OptionalCredentials<TClientOptions extends Credentials> = Omit<
  TClientOptions,
  keyof Credentials
> &
  Pick<Partial<TClientOptions>, keyof Credentials>;

export type AlgoliaSearchOptions = Partial<ClientTransporterOptions> &
  WithoutCredentials<SearchClientOptions>;

export type InitAnalyticsOptions = Partial<ClientTransporterOptions> &
  OptionalCredentials<AnalyticsClientOptions>;

export type InitRecommendationOptions = Partial<ClientTransporterOptions> &
  OptionalCredentials<RecommendationClientOptions>;
