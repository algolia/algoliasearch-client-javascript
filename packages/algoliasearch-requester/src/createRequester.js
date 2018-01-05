// @flow
import { createMemoryStore } from 'universal-store';
import { AlgoliaError, AlgoliaRequesterError } from 'algoliasearch-errors';
import {
  initHostAndTimeouts,
  getParams,
  hostDidFail,
  hostDidTimeout,
} from './HostAndTimeoutManager.js';

import type { AppId, ApiKey } from 'algoliasearch';
import type { Store, Data } from 'universal-store';
import type {
  RequestOptions,
  RequesterOptions,
  RequestArguments,
  Result,
  HttpModule,
  ErrorType,
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
  appId: AppId;
  requestOptions: RequestOptions;
  requester: HttpModule;
  cache: boolean;
  store: Store<string, Data>;
  requesterOptions: RequesterOptions;

  constructor({
    appId,
    apiKey,
    httpRequester,
    requestOptions,
    // todo: put timeouts in requestOptions
    requesterOptions: { timeouts = {}, cache = false, hosts } = {},
  }: {|
    appId: AppId,
    apiKey: ApiKey,
    httpRequester: HttpModule,
    requestOptions?: RequestOptions,
    requesterOptions?: RequesterOptions,
  |}) {
    if (typeof appId !== 'string') {
      throw new AlgoliaError(
        `appId is required and should be a string, received "${appId || ''}"`
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
      appId,
    });

    this.appId = appId;
    this.apiKey = apiKey;
    this.requester = httpRequester;
    this.requestOptions = requestOptions;
    this.store = createMemoryStore();
    this.cache = cache;
  }

  setRequestOptions = (
    fn: RequestOptions => RequestOptions
  ): RequestOptions => {
    const oldOptions = this.requestOptions;
    const newOptions = fn(oldOptions);
    this.requestOptions = newOptions;
    return newOptions;
  };

  setRequesterOptions = (
    fn: RequesterOptions => RequesterOptions
  ): RequesterOptions => {
    const oldOptions = this.requesterOptions;
    const newOptions = fn(oldOptions);
    this.requesterOptions = newOptions;
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
    // requesterOptions, // todo: implement
    requestType,
  }: RequestArguments): Promise<Result> => {
    try {
      const { appId, apiKey } = this;
      const { hostname, timeout, connectTimeout } = getParams({
        appId,
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
        appId,
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
        requestOptions, // but remove timeouts and cache here
        appId,
        apiKey,
      })
        .catch(err =>
          this.retryRequest(err, {
            method,
            path,
            qs,
            body,
            requestOptions,
            appId,
            apiKey,
            requestType,
          })
        )
        .then(res => this.saveInCache(cacheKey, res));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  retryRequest = (
    err: AlgoliaRequesterError,
    requestArguments: RequestArguments
  ): Promise<Result> => {
    if (retryableErrors.indexOf(err.reason) > -1) {
      if (err.reason === 'timeout') {
        hostDidTimeout({
          appId: this.appId,
          requestType: requestArguments.requestType,
        });
      } else {
        hostDidFail({
          appId: this.appId,
          requestType: requestArguments.requestType,
        });
      }

      const res = this.request(requestArguments);

      return res;
    }

    return Promise.reject(
      // todo: use AlgoliaError and refactor?
      new AlgoliaRequesterError({
        message: `Request couldn't be retried, did you enter the correct credentials?

see: https://alg.li/client#unretryable-error`,
        reason: 'fatal',
        more: { error: err, arguments: requestArguments },
      })
    );
  };
}

export const createRequester: CreateRequester = function createRequester(args) {
  const _r = new Requester(args);
  const requester = _r.request;
  requester.setRequestOptions = _r.setRequestOptions;
  requester.options = _r.requestOptions;
  return requester;
};
