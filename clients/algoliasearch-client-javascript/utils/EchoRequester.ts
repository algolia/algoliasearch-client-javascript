import { EndRequest, Response } from './types';
import { Requester } from './Requester';

export class EchoRequester extends Requester {
  async send(request: EndRequest): Promise<Response> {
    return {
      content: JSON.stringify(request),
      isTimedOut: false,
      status: 200,
    };
  }
}
