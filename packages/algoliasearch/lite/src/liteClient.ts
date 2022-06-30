import {
  createAuth,
  createTransporter,
  getAlgoliaAgent,
  shuffle,
} from '@experimental-api-clients-automation/client-common';
import type {
  CreateClientOptions,
  Headers,
  Host,
  Request,
  RequestOptions,
  QueryParameters,
} from '@experimental-api-clients-automation/client-common';

import type {
  PostProps,
  LegacySearchMethodProps,
} from '../model/clientMethodProps';
import type { SearchMethodParams } from '../model/searchMethodParams';
import type { SearchResponses } from '../model/searchResponses';

export const apiClientVersion = '0.7.1';

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
    ])
  );
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function createLiteClient({
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
      client: 'Lite',
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

  function addAlgoliaAgent(segment: string, version?: string): void {
    transporter.algoliaAgent.add({ segment, version });
  }

  return {
    addAlgoliaAgent,
    /**
     * This method allow you to send requests to the Algolia REST API.
     *
     * @summary Send requests to the Algolia REST API.
     * @param post - The post object.
     * @param post.path - The path of the API endpoint to target, anything after the /1 needs to be specified.
     * @param post.parameters - Query parameters to be applied to the current query.
     * @param post.body - The parameters to send with the custom request.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    post(
      { path, parameters, body }: PostProps,
      requestOptions?: RequestOptions
    ): Promise<Record<string, any>> {
      if (!path) {
        throw new Error('Parameter `path` is required when calling `post`.');
      }

      const requestPath = '/1{path}'.replace('{path}', path);
      const headers: Headers = {};
      const queryParameters: QueryParameters = parameters || {};

      const request: Request = {
        method: 'POST',
        path: requestPath,
        queryParameters,
        headers,
        data: body,
      };

      return transporter.request(request, requestOptions);
    },

    /**
     * Perform a search operation targeting one or many indices.
     *
     * @summary Search multiple indices.
     * @param searchMethodParams - The `search` requests and strategy.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    search(
      searchMethodParams: LegacySearchMethodProps | SearchMethodParams,
      requestOptions?: RequestOptions
    ): Promise<SearchResponses> {
      if (searchMethodParams && Array.isArray(searchMethodParams)) {
        const newSignatureRequest: SearchMethodParams = {
          requests: searchMethodParams.map(({ params, ...legacyRequest }) => {
            if (legacyRequest.type === 'facet') {
              return {
                ...legacyRequest,
                ...params,
                type: 'facet',
              };
            }

            return {
              ...legacyRequest,
              ...params,
              facet: undefined,
              maxFacetHits: undefined,
              facetQuery: undefined,
            };
          }),
        };

        // eslint-disable-next-line no-param-reassign
        searchMethodParams = newSignatureRequest;
      }

      if (!searchMethodParams) {
        throw new Error(
          'Parameter `searchMethodParams` is required when calling `search`.'
        );
      }

      if (!searchMethodParams.requests) {
        throw new Error(
          'Parameter `searchMethodParams.requests` is required when calling `search`.'
        );
      }

      const requestPath = '/1/indexes/*/queries';
      const headers: Headers = {};
      const queryParameters: QueryParameters = {};

      const request: Request = {
        method: 'POST',
        path: requestPath,
        queryParameters,
        headers,
        data: searchMethodParams,
        useReadTransporter: true,
        cacheable: true,
      };

      return transporter.request(request, requestOptions);
    },
  };
}

export type LiteClient = ReturnType<typeof createLiteClient>;
