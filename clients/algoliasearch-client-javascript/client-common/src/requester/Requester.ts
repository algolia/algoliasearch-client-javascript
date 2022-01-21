import type { EndRequest, Request, Response } from '../types';

export abstract class Requester {
  abstract send(
    request: EndRequest,
    originalRequest: Request
  ): Promise<Response>;
}
