export type Method = 'DELETE' | 'GET' | 'PATCH' | 'POST' | 'PUT';

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

export type EchoResponse = Request & {
  connectTimeout: number;
  host: string;
  headers: Record<string, string>;
  responseTimeout: number;
  searchParams?: Record<string, string>;
  userAgent?: string;
};

export type Headers = Record<string, string>;
export type QueryParameters = Record<string, string>;

export type Host = {
  url: string;
  accept: 'read' | 'readWrite' | 'write';
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

export type UserAgentOptions = {
  /**
   * The segment. Usually the integration name.
   */
  readonly segment: string;

  /**
   * The version. Usually the integration version.
   */
  readonly version?: string;
};

export type UserAgent = {
  /**
   * The raw value of the user agent.
   */
  value: string;

  /**
   * Mutates the current user agent ading the given user agent options.
   */
  readonly add: (options: UserAgentOptions) => UserAgent;
};

export type AuthMode = 'WithinHeaders' | 'WithinQueryParameters';

export type CreateClientOptions = {
  appId: string;
  apiKey: string;
  requester: any;
  timeouts: Timeouts;
  userAgents: UserAgentOptions[];
  hosts?: Host[];
  authMode?: AuthMode;
};
