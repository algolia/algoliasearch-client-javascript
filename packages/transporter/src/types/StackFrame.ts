import { Request, Response } from '@algolia/requester-common';

import { createHost } from '../createHost';

export type StackFrame = {
  readonly request: Request;
  readonly response: Response;
  readonly host: ReturnType<typeof createHost>;
  readonly triesLeft: number;
  readonly timeoutRetries: number;
};
