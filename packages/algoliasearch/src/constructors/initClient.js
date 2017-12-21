/* eslint import/namespace: [2, { allowComputed: true }] */
// @flow

import * as clientMethods from '../methods/client/index.js';
import attachParameters from './attachParameters.js';
import { createRequester } from 'algoliasearch-requester';
import universalRequester from 'algoliasearch-http-requester';

import type { ClientMethods, AppId, ApiKey } from 'algoliasearch';
import type {
  RequesterOptions,
  RequestMethod,
  HttpModule,
} from 'algoliasearch-requester';

export default function initClient({
  appId,
  apiKey,
  options,
  requester: extraRequester,
  httpRequester: extraHttpRequester,
}: {
  appId: AppId,
  apiKey: ApiKey,
  options?: RequesterOptions,
  requester?: RequestMethod,
  httpRequester?: HttpModule,
}): ClientMethods {
  /* eslint-disable prefer-rest-params */
  if (appId === undefined) {
    throw new Error(`An appId is required. ${appId} was not valid.

initIndex(${[...arguments].map(arg => JSON.stringify(arg)).join(',')})`);
  }
  if (apiKey === undefined) {
    throw new Error(`An apiKey is required. ${apiKey} was not valid.

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
    ...attachParameters(clientMethods, { requester }),
    requester,
    httpRequester,
  };
}
