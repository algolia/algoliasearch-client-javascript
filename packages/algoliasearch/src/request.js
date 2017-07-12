/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved */
// @flow
import type { Requester } from './types';

// it will simply give back the arguments given
// this is a mocked method, not implemented yet
// later, we'll import from 'algoliasearch-request'
//
// eslint-disable-next-line no-unused-vars
export const createRequester: Requester = (appId, apiKey) => requestParams =>
  new Promise(resolve => resolve(requestParams));
