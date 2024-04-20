import { AnalyticsClientOptions } from '@sefai/client-analytics';
import { ClientTransporterOptions } from '@sefai/client-common';
import { PersonalizationClientOptions } from '@sefai/client-personalization';
import { SearchClientOptions } from '@sefai/client-search';

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

export type InitPersonalizationOptions = Partial<ClientTransporterOptions> &
  OptionalCredentials<PersonalizationClientOptions>;

/**
 * @deprecated Use `InitPersonalizationOptions` instead.
 */
export type InitRecommendationOptions = InitPersonalizationOptions;
