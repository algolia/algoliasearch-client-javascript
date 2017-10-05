// @flow

export type Url = {|
  hostname: string,
  pathname: string,
  protocol?: string,
  port?: string,
|};

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
  url: Url,
  timeout: number,
  requestOptions?: RequestOptions,
  requestType: RequestType,
|};
export type HttpModule = RequesterArgs => Promise<Response>;

// public api
export type RequestArguments = {
  method: Method,
  path: string,
  qs?: Object,
  body?: Object,
  requestOptions?: RequestOptions,
  requestType: RequestType,
  retry?: number,
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

// serverError := httpCode / 100 !== 4 && httpCode / 100 !== 2
// clientError := httpCode / 100 === 4
export type ErrorType = 'server' | 'network' | 'dns' | 'timeout' | 'client';
export type RequesterError = {|
  reason: ErrorType,
  more: any,
|};
