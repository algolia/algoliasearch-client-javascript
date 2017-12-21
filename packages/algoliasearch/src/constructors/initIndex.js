// @flow

import * as indexMethods from '../methods/index/index.js';
import { createRequester } from 'algoliasearch-requester';
import attachParameters from './attachParameters.js';
import universalRequester from 'algoliasearch-http-requester';

import type { IndexMethods, AppId, ApiKey, IndexName } from 'algoliasearch';
import type {
  RequesterOptions,
  RequestMethod,
  HttpModule,
} from 'algoliasearch-requester';

export default function initIndex({
  appId,
  apiKey,
  indexName,
  options,
  requester: extraRequester,
  httpRequester: extraHttpRequester,
}: {
  appId: AppId,
  apiKey: ApiKey,
  indexName: IndexName,
  options?: RequesterOptions,
  requester?: RequestMethod,
  httpRequester?: HttpModule,
}): IndexMethods {
  /* eslint-disable prefer-rest-params */
  if (appId === undefined) {
    throw new Error(`An appId is required. ${appId} was not valid.
    
    initIndex(${[...arguments].map(arg => JSON.stringify(arg)).join(',')})`);
  }
  if (apiKey === undefined) {
    throw new Error(`An apiKey is required. ${apiKey} was not valid.

initIndex(${[...arguments].map(arg => JSON.stringify(arg)).join(',')})`);
  }
  if (indexName === undefined) {
    throw new Error(`An indexName is required. ${indexName} was not valid.

initIndex(${[...arguments].map(arg => JSON.stringify(arg)).join(',')})`);
  }
  /* eslint-enable prefer-rest-params */

  const httpRequester =
    typeof extraHttpRequester === 'function'
      ? extraHttpRequester
      : universalRequester;

  const requester = extraRequester
    ? extraRequester
    : createRequester({ appId, apiKey, options, httpRequester });
  // $FlowFixMe --> Flow doesn't get that the imports are augmented here
  return {
    ...attachParameters(indexMethods, { requester, indexName }),
    requester,
    httpRequester,
  };
}
