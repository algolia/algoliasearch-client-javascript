/* eslint-disable no-console */
// @flow
import * as indexMethods from './indexMethods';
import * as clientMethods from './clientMethods';
import type { AppId, ApiKey, IndexName } from './types';

type ClientParams = {| appId: AppId, apiKey: ApiKey |};
type IndexParams = {| appId: AppId, apiKey: ApiKey, indexName: IndexName |};

export function initClient({ appId, apiKey }: ClientParams) {
  if (appId === undefined) {
    throw new Error(`An appId is required. ${appId} was not valid.`);
  }
  if (apiKey === undefined) {
    throw new Error(`An apiKey is required. ${apiKey} was not valid.`);
  }

  return clientMethods;
}

export function initIndex({ appId, apiKey, indexName }: IndexParams) {
  if (appId === undefined) {
    throw new Error(`An appId is required. ${appId} was not valid.`);
  }
  if (apiKey === undefined) {
    throw new Error(`An apiKey is required. ${apiKey} was not valid.`);
  }
  if (indexName === undefined) {
    throw new Error(`An indexName is required. ${indexName} was not valid.`);
  }

  return indexMethods;
}
