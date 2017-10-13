// @flow
// todo: make jest work with this as a module
import { createMemoryStore } from '../../universal-store';
import type { MemoryStore, Data } from 'universal-store';

import HostGenerator from './HostGenerator';
import TimeoutGenerator from './TimeoutGenerator';

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
  appId: AppId;
  requestOptions: RequestOptions;
  requester: HttpModule;
  cache: boolean;
  store: MemoryStore;

  constructor({
    appId,
    apiKey,
    httpRequester,
    options: { timeouts = {}, extraHosts = {}, cache = false } = {},
    requestOptions = {},
  }: {|
    appId: AppId,
    apiKey: ApiKey,
    httpRequester: HttpModule,
    options?: {|
      timeouts?: Timeouts,
      extraHosts?: Hosts,
      cache?: boolean,
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
    this.hostGenerator = new HostGenerator({ appId, extraHosts });
    this.timeoutGenerator = new TimeoutGenerator({ timeouts });
    this.appId = appId;
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

  request = (
    {
      method,
      path,
      qs,
      body,
      requestOptions,
      requestType: type,
    }: RequestArguments,
    {
      timeoutRetries = 0,
      hostFailed = false,
    }: {
      timeoutRetries: number,
      hostFailed: boolean,
    } = {}
  ): Promise<Result> => {
    try {
      const hostname = this.hostGenerator.getHost({ type, hostFailed });

      const timeout = this.timeoutGenerator.getTimeout({
        retry: timeoutRetries,
        type,
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
        appId: this.appId,
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
        requestType: type,
      })
        .catch(err =>
          this.retryRequest(err, {
            method,
            path,
            qs,
            body,
            requestOptions,
            type,
            timeoutRetries,
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
      const timeoutRetries =
        err.reason === 'timeout'
          ? requestArguments.timeoutRetries + 1
          : requestArguments.timeoutRetries;
      const hostFailed = err.reason !== 'timeout';

      const res = this.request(
        {
          ...requestArguments,
          requestType: requestArguments.type,
        },
        {
          timeoutRetries,
          hostFailed,
        }
      );

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
