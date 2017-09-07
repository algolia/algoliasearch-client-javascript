// @flow

import RequestHosts from './hosts';

import type {
  AppId,
  ApiKey,
  RequestOptions,
  RequestArguments,
} from '../algoliasearch/src/types';
import type { HttpModule, Timeouts, Hosts } from './types';

type Args = {|
  appId: AppId,
  apiKey: ApiKey,
  httpRequester: HttpModule,
  options?: {|
    timeouts?: Timeouts,
    extraHosts?: Hosts,
  |},
  requestOptions?: RequestOptions,
|};

const stringify = qs => JSON.stringify(qs); // todo: use proper url stringify

type ErrorTypes = 'application' | 'network' | 'dns' | 'timeout';
const retryableErrors: Array<ErrorTypes> = [
  'application',
  'network',
  'dns',
  'timeout',
];

export class Requester {
  hosts: RequestHosts;
  apiKey: ApiKey;
  appId: AppId;
  requestOptions: RequestOptions;
  requester: HttpModule;

  constructor({
    appId,
    apiKey,
    httpRequester,
    options = {},
    requestOptions = {},
  }: Args) {
    if (typeof appId !== 'string') {
      throw new Error(
        `appId is required and should be a string, received ${appId}`
      );
    }
    if (typeof apiKey !== 'string') {
      throw new Error(
        `apiKey is required and should be a string, received ${apiKey}`
      );
    }
    if (typeof httpRequester !== 'function') {
      throw new Error(
        `httpRequester is required and should be a function, received ${httpRequester}`
      );
    }
    this.hosts = new RequestHosts({ appId, ...options });
    this.appId = appId;
    this.apiKey = apiKey;
    this.requester = httpRequester;
    this.requestOptions = requestOptions;
  }

  setOptions = (fn: RequestOptions => RequestOptions): RequestOptions => {
    const oldOptions = this.requestOptions;
    const newOptions = fn(oldOptions);
    this.requestOptions = newOptions;
    return newOptions;
  };

  request = ({
    method,
    path,
    qs,
    body,
    options,
    requestType: type,
    retry = 0,
  }: RequestArguments) => {
    const hostname = this.hosts.getHost({ type });
    const timeout = this.hosts.getTimeout({ retry, type });

    const pathname = path + stringify(qs);
    const url = { hostname, pathname };

    return new Promise((resolve, reject) => {
      this.requester({
        body,
        method,
        url,
        timeout,
        options,
      })
        .then(resolve)
        .catch(err => {
          if (retryableErrors.indexOf(err.message.reason) > -1) {
            resolve(
              this.request({
                method,
                path,
                qs,
                body,
                options,
                requestType: type,
                retry: retry + 1,
              })
            );
          }
          reject(err);
        });
    });
  };
}

// todo: not use this and just use the class
export default function createRequester(args: Args) {
  const _r = new Requester(args);
  const requester = _r.request;
  requester.setOptions = _r.setOptions;
  requester.options = _r.requestOptions;
  return requester;
}
