import { SearchOptions } from '.';

export type SecuredApiKeyRestrictions = SearchOptions & {
  /**
   * A Unix timestamp used to define the expiration date of the API key.
   */
  readonly validUntil?: number;

  /**
   * List of index names that can be queried.
   */
  readonly restrictIndices?: readonly string[] | string;

  /**
   * IPv4 network allowed to use the generated key. This is used for more protection against API key leaking and reuse.
   */
  readonly restrictSources?: string;

  /**
   * Specify a user identifier. This is often used with rate limits.
   */
  readonly userToken?: string;
};
