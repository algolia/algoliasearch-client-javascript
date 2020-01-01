import { Response } from '@algolia/requester-common';

export type DeserializationError = Error & {
  /**
   * The raw response from the server.
   */
  readonly response: Response;
};
