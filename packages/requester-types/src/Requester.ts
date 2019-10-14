import { Request, Response } from '..';

export type Requester = {
  readonly send: (request: Request) => Promise<Response>;
};
