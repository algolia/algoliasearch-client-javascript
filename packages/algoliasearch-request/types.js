// @flow

import type { Method } from '../algoliasearch/src/types';

export type Response = { body: Buffer, statusCode: number };
export type RequesterArgs = {
  body?: Object,
  headers?: Object,
  method: Method,
  url: URL,
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
