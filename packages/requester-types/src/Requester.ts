import { Response, Request } from '..';

export type Requester = {
  readonly send: (request: Request) => Promise<Response>;
};
