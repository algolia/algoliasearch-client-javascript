/* eslint-disable no-console */
/* eslint import/namespace: [2, { allowComputed: true }] */
// @flow

import * as indexMethods from './methods/index';
import * as clientMethods from './methods/client';
import * as placesMethods from './methods/places';

import { createRequester } from './request';

import type {
  ClientParams,
  ClientMethods,
  IndexParams,
  IndexMethods,
  PlacesParams,
} from './types';

function curryObject(original, ...extra) {
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

export function initClient({ appId, apiKey }: ClientParams): ClientMethods {
  if (appId === undefined) {
    throw new Error(`An appId is required. ${appId} was not valid.`);
  }
  if (apiKey === undefined) {
    throw new Error(`An apiKey is required. ${apiKey} was not valid.`);
  }

  const requester = createRequester(appId, apiKey);
  return curryObject(clientMethods, requester);
}

export function initIndex({
  appId,
  apiKey,
  indexName,
}: IndexParams): IndexMethods {
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
  return curryObject(indexMethods, requester, indexName);
}

export function initPlaces(params: PlacesParams = {}) {
  const { appId = '', apiKey = '' } = params;
  if ((appId === '' && apiKey !== '') || (apiKey === '' && appId !== '')) {
    throw new Error(`apiKey or appId are not required for places. 
You gave either an appId and no apiKey, or an apiKey and no appId`);
  }

  const requester = createRequester(appId, apiKey);
  return curryObject(placesMethods, requester);
}
