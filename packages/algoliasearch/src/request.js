// @flow
import type { Requester, AppId, ApiKey } from './types';

// it will simply give back the arguments given
// this is a mocked method, not implemented yet
// later, we'll import from 'algoliasearch-request'
//
/* eslint-disable no-unused-vars */
export const createRequester: Requester = (
  appId: AppId,
  apiKey: ApiKey
) => requestParams => new Promise(resolve => resolve(requestParams));
