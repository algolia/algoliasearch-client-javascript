import { Request, Response } from '@algolia/requester-common';

import { StatelessHost } from './StatelessHost';

export type StackFrame = {
  readonly request: Request;
  readonly response: Response;
  readonly host: StatelessHost;
  readonly triesLeft: number;
};
