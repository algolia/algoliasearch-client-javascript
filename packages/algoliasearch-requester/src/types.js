// @flow

export type Method = 'POST' | 'GET' | 'DELETE' | 'PUT';

export type Hosts = {|
  read: string[],
  write: string[],
|};

export type Timeouts = {
  connect: number,
  read: number,
  write: number,
};

export type Headers = { [key: string]: string };

export type RequestOptions = {|
  forwardedFor?: string,
  extraHeaders?: Headers,
  extraUrlParameters?: { [key: string]: any },
  timeouts?: {|
    connect?: number,
    read?: number,
    write?: number,
  |},
  cache?: boolean,
  // ones that exist already
  userAgent?: string,
  forwardToReplicas?: boolean,
  clearExistingRules?: boolean,
  clearExistingSynonyms?: boolean,
  // new headers
  forwardedFor?: string,
  userAgent?: string,
  userId?: string,
|};

export type RequestType = 'read' | 'write';

// http requester
export type Response = { body: Buffer, statusCode: number };
export type RequesterArgs = {|
  body?: Object,
  method: Method,
  url: URL,
  timeout: number,
  connectTimeout: number,
  requestOptions?: RequestOptions,
  requestType: RequestType,
|};
export type HttpModule = RequesterArgs => Promise<Response>;

type AbortSignal = {
  aborted: boolean,
  onabort: EventListener,
  addEventListener: (string, EventListener) => void,
};

// public api
export type RequestArguments = {
  method: Method,
  path: string,
  qs?: Object,
  body?: Object,
  requestOptions?: RequestOptions,
  requestType: RequestType,
  signal: AbortSignal,
};

export type Result = Object;

export type RequestMethod = RequestArguments => Promise<Result>;

export type RequesterOptions = {
  ...RequestOptions,
  cache?: boolean,
  hosts?: {|
    read?: string[],
    write?: string[],
  |},
};

export type CreateRequesterArgs = {|
  appId: string,
  apiKey: string,
  options?: RequesterOptions,
|};
export type CreateRequester = CreateRequesterArgs => RequestMethod;

// clientError := httpCode / 100 === 4
type FatalError = 'client' | 'fatal';
// serverError := httpCode / 100 !== 4 && httpCode / 100 !== 2
type RetryableError = 'server' | 'network' | 'timeout';
export type ErrorType = FatalError | RetryableError;
