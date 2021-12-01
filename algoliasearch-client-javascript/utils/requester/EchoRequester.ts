import type { EndRequest, Request, Response } from '../types';

import { Requester } from './Requester';

export class EchoRequester extends Requester {
  constructor(private status = 200) {
    super();
  }

  send(_request: EndRequest, originalRequest: Request): Promise<Response> {
    return Promise.resolve({
      content: JSON.stringify(originalRequest),
      isTimedOut: false,
      status: this.status,
    });
  }
}
