// @flow

import type { AppId, ApiKey } from './';

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
  retry: number,
};
export type Result = Object;
export type RequestMethod = RequestArguments => Promise<Result>;
export type Requester = ({
  appId: AppId,
  apiKey: ApiKey,
  options?: RequesterOptions,
}) => RequestMethod;
