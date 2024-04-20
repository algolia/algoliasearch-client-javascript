import { Response } from '@sefai/requester-common';

export type DeserializationError = Error & {
  /**
   * The raw response from the server.
   */
  readonly response: Response;
};
