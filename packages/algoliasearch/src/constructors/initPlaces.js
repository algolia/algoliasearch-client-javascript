/* eslint import/namespace: [2, { allowComputed: true }] */
// @flow

import * as placesMethods from '../methods/places';
import { createRequester } from '../request';
import attachParameters from './attachParameters';

import type { RequestMethod, ApiKey } from '../types';

export default function initPlaces(
  {
    apiKey = '',
    requester: extraRequester,
    ...otherArgs
  }: {
    apiKey?: ApiKey,
    requester?: RequestMethod,
  } = {}
) {
  if (otherArgs.appId) {
    throw new Error(
      'You passed an `appId` to initPlaces, but this only accepts `apiKey` as configuration'
    );
  }
  const requester = extraRequester
    ? extraRequester
    : createRequester({ appId: 'places', apiKey });

  return {
    ...attachParameters(placesMethods, { meta: { requester } }),
    requester,
  };
}
