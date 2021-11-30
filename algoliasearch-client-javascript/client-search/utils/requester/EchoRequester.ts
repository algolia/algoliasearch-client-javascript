import { EndRequest, Request, Response } from '../types';
import { Requester } from './Requester';

export class EchoRequester extends Requester {
  constructor(private status = 200) {
    super();
  }

  async send(request: EndRequest, originalRequest: Request): Promise<Response> {
    return {
      content: JSON.stringify(originalRequest),
      isTimedOut: false,
      status: this.status,
    };
  }
}
