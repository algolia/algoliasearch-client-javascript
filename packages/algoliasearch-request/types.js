// @flow

import type { Method, RequestOptions } from '../algoliasearch/src/types';

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
