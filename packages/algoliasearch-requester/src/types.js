// @flow

export type Url = {|
  hostname: string,
  pathname: string,
  protocol?: string,
  port?: string,
|};

export type Response = { body: Buffer, statusCode: number };
export type RequesterArgs = {
  body?: Object,
  method: Method,
  url: Url,
  timeout: number,
  options?: RequestOptions,
};
export type HttpModule = RequesterArgs => Promise<Response>;

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
  // ones that exist already
  userAgent?: string,
  forwardToReplicas?: boolean,
  clearExistingRules?: boolean,
|};

export type RequesterOptions = {
  ...RequestOptions,
  cache?: boolean,
  hosts?: {|
    read?: string[],
    write?: string[],
  |},
};

export type Method = 'POST' | 'GET' | 'DELETE' | 'PUT';
export type RequestArguments = {
  method: Method,
  path: string,
  qs?: Object,
  body?: Object,
  options?: RequestOptions,
  requestType: 'read' | 'write',
  retry?: number,
};
export type Result = Object;
export type RequestMethod = RequestArguments => Promise<Result>;
export type Requester = ({
  appId: string,
  apiKey: string,
  options?: RequesterOptions,
}) => RequestMethod;
