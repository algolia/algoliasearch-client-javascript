// @flow

import * as indexMethods from '../methods/index';
import { createRequester } from '../request';
import attachParameters from './attachParameters';

import type { IndexMethods, AppId, ApiKey, IndexName } from 'types/Algolia';
import type { RequesterOptions, RequestMethod } from 'algoliasearch-requester';

export default function initIndex({
  appId,
  apiKey,
  indexName,
  options,
  requester: extraRequester,
}: {
  appId: AppId,
  apiKey: ApiKey,
  indexName: IndexName,
  options?: RequesterOptions,
  requester?: RequestMethod,
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

  const requester = extraRequester
    ? extraRequester
    : createRequester({ appId, apiKey, options });
  // $FlowFixMe --> Flow doesn't get that the imports are augmented here
  return {
    ...attachParameters(indexMethods, { requester, indexName }),
    requester,
  };
}
