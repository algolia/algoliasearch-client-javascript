// Code generated by OpenAPI Generator (https://openapi-generator.tech), manual changes will be lost - read more on https://github.com/algolia/api-clients-automation. DO NOT EDIT.

import type {
  CreateClientOptions,
  Headers,
  Host,
  QueryParameters,
  Request,
  RequestOptions,
} from '@algolia/client-common';
import { createAuth, createTransporter, getAlgoliaAgent, shuffle } from '@algolia/client-common';

import type { SearchForFacetValuesResponse } from '../model/searchForFacetValuesResponse';
import type { SearchResponse } from '../model/searchResponse';

import type { SearchForFacetValuesProps, SearchProps } from '../model/clientMethodProps';

export const apiClientVersion = '0.0.1-beta.11';

function getDefaultHosts(appId: string): Host[] {
  return (
    [
      {
        url: `${appId}-dsn.algolia.net`,
        accept: 'read',
        protocol: 'https',
      },
      {
        url: `${appId}.algolia.net`,
        accept: 'write',
        protocol: 'https',
      },
    ] as Host[]
  ).concat(
    shuffle([
      {
        url: `${appId}-1.algolianet.com`,
        accept: 'readWrite',
        protocol: 'https',
      },
      {
        url: `${appId}-2.algolianet.com`,
        accept: 'readWrite',
        protocol: 'https',
      },
      {
        url: `${appId}-3.algolianet.com`,
        accept: 'readWrite',
        protocol: 'https',
      },
    ]),
  );
}

export function createCompositionClient({
  appId: appIdOption,
  apiKey: apiKeyOption,
  authMode,
  algoliaAgents,
  ...options
}: CreateClientOptions) {
  const auth = createAuth(appIdOption, apiKeyOption, authMode);
  const transporter = createTransporter({
    hosts: getDefaultHosts(appIdOption),
    ...options,
    algoliaAgent: getAlgoliaAgent({
      algoliaAgents,
      client: 'Composition',
      version: apiClientVersion,
    }),
    baseHeaders: {
      'content-type': 'text/plain',
      ...auth.headers(),
      ...options.baseHeaders,
    },
    baseQueryParameters: {
      ...auth.queryParameters(),
      ...options.baseQueryParameters,
    },
  });

  return {
    transporter,

    /**
     * The `appId` currently in use.
     */
    appId: appIdOption,

    /**
     * The `apiKey` currently in use.
     */
    apiKey: apiKeyOption,

    /**
     * Clears the cache of the transporter for the `requestsCache` and `responsesCache` properties.
     */
    clearCache(): Promise<void> {
      return Promise.all([transporter.requestsCache.clear(), transporter.responsesCache.clear()]).then(() => undefined);
    },

    /**
     * Get the value of the `algoliaAgent`, used by our libraries internally and telemetry system.
     */
    get _ua(): string {
      return transporter.algoliaAgent.value;
    },

    /**
     * Adds a `segment` to the `x-algolia-agent` sent with every requests.
     *
     * @param segment - The algolia agent (user-agent) segment to add.
     * @param version - The version of the agent.
     */
    addAlgoliaAgent(segment: string, version?: string): void {
      transporter.algoliaAgent.add({ segment, version });
    },

    /**
     * Helper method to switch the API key used to authenticate the requests.
     *
     * @param params - Method params.
     * @param params.apiKey - The new API Key to use.
     */
    setClientApiKey({ apiKey }: { apiKey: string }): void {
      if (!authMode || authMode === 'WithinHeaders') {
        transporter.baseHeaders['x-algolia-api-key'] = apiKey;
      } else {
        transporter.baseQueryParameters['x-algolia-api-key'] = apiKey;
      }
    },

    /**
     * Runs a query on a single composition and returns matching results.
     *
     * Required API Key ACLs:
     *  - search
     * @param search - The search object.
     * @param search.compositionID - Unique Composition ObjectID.
     * @param search.requestBody - The requestBody object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    search<T>(
      { compositionID, requestBody }: SearchProps,
      requestOptions?: RequestOptions,
    ): Promise<SearchResponse<T>> {
      if (!compositionID) {
        throw new Error('Parameter `compositionID` is required when calling `search`.');
      }

      if (!requestBody) {
        throw new Error('Parameter `requestBody` is required when calling `search`.');
      }

      const requestPath = '/1/compositions/{compositionID}/run'.replace(
        '{compositionID}',
        encodeURIComponent(compositionID),
      );
      const headers: Headers = {};
      const queryParameters: QueryParameters = {};

      const request: Request = {
        method: 'POST',
        path: requestPath,
        queryParameters,
        headers,
        data: requestBody,
        useReadTransporter: true,
        cacheable: true,
      };

      return transporter.request(request, requestOptions);
    },

    /**
     * Searches for values of a specified facet attribute on the composition\'s main source\'s index.  - By default, facet values are sorted by decreasing count.   You can adjust this with the `sortFacetValueBy` parameter. - Searching for facet values doesn\'t work if you have **more than 65 searchable facets and searchable attributes combined**.
     *
     * Required API Key ACLs:
     *  - search
     * @param searchForFacetValues - The searchForFacetValues object.
     * @param searchForFacetValues.compositionID - Unique Composition ObjectID.
     * @param searchForFacetValues.facetName - Facet attribute in which to search for values.  This attribute must be included in the `attributesForFaceting` index setting with the `searchable()` modifier.
     * @param searchForFacetValues.searchForFacetValuesRequest - The searchForFacetValuesRequest object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    searchForFacetValues(
      { compositionID, facetName, searchForFacetValuesRequest }: SearchForFacetValuesProps,
      requestOptions?: RequestOptions,
    ): Promise<SearchForFacetValuesResponse> {
      if (!compositionID) {
        throw new Error('Parameter `compositionID` is required when calling `searchForFacetValues`.');
      }

      if (!facetName) {
        throw new Error('Parameter `facetName` is required when calling `searchForFacetValues`.');
      }

      const requestPath = '/1/compositions/{compositionID}/facets/{facetName}/query'
        .replace('{compositionID}', encodeURIComponent(compositionID))
        .replace('{facetName}', encodeURIComponent(facetName));
      const headers: Headers = {};
      const queryParameters: QueryParameters = {};

      const request: Request = {
        method: 'POST',
        path: requestPath,
        queryParameters,
        headers,
        data: searchForFacetValuesRequest ? searchForFacetValuesRequest : {},
        useReadTransporter: true,
        cacheable: true,
      };

      return transporter.request(request, requestOptions);
    },
  };
}
