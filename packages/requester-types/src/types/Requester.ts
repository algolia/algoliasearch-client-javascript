import { Request } from './Request';
import { Response } from './Response';

export type Requester = {
  readonly send: (request: Request) => Readonly<Promise<Response>>;
};
