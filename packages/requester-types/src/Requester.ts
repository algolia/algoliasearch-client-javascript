import { Response, Request } from '.';

export interface Requester {
  readonly send: (request: Request) => Promise<Response>;
}
