// @flow
import { createMemoryStore } from 'algoliasearch-universal-store';
import { AlgoliaError } from 'algoliasearch-errors';
import {
  initHostAndTimeouts,
  getParams,
  hostDidFail,
  hostDidTimeout,
} from './HostAndTimeoutManager.js';

import type { AppId, ApiKey } from 'algoliasearch';
import type { Store, Data } from 'algoliasearch-universal-store';
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

const retryableErrors: Array<ErrorType> = ['server', 'network', 'timeout'];

// eslint-disable-next-line no-unused-vars
const RESET_HOST_TIMER = 120000; // ms; 2 minutes
// eslint-disable-next-line no-unused-vars
const RESET_TIMEOUT_TIMER = 1200000; // ms; 20 minutes

export class Requester {
  apiKey: ApiKey;
  appID: AppId;
  requestOptions: RequestOptions;
  requester: HttpModule;
  cache: boolean;
  store: Store<string, Data>;

  constructor({
    appID,
    apiKey,
    httpRequester,
    options: { timeouts = {}, hosts, cache = false } = {},
    requestOptions = {},
  }: {|
    appID: AppId,
    apiKey: ApiKey,
    httpRequester: HttpModule,
    options?: {|
      timeouts?: Timeouts,
      hosts?: Hosts,
      cache?: boolean,
    |},
    requestOptions?: RequestOptions,
  |}) {
    if (typeof appID !== 'string') {
      throw new AlgoliaError(
        `appID is required and should be a string, received "${appID || ''}"`
      );
    }
    if (typeof apiKey !== 'string') {
      throw new AlgoliaError(
        `apiKey is required and should be a string, received ${apiKey}`
      );
    }
    if (typeof httpRequester !== 'function') {
      throw new AlgoliaError(
        `httpRequester is required and should be a function, received ${httpRequester}`
      );
    }

    initHostAndTimeouts({
      hosts,
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

  getFromCache(key: string): ?Data {
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
      // todo: change to real URL
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
        connectTimeout,
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
          requestType: requestArguments.requestType,
        });
      } else {
        hostDidFail({
          appID: this.appID,
          requestType: requestArguments.requestType,
        });
      }

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

export const createRequester: CreateRequester = function createRequester(args) {
  const _r = new Requester(args);
  const requester = _r.request;
  requester.setOptions = _r.setOptions;
  requester.options = _r.requestOptions;
  return requester;
};
