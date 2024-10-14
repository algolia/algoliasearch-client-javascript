// Code generated by OpenAPI Generator (https://openapi-generator.tech), manual changes will be lost - read more on https://github.com/algolia/api-clients-automation. DO NOT EDIT.

export type QuerySuggestionsClient = ReturnType<typeof createQuerySuggestionsClient>;

import {
  ClientOptions,
  createMemoryCache,
  createNullCache,
  createNullLogger,
  DEFAULT_CONNECT_TIMEOUT_NODE,
  DEFAULT_READ_TIMEOUT_NODE,
  DEFAULT_WRITE_TIMEOUT_NODE,
} from '@algolia/client-common';
import { createFetchRequester } from '@algolia/requester-fetch';

import { createQuerySuggestionsClient } from '../src/querySuggestionsClient';

import { Region, REGIONS } from '../src/querySuggestionsClient';

export * from '../model';
export { apiClientVersion, Region, RegionOptions } from '../src/querySuggestionsClient';

export function querySuggestionsClient(
  appId: string,
  apiKey: string,
  region: Region,
  options?: ClientOptions,
): QuerySuggestionsClient {
  if (!appId || typeof appId !== 'string') {
    throw new Error('`appId` is missing.');
  }

  if (!apiKey || typeof apiKey !== 'string') {
    throw new Error('`apiKey` is missing.');
  }

  if (!region || (region && (typeof region !== 'string' || !REGIONS.includes(region)))) {
    throw new Error(`\`region\` is required and must be one of the following: ${REGIONS.join(', ')}`);
  }

  return {
    ...createQuerySuggestionsClient({
      appId,
      apiKey,
      region,
      timeouts: {
        connect: DEFAULT_CONNECT_TIMEOUT_NODE,
        read: DEFAULT_READ_TIMEOUT_NODE,
        write: DEFAULT_WRITE_TIMEOUT_NODE,
      },
      logger: createNullLogger(),
      algoliaAgents: [{ segment: 'Fetch' }],
      requester: createFetchRequester(),
      responsesCache: createNullCache(),
      requestsCache: createNullCache(),
      hostsCache: createMemoryCache(),
      ...options,
    }),
  };
}
