import { Request, Response } from '@algolia/requester-common';

import { StatelessHost } from './StatelessHost';

export type StackFrame = {
  /**
   * The request made.
   */
  readonly request: Request;

  /**
   * The received response.
   */
  readonly response: Response;

  /**
   * The host associated with the `request` and the `response`.
   */
  readonly host: StatelessHost;

  /**
   * The number of tries left.
   */
  readonly triesLeft: number;
};
