/* eslint import/namespace: [2, { allowComputed: true }] */
// @flow

import * as placesMethods from '../methods/places';
import { createRequester } from '../request';
import attachParameters from './attachParameters';

import type { RequestMethod, RequesterOptions, ApiKey, AppId } from '../types';

export default function initPlaces(
  {
    apiKey = '',
    appId = 'places',
    requester: extraRequester,
    options,
  }: {
    apiKey?: ApiKey,
    appId?: AppId,
    requester?: RequestMethod,
    options?: RequesterOptions,
  } = {}
) {
  // if there's an appId, there should also be an apiKey
  // all other cases are invalid
  if (
    ((appId === 'places' || appId === '') && apiKey !== '') ||
    (appId !== 'places' && appId !== '' && apiKey === '')
  ) {
    /* eslint-disable prefer-rest-params */
    throw new Error(
      `Credentials not valid: you gave an API key (${apiKey}), and appId (${appId}) 
      
      initPlaces(${[...arguments].map(arg => JSON.stringify(arg)).join(',')})`
    );
    /* eslint-enable prefer-rest-params */
  }
  const requester = extraRequester
    ? extraRequester
    : createRequester({ appId, apiKey, options });

  return {
    ...attachParameters(placesMethods, { meta: { requester } }),
    requester,
  };
}
