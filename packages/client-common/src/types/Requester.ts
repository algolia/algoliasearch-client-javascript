import type { Headers } from './Transporter';

export type Method = 'DELETE' | 'GET' | 'PATCH' | 'POST' | 'PUT';

export type Request = {
  method: Method;
  path: string;
  data?: Record<string, any>;
  cacheable?: boolean;
};

export type EndRequest = {
  method: Method;
  url: string;
  connectTimeout: number;
  responseTimeout: number;
  headers: Headers;
  data?: string;
};

export type Response = {
  content: string;
  isTimedOut: boolean;
  status: number;
};

export type Requester = {
  /**
   * Sends the given `request` to the server.
   */
  send: (request: EndRequest, originalRequest: Request) => Promise<Response>;
};

export type EchoResponse = Request & {
  connectTimeout: number;
  host: string;
  headers: Headers;
  responseTimeout: number;
  searchParams?: Record<string, string>;
  userAgent?: string;
};
