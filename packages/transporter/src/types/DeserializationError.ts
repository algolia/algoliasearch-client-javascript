import { Response } from '@algolia/requester-common';

export type DeserializationError = Error & {
  readonly response: Response;
};
