import type {
  Host,
  Requester,
} from '@experimental-api-clients-automation/client-common';
import {
  ErrorBase,
  PutProps,
  PostProps,
  DelProps,
  GetProps,
} from '@experimental-api-clients-automation/client-search/model';

export * from '@experimental-api-clients-automation/client-search/model';
export * from '@experimental-api-clients-automation/client-personalization/model';
export * from '@experimental-api-clients-automation/client-analytics/model';
export * from '@experimental-api-clients-automation/client-abtesting/model';

export { ErrorBase, PutProps, PostProps, DelProps, GetProps };

export type CommonClientOptions = { requester?: Requester; hosts?: Host[] };

export type CommonInitOptions = Partial<{
  /**
   * App to target with the initialized client, defaults to the `algoliasearch` appId.
   */
  appId: string;
  /**
   * API key of the targeted app ID, defaults to the `algoliasearch` apiKey.
   */
  apiKey: string;
  options: CommonClientOptions;
}>;

export type InitRegion<TRegion> = Partial<{
  /**
   * Available regions of the initialized client.
   */
  region: TRegion;
}>;
