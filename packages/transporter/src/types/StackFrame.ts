import { Request, Response } from '@algolia/requester-common';

import { Host } from './Host';

export type StackFrame = {
  readonly request: Request;
  readonly response: Response;
  readonly host: Host;
  readonly triesLeft: number;
  readonly timeoutRetries: number;
};
