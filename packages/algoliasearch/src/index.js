/* eslint import/namespace: [2, { allowComputed: true }] */
// @flow

import * as indexMethods from './methods/index';
import * as clientMethods from './methods/client';
import * as placesMethods from './methods/places';

import { createRequester } from './request';

import type {
  ClientMethods,
  IndexMethods,
  AppId,
  ApiKey,
  IndexName,
} from './types';

function attachParameters(original, ...extra) {
  const methodNames = Object.keys(original);
  const augmentedMethods = methodNames.reduce(
    (methods, method) => ({
      ...methods,
      [method]: (...args) => original[method](...extra, ...args),
    }),
    {}
  );
  return augmentedMethods;
}

export function initClient({
  appId,
  apiKey,
}: {
  appId: AppId,
  apiKey: ApiKey,
}): ClientMethods {
  if (appId === undefined) {
    throw new Error(`An appId is required. ${appId} was not valid.`);
  }
  if (apiKey === undefined) {
    throw new Error(`An apiKey is required. ${apiKey} was not valid.`);
  }

  const requester = createRequester(appId, apiKey);
  return attachParameters(clientMethods, requester);
}

export function initIndex({
  appId,
  apiKey,
  indexName,
}: {
  appId: AppId,
  apiKey: ApiKey,
  indexName: IndexName,
}): IndexMethods {
  if (appId === undefined) {
    throw new Error(`An appId is required. ${appId} was not valid.`);
  }
  if (apiKey === undefined) {
    throw new Error(`An apiKey is required. ${apiKey} was not valid.`);
  }
  if (indexName === undefined) {
    throw new Error(`An indexName is required. ${indexName} was not valid.`);
  }

  const requester = createRequester(appId, apiKey);
  return {
    ...attachParameters(indexMethods, requester, indexName),
    requester,
  };
}

export function initPlaces(
  params: {
    appId?: AppId,
    apiKey?: ApiKey,
  } = {}
) {
  const { appId = '', apiKey = '' } = params;
  if ((appId === '' && apiKey !== '') || (apiKey === '' && appId !== '')) {
    throw new Error(`apiKey or appId are not required for places. 
You gave either an appId and no apiKey, or an apiKey and no appId`);
  }

  const requester = createRequester(appId, apiKey);
  return attachParameters(placesMethods, requester);
}
