/* eslint import/namespace: [2, { allowComputed: true }] */
// @flow

import { createRequester } from 'algoliasearch-requester';
import * as placesMethods from '../methods/places/index.js';
import attachParameters from './attachParameters.js';
import universalRequester from 'algoliasearch-http-requester';

import type { ApiKey, AppId } from 'algoliasearch';
import type {
  RequestMethod,
  RequesterOptions,
  HttpModule,
} from 'algoliasearch-requester';

export default function initPlaces({
  apiKey = '',
  appId = 'places',
  requester: extraRequester,
  options,
  httpRequester: extraHttpRequester,
}: {
  apiKey?: ApiKey,
  appId?: AppId,
  requester?: RequestMethod,
  options?: RequesterOptions,
  httpRequester?: HttpModule,
} = {}) {
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

  const httpRequester =
    typeof extraHttpRequester === 'function'
      ? extraHttpRequester
      : universalRequester;

  const requester = extraRequester
    ? extraRequester
    : createRequester({ appId, apiKey, options, httpRequester });

  return {
    ...attachParameters(placesMethods, { requester }),
    requester,
    httpRequester,
  };
}
