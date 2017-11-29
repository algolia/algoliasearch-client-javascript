/* eslint import/namespace: [2, { allowComputed: true }] */
// @flow

import * as clientMethods from '../methods/client';
import attachParameters from './attachParameters';
import { createRequester } from 'algoliasearch-requester';
// todo: use a real requester
import { fakeRequester as httpRequester } from '../testUtils';

import type { ClientMethods, AppId, ApiKey } from 'algoliasearch';
import type { RequesterOptions, RequestMethod } from 'algoliasearch-requester';

export default function initClient({
  appID,
  apiKey,
  options,
  requester: extraRequester,
}: {
  appID: AppId,
  apiKey: ApiKey,
  options?: RequesterOptions,
  requester?: RequestMethod,
}): ClientMethods {
  /* eslint-disable prefer-rest-params */
  if (appID === undefined) {
    throw new Error(`An appID is required. ${appID} was not valid.

initIndex(${[...arguments].map(arg => JSON.stringify(arg)).join(',')})`);
  }
  if (apiKey === undefined) {
    throw new Error(`An apiKey is required. ${apiKey} was not valid.

initIndex(${[...arguments].map(arg => JSON.stringify(arg)).join(',')})`);
  }
  /* eslint-enable prefer-rest-params */

  const requester = extraRequester
    ? extraRequester
    : createRequester({ appID, apiKey, options, httpRequester });

  // $FlowFixMe --> Flow doesn't get that the imports are augmented here
  return {
    ...attachParameters(clientMethods, { requester }),
    requester,
  };
}
