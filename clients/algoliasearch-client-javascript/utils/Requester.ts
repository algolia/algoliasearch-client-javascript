import { EndRequest, Response } from './types';
export abstract class Requester {
  abstract send(request: EndRequest): Promise<Response>;
}
