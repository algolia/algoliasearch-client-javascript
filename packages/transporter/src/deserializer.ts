import { Response } from '@algolia/requester-common';

import { createApiError, createDeserializationError, StackFrame } from '.';

export function deserializeSuccess<TObject>(response: Response): TObject {
  // eslint-disable-next-line functional/no-try-statement
  try {
    return JSON.parse(response.content);
  } catch (e) {
    throw createDeserializationError(e.message, response);
  }
}

export function deserializeFailure(
  { content, status }: Response,
  stackFrame: readonly StackFrame[]
): Error {
  // eslint-disable-next-line functional/no-let
  let message = content;

  // eslint-disable-next-line functional/no-try-statement
  try {
    message = JSON.parse(content).message;
  } catch (e) {
    // ..
  }

  return createApiError(message, status, stackFrame);
}
