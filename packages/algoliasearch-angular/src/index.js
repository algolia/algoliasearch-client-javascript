// @flow

import {
  initClient as client,
  initIndex as index,
  initPlaces as places,
} from 'algoliasearch';
import httpRequester from './httpRequester.js';
import type { AppId, ApiKey, IndexName } from 'algoliasearch';
import type { RequesterOptions } from 'algoliasearch-requester';

export function initClient({
  appId,
  apiKey,
  options,
}: {
  appId: AppId,
  apiKey: ApiKey,
  options?: RequesterOptions,
}) {
  return client({
    appId,
    apiKey,
    options,
    httpRequester,
  });
}

export function initIndex({
  appId,
  apiKey,
  indexName,
  options,
}: {
  appId: AppId,
  indexName: IndexName,
  apiKey: ApiKey,
  options?: RequesterOptions,
}) {
  return index({
    appId,
    apiKey,
    indexName,
    options,
    httpRequester,
  });
}

export function initPlaces({
  appId,
  apiKey,
  options,
}: {
  apiKey?: ApiKey,
  appId?: AppId,
  options?: RequesterOptions,
}) {
  return places({
    appId,
    apiKey,
    options,
    httpRequester,
  });
}

export { default } from 'algoliasearch';
