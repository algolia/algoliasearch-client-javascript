/* eslint import/namespace: [2, { allowComputed: true }] */
// @flow

import * as clientMethods from '../methods/client';
import attachParameters from './attachParameters';
import { createRequester } from '../request';

import type { ClientMethods, AppId, ApiKey, RequesterOptions } from '../types';

export default function initClient({
  appId,
  apiKey,
  options,
}: {
  appId: AppId,
  apiKey: ApiKey,
  options?: Object, // requesterOptions
}): ClientMethods {
  if (appId === undefined) {
    throw new Error(`An appId is required. ${appId} was not valid.`);
  }
  if (apiKey === undefined) {
    throw new Error(`An apiKey is required. ${apiKey} was not valid.`);
  }

  const requester = createRequester({ appId, apiKey, options });

  return {
    ...attachParameters(clientMethods, { requester }),
    requester,
  };
}
