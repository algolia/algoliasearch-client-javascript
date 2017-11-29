/* eslint import/namespace: [2, { allowComputed: true }] */
// @flow

import * as placesMethods from '../methods/places';
import { createRequester } from 'algoliasearch-requester';
import attachParameters from './attachParameters';
// todo: use a real requester
import { fakeRequester as httpRequester } from '../testUtils';

import type { ApiKey, AppId } from 'algoliasearch';
import type { RequestMethod, RequesterOptions } from 'algoliasearch-requester';

export default function initPlaces(
  {
    apiKey = '',
    appID = 'places',
    requester: extraRequester,
    options,
  }: {
    apiKey?: ApiKey,
    appID?: AppId,
    requester?: RequestMethod,
    options?: RequesterOptions,
  } = {}
) {
  // if there's an appId, there should also be an apiKey
  // all other cases are invalid
  if (
    ((appID === 'places' || appID === '') && apiKey !== '') ||
    (appID !== 'places' && appID !== '' && apiKey === '')
  ) {
    /* eslint-disable prefer-rest-params */
    throw new Error(
      `Credentials not valid: you gave an API key (${apiKey}), and appID (${
        appID
      })

initPlaces(${[...arguments].map(arg => JSON.stringify(arg)).join(',')})`
    );
    /* eslint-enable prefer-rest-params */
  }
  const requester = extraRequester
    ? extraRequester
    : createRequester({ appID, apiKey, options, httpRequester });

  return {
    ...attachParameters(placesMethods, { requester }),
    requester,
  };
}
