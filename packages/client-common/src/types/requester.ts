export type Headers = Record<string, string>;

export type QueryParameters = Record<string, any>;

/**
 * The method of the request.
 */
export type Method = 'DELETE' | 'GET' | 'PATCH' | 'POST' | 'PUT';

export type Request = {
  method: Method;
  /**
   * The path of the REST API to send the request to.
   */
  path: string;
  queryParameters: QueryParameters;
  data?: Array<Record<string, any>> | Record<string, any> | undefined;
  headers: Headers;
  /**
   * If the given request should persist on the cache. Keep in mind,
   * that some methods may have this option enabled by default.
   */
  cacheable?: boolean | undefined;
  /**
   * Some POST methods in the Algolia REST API uses the `read` transporter.
   * This information is defined at the spec level.
   */
  useReadTransporter?: boolean | undefined;
};

export type EndRequest = Pick<Request, 'headers' | 'method'> & {
  /**
   * The full URL of the REST API.
   */
  url: string;
  /**
   * The connection timeout, in milliseconds.
   */
  connectTimeout: number;
  /**
   * The response timeout, in milliseconds.
   */
  responseTimeout: number;
  data?: string | undefined;
};

export type Response = {
  /**
   * The body of the response.
   */
  content: string;
  /**
   * Whether the API call is timed out or not.
   */
  isTimedOut: boolean;
  /**
   * The HTTP status code of the response.
   */
  status: number;
};

export type Requester = {
  /**
   * Sends the given `request` to the server.
   */
  send: (request: EndRequest) => Promise<Response>;
};
