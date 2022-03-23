import type { Cache } from './Cache';
import type { Host } from './Host';
import type { Request, Requester, EndRequest, Response } from './Requester';

export type Headers = Record<string, string>;

export type QueryParameters = Record<string, string>;

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
  headers?: Headers;

  /**
   * Custom query parameters for the request. This query parameters are
   * going to be merged the transporter query parameters.
   */
  queryParameters: QueryParameters;
  data?: Record<string, any>;
};

export type StackFrame = {
  request: EndRequest;
  response: Response;
  host: Host;
  triesLeft: number;
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

export type Timeouts = {
  connect: number;
  read: number;
  write: number;
};

export type TransporterOptions = {
  /**
   * The cache of the hosts. Usually used to persist
   * the state of the host when its down.
   */
  hostsCache: Cache;

  /**
   * The underlying requester used. Should differ
   * depending of the enviroment where the client
   * will be used.
   */
  requester: Requester;

  /**
   * The cache of the requests. When requests are
   * `cacheable`, the returned promised persists
   * in this cache to shared in similar resquests
   * before being resolved.
   */
  requestsCache: Cache;

  /**
   * The cache of the responses. When requests are
   * `cacheable`, the returned responses persists
   * in this cache to shared in similar resquests.
   */
  responsesCache: Cache;

  /**
   * The timeouts used by the requester. The transporter
   * layer may increase this timeouts as defined on the
   * retry strategy.
   */
  timeouts: Timeouts;

  /**
   * The hosts used by the requester.
   */
  hosts: Host[];

  /**
   * The headers used by the requester. The transporter
   * layer may add some extra headers during the request
   * for the user agent, and others.
   */
  baseHeaders: Headers;

  /**
   * The query parameters used by the requester. The transporter
   * layer may add some extra headers during the request
   * for the user agent, and others.
   */
  baseQueryParameters: QueryParameters;

  /**
   * The user agent used. Sent on query parameters.
   */
  userAgent: UserAgent;
};

export type Transporter = {
  /**
   * The cache of the hosts. Usually used to persist
   * the state of the host when its down.
   */
  hostsCache: Cache;

  /**
   * The underlying requester used. Should differ
   * depending of the enviroment where the client
   * will be used.
   */
  requester: Requester;

  /**
   * The timeouts used by the requester. The transporter
   * layer may increase this timeouts as defined on the
   * retry strategy.
   */
  timeouts: Timeouts;

  /**
   * The user agent used. Sent on query parameters.
   */
  userAgent: UserAgent;

  /**
   * The headers used on each request.
   */
  baseHeaders: Headers;

  /**
   * The query parameters used on each request.
   */
  baseQueryParameters: QueryParameters;

  /**
   * The hosts used by the retry strategy.
   */
  hosts: Host[];

  /**
   * Performs a read request using read hosts.
   */
  request: <TResponse>(
    request: Request,
    requestOptions: RequestOptions
  ) => Promise<TResponse>;
};
