// @flow

import * as indexMethods from '../methods/index';
import { createRequester } from '../request';
import attachParameters from './attachParameters';

import type { IndexMethods, AppId, ApiKey, IndexName } from '../types';

export default function initIndex({
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
    ...attachParameters(indexMethods, { requester, indexName }),
    requester,
  };
}
