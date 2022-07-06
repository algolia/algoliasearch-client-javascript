import type { Host, Requester } from '@algolia/client-common';
import {
  ErrorBase,
  PutProps,
  PostProps,
  DelProps,
  GetProps,
} from '@algolia/client-search/model';

export * from '@algolia/client-search/model';
export * from '@algolia/client-personalization/model';
export * from '@algolia/client-analytics/model';
export * from '@algolia/client-abtesting/model';

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
