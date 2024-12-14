// Code generated by OpenAPI Generator (https://openapi-generator.tech), manual changes will be lost - read more on https://github.com/algolia/api-clients-automation. DO NOT EDIT.

export type SearchClient = ReturnType<typeof createSearchClient> & SearchClientNodeHelpers;

import { createMemoryCache, createNullCache, createNullLogger, serializeQueryParameters } from '@algolia/client-common';
import { createFetchRequester } from '@algolia/requester-fetch';

import type { ClientOptions } from '@algolia/client-common';

import { createSearchClient } from '../src/searchClient';

export { apiClientVersion } from '../src/searchClient';

export * from '../model';

import type {
  GenerateSecuredApiKeyOptions,
  GetSecuredApiKeyRemainingValidityOptions,
  SearchClientNodeHelpers,
} from '../model';

async function getCryptoKey(secret: string): Promise<CryptoKey> {
  const secretBuf = new TextEncoder().encode(secret);
  return await crypto.subtle.importKey('raw', secretBuf, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
}

async function generateHmacHex(cryptoKey: CryptoKey, queryParameters: string): Promise<string> {
  const encoder = new TextEncoder();
  const queryParametersUint8Array = encoder.encode(queryParameters);
  const signature = await crypto.subtle.sign('HMAC', cryptoKey, queryParametersUint8Array);
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

async function generateBase64Hmac(parentApiKey: string, queryParameters: string): Promise<string> {
  const crypotKey = await getCryptoKey(parentApiKey);
  const hmacHex = await generateHmacHex(crypotKey, queryParameters);
  const combined = hmacHex + queryParameters;
  return btoa(combined);
}

export function searchClient(appId: string, apiKey: string, options?: ClientOptions): SearchClient {
  if (!appId || typeof appId !== 'string') {
    throw new Error('`appId` is missing.');
  }

  if (!apiKey || typeof apiKey !== 'string') {
    throw new Error('`apiKey` is missing.');
  }

  return {
    ...createSearchClient({
      appId,
      apiKey,
      timeouts: {
        connect: 2000,
        read: 5000,
        write: 30000,
      },
      logger: createNullLogger(),
      algoliaAgents: [{ segment: 'Fetch' }],
      requester: createFetchRequester(),
      responsesCache: createNullCache(),
      requestsCache: createNullCache(),
      hostsCache: createMemoryCache(),
      ...options,
    }),
    /**
     * Helper: Generates a secured API key based on the given `parentApiKey` and given `restrictions`.
     *
     * @summary Helper: Generates a secured API key based on the given `parentApiKey` and given `restrictions`.
     * @param generateSecuredApiKey - The `generateSecuredApiKey` object.
     * @param generateSecuredApiKey.parentApiKey - The base API key from which to generate the new secured one.
     * @param generateSecuredApiKey.restrictions - A set of properties defining the restrictions of the secured API key.
     */
    generateSecuredApiKey: async ({
      parentApiKey,
      restrictions = {},
    }: GenerateSecuredApiKeyOptions): Promise<string> => {
      let mergedRestrictions = restrictions;
      if (restrictions.searchParams) {
        // merge searchParams with the root restrictions
        mergedRestrictions = {
          ...restrictions,
          ...restrictions.searchParams,
        };

        delete mergedRestrictions.searchParams;
      }

      mergedRestrictions = Object.keys(mergedRestrictions)
        .sort()
        .reduce(
          (acc, key) => {
            acc[key] = (mergedRestrictions as any)[key];
            return acc;
          },
          {} as Record<string, unknown>,
        );

      const queryParameters = serializeQueryParameters(mergedRestrictions);
      return generateBase64Hmac(parentApiKey, queryParameters);
    },

    /**
     * Helper: Retrieves the remaining validity of the previous generated `securedApiKey`, the `ValidUntil` parameter must have been provided.
     *
     * @summary Helper: Retrieves the remaining validity of the previous generated `secured_api_key`, the `ValidUntil` parameter must have been provided.
     * @param getSecuredApiKeyRemainingValidity - The `getSecuredApiKeyRemainingValidity` object.
     * @param getSecuredApiKeyRemainingValidity.securedApiKey - The secured API key generated with the `generateSecuredApiKey` method.
     */
    getSecuredApiKeyRemainingValidity: ({ securedApiKey }: GetSecuredApiKeyRemainingValidityOptions): number => {
      const decodedString = atob(securedApiKey);
      const regex = /validUntil=(\d+)/;
      const match = decodedString.match(regex);

      if (match === null) {
        throw new Error('validUntil not found in given secured api key.');
      }

      return parseInt(match[1], 10) - Math.round(new Date().getTime() / 1000);
    },
  };
}
