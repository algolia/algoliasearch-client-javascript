// @flow
import type { Requester, AppId, ApiKey, RequestOptions } from './types';

// it will simply give back the arguments given
// this is a mocked method, not implemented yet
// later, we'll import from 'algoliasearch-request'
//
/* eslint-disable no-unused-vars */
export const createRequester: Requester = ({
  appId,
  apiKey,
  options,
}: {
  appId: AppId,
  apiKey: ApiKey,
  options?: RequestOptions,
}) => requestParams => new Promise(resolve => resolve(requestParams));
