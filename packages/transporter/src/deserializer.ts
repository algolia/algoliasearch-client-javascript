import { Response } from '@algolia/requester-common';

import { createApiError } from '.';

export function deserializeSuccess<TObject>({ content }: Response): TObject {
  return JSON.parse(content);
}

export function deserializeFailure({ content, status }: Response): Error {
  // eslint-disable-next-line functional/no-let
  let message = content;

  // eslint-disable-next-line functional/no-try-statement
  try {
    message = JSON.parse(content).message;
  } catch (e) {
    // ..
  }

  return createApiError(message, status);
}
