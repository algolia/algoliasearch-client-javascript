export type Method = 'GET' | 'PATCH' | 'POST' | 'PUT' | 'DELETE';

export type Request = {
  method: Method;
  path: string;
  data?: Record<string, any>;
};

export type RequestOptions = {
  /**
   * Custom timeout for the request. Note that, in normal situacions
   * the given timeout will be applied. But the transporter layer may
   * increase this timeout if there is need for it.
   */
  timeout?: number;

  /**
   * Custom headers for the request. This headers are
   * going to be merged the transporter headers.
   */
  headers?: Record<string, string>;

  /**
   * Custom query parameters for the request. This query parameters are
   * going to be merged the transporter query parameters.
   */
  queryParameters: Record<string, any>;
  data?: Record<string, any>;
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

export type Headers = Record<string, string>;

export type Host = {
  url: string;
  accept: 'read' | 'write' | 'readWrite';
  protocol: 'http' | 'https';
};

export type StackFrame = {
  request: EndRequest;
  response: Response;
  host: Host;
  triesLeft: number;
};

export type Timeouts = {
  readonly connect: number;
  readonly read: number;
  readonly write: number;
};

export type Outcomes<TResponse> = {
  readonly onFail: (response: Response) => Promise<never>;
  readonly onSuccess: (response: Response) => Promise<TResponse>;
  readonly onRetry: (response: Response) => Promise<TResponse>;
};
