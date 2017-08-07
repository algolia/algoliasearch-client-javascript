/* eslint import/namespace: [2, { allowComputed: true }] */
// @flow

import * as placesMethods from '../methods/places';
import { createRequester } from '../request';
import attachParameters from './attachParameters';

import type { AppId, ApiKey } from '../types';

export default function initPlaces(
  params: {
    appId?: AppId,
    apiKey?: ApiKey,
  } = {}
) {
  const { appId = '', apiKey = '' } = params;
  if ((appId === '' && apiKey !== '') || (apiKey === '' && appId !== '')) {
    throw new Error(`apiKey or appId are not required for places. 
You gave either an appId and no apiKey, or an apiKey and no appId`);
  }

  const requester = createRequester({ appId, apiKey });
  return {
    ...attachParameters(placesMethods, { requester }),
    requester,
  };
}
