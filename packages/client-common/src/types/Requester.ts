import type { Headers, QueryParameters } from './Transporter';

export type Method = 'DELETE' | 'GET' | 'PATCH' | 'POST' | 'PUT';

export type Request = {
  method: Method;
  path: string;
  queryParameters: QueryParameters;
  data?: Array<Record<string, any>> | Record<string, any>;
  headers: Headers;
  cacheable?: boolean;
  /**
   * Some POST methods in the Algolia REST API uses the `read` transporter.
   * This information is defined at the spec level.
   */
  useReadTransporter?: boolean;
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
  algoliaAgent?: string;
};
