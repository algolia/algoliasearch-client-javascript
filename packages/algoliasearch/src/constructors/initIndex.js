// @flow

import * as indexMethods from '../methods/index';
import { createRequester } from 'algoliasearch-requester';
import attachParameters from './attachParameters';
// todo: use a real requester
import { fakeRequester as httpRequester } from '../testUtils';

import type { IndexMethods, AppId, ApiKey, IndexName } from 'algoliasearch';
import type { RequesterOptions, RequestMethod } from 'algoliasearch-requester';

export default function initIndex({
  appID,
  apiKey,
  indexName,
  options,
  requester: extraRequester,
}: {
  appID: AppId,
  apiKey: ApiKey,
  indexName: IndexName,
  options?: RequesterOptions,
  requester?: RequestMethod,
}): IndexMethods {
  /* eslint-disable prefer-rest-params */
  if (appID === undefined) {
    throw new Error(`An appID is required. ${appID} was not valid.
    
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

  const requester = extraRequester
    ? extraRequester
    : createRequester({ appID, apiKey, options, httpRequester });
  // $FlowFixMe --> Flow doesn't get that the imports are augmented here
  return {
    ...attachParameters(indexMethods, { requester, indexName }),
    requester,
  };
}
