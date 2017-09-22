/* eslint import/namespace: [2, { allowComputed: true }] */
// @flow

import * as clientMethods from '../methods/client';
import attachParameters from './attachParameters';
import { createRequester } from '../request';

import type { ClientMethods, AppId, ApiKey } from 'algoliasearch/types';
import type { RequesterOptions, RequestMethod } from 'algoliasearch-requester';

export default function initClient({
  appId,
  apiKey,
  options,
  requester: extraRequester,
}: {
  appId: AppId,
  apiKey: ApiKey,
  options?: RequesterOptions,
  requester?: RequestMethod,
}): ClientMethods {
  if (appId === undefined) {
    throw new Error(`An appId is required. ${appId} was not valid.`);
  }
  if (apiKey === undefined) {
    throw new Error(`An apiKey is required. ${apiKey} was not valid.`);
  }

  const requester = extraRequester
    ? extraRequester
    : createRequester({ appId, apiKey, options });

  // $FlowFixMe --> Flow doesn't get that the imports are augmented here
  return {
    ...attachParameters(clientMethods, { requester }),
    requester,
  };
}
