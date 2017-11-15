// @flow
// todo: make jest work with this as a module
import { createMemoryStore } from '../../universal-store';
import type { MemoryStore, Data } from 'universal-store';

import HostGenerator from './HostGenerator';
import TimeoutGenerator from './TimeoutGenerator';
import {
  initHostAndTimeouts,
  getParams,
  hostDidFail,
  hostDidTimeout,
} from './HostAndTimeoutManager';

import type { AppId, ApiKey } from 'algoliasearch';
import type {
  RequestOptions,
  RequestArguments,
  Result,
  HttpModule,
  Timeouts,
  Hosts,
  ErrorType,
  RequesterError,
  CreateRequester,
} from 'algoliasearch-requester';

const stringify = qs => JSON.stringify(qs); // todo: use proper url stringify

const toCacheKey = obj => JSON.stringify(obj); // todo: find if something is faster

const retryableErrors: Array<ErrorType> = [
  'server',
  'network',
  'dns',
  'timeout',
];

// eslint-disable-next-line no-unused-vars
const RESET_HOST_TIMER = 120000; // ms; 2 minutes
// eslint-disable-next-line no-unused-vars
const RESET_TIMEOUT_TIMER = 1200000; // ms; 20 minutes

export class Requester {
  hostGenerator: HostGenerator;
  timeoutGenerator: TimeoutGenerator;
  apiKey: ApiKey;
  appID: AppId;
  requestOptions: RequestOptions;
  requester: HttpModule;
  cache: boolean;
  store: MemoryStore;

  constructor({
    appID,
    apiKey,
    httpRequester,
    options: { timeouts = {}, extraHosts = {}, cache = false } = {},
    requestOptions = {},
  }: {|
    appID: AppId,
    apiKey: ApiKey,
    httpRequester: HttpModule,
    options?: {|
      timeouts?: Timeouts,
      extraHosts?: Hosts,
      cache?: boolean,
    |},
    requestOptions?: RequestOptions,
  |}) {
    if (typeof appID !== 'string') {
      throw new Error(
        `appID is required and should be a string, received "${appID || ''}"`
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
    this.hostGenerator = new HostGenerator({ appID, extraHosts });
    this.timeoutGenerator = new TimeoutGenerator({ timeouts });

    initHostAndTimeouts({
      // todo: hosts instead of extra hosts
      timeouts,
      appID,
    });

    this.appID = appID;
    this.apiKey = apiKey;
    this.requester = httpRequester;
    this.requestOptions = requestOptions;
    this.store = createMemoryStore();
    this.cache = cache;
  }

  setOptions = (fn: RequestOptions => RequestOptions): RequestOptions => {
    const oldOptions = this.requestOptions;
    const newOptions = fn(oldOptions);
    this.requestOptions = newOptions;
    return newOptions;
  };

  saveInCache(key: string, data: Data): Data {
    if (this.cache) {
      return this.store.set(key, data);
    }
    return data;
  }

  getFromCache(key: string): ?Object {
    if (this.cache) {
      return this.store.get(key);
    }
    return undefined;
  }

  request = ({
    method,
    path,
    qs,
    body,
    requestOptions,
    requestType,
  }: RequestArguments): Promise<Result> => {
    try {
      const { hostname, timeout, connectTimeout } = getParams({
        appID: this.appID,
        requestType,
      });

      const pathname = path + stringify(qs);
      const url = { hostname, pathname };

      const cacheKey = toCacheKey({
        method,
        url,
        path,
        qs,
        body,
        requestOptions,
        appId: this.appID,
      });

      if (requestOptions && requestOptions.cache === true) {
        // check in cache
        const cachedResult = this.getFromCache(cacheKey);
        if (cachedResult !== undefined) {
          return Promise.resolve(cachedResult);
        }
      }

      return this.requester({
        body,
        method,
        url,
        timeout,
        requestOptions,
      })
        .catch(err =>
          this.retryRequest(err, {
            method,
            path,
            qs,
            body,
            requestOptions,
            requestType,
          })
        )
        .then(res => this.saveInCache(cacheKey, res));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  retryRequest = (
    err: RequesterError,
    requestArguments: RequestArguments
  ): Promise<Result> => {
    if (retryableErrors.indexOf(err.reason) > -1) {
      if (err.reason === 'timeout') {
        hostDidTimeout({
          appID: this.appID,
        });
      }
      hostDidFail({
        appID: this.appID,
        requestType: requestArguments.requestType,
      });

      const res = this.request(requestArguments);

      return res;
    }

    return Promise.reject(
      new Error(`Request couldn't be retried, did you enter the correct credentials?

see: https://alg.li/client#unretryable-error

${JSON.stringify(err)}`)
    );
  };
}

const createRequester: CreateRequester = function createRequester(args) {
  const _r = new Requester(args);
  const requester = _r.request;
  requester.setOptions = _r.setOptions;
  requester.options = _r.requestOptions;
  return requester;
};

export default createRequester;
