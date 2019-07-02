import { Response, Request } from '.';

export interface Requester {
  send(request: Request): Promise<Response>;
}
