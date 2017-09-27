// @flow

import RequestHosts from './hosts';
import TimeoutGenerator from './timeoutGenerator';

import type { AppId, ApiKey } from 'algoliasearch';
import type {
  RequestOptions,
  RequestArguments,
  Result,
  HttpModule,
  Timeouts,
  Hosts,
} from 'algoliasearch-requester';

const stringify = qs => JSON.stringify(qs); // todo: use proper url stringify

type ErrorType = 'application' | 'network' | 'dns' | 'timeout';
const retryableErrors: Array<ErrorType> = [
  'application',
  'network',
  'dns',
  'timeout',
];

type RequesterError = {|
  reason: ErrorType,
  more: any,
|};

// eslint-disable-next-line no-unused-vars
const RESET_HOST_TIMER = 12000; // ms; 2 minutes
// eslint-disable-next-line no-unused-vars
const RESET_TIMEOUT_TIMER = 120000; // ms; 20 minutes

export class Requester {
  hosts: RequestHosts;
  timeoutGenerator: TimeoutGenerator;
  apiKey: ApiKey;
  appId: AppId;
  requestOptions: RequestOptions;
  requester: HttpModule;

  constructor({
    appId,
    apiKey,
    httpRequester,
    options: { timeouts = {}, extraHosts = {} } = {},
    requestOptions = {},
  }: {|
    appId?: AppId,
    apiKey: ApiKey,
    httpRequester: HttpModule,
    options?: {|
      timeouts?: Timeouts,
      extraHosts?: Hosts,
    |},
    requestOptions?: RequestOptions,
  |}) {
    if (typeof appId !== 'string') {
      throw new Error(
        `appId is required and should be a string, received "${appId || ''}"`
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
    this.hosts = new RequestHosts({ appId, extraHosts });
    this.timeoutGenerator = new TimeoutGenerator({ timeouts });
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
    timeoutRetries = 0,
  }: RequestArguments): Promise<Result> => {
    const hostname = this.hosts.getHost({ type });
    const timeout = this.timeoutGenerator.getTimeout({
      retry: timeoutRetries,
      type,
    });

    const pathname = path + stringify(qs);
    const url = { hostname, pathname };

    return this.requester({
      body,
      method,
      url,
      timeout,
      options,
    }).catch(err =>
      this.retryRequest(err, {
        method,
        path,
        qs,
        body,
        options,
        type,
        timeoutRetries,
      })
    );
  };

  retryRequest = (
    err: RequesterError,
    requestArguments: RequestArguments
  ): Promise<Result> => {
    if (retryableErrors.indexOf(err.reason) > -1) {
      // if no more hosts or timeouts: reject
      // if reason: timeout; increase
      const timeoutRetries =
        err.reason === 'timeout'
          ? requestArguments.timeoutRetries + 1
          : requestArguments.timeoutRetries;

      const res = this.request({
        ...requestArguments,
        requestType: requestArguments.type,
        timeoutRetries,
      });

      return res;
    }

    return Promise.reject(
      new Error({
        reason:
          "Request couldn't be retried, did you enter the correct credentials?",
        more: err,
      })
    );
  };
}

export default function createRequester(args: Args) {
  const _r = new Requester(args);
  const requester = _r.request;
  requester.setOptions = _r.setOptions;
  requester.options = _r.requestOptions;
  return requester;
}
