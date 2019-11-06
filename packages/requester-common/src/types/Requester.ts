import { Request, Response } from '.';

export type Requester = {
  readonly send: (request: Request) => Readonly<Promise<Response>>;
};
