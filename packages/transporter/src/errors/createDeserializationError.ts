import { Response } from '@algolia/requester-common';

export function createDeserializationError(
  message: string,
  response: Response
): Error & { readonly response: Response } {
  return {
    name: 'DeserializationError',
    message,
    response,
  };
}
