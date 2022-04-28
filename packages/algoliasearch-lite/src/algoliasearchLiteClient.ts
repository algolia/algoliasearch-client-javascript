import {
  createAuth,
  createTransporter,
  getUserAgent,
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

import type { MultipleQueriesParams } from '../model/multipleQueriesParams';
import type { MultipleQueriesResponse } from '../model/multipleQueriesResponse';
import type { SearchForFacetValuesRequest } from '../model/searchForFacetValuesRequest';
import type { SearchForFacetValuesResponse } from '../model/searchForFacetValuesResponse';
import type { SearchParams } from '../model/searchParams';
import type { SearchResponse } from '../model/searchResponse';

export * from '../model';
export const apiClientVersion = '0.1.0';

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
export function createAlgoliasearchLiteClient(options: CreateClientOptions) {
  const auth = createAuth(options.appId, options.apiKey, options.authMode);
  const transporter = createTransporter({
    hosts: options?.hosts ?? getDefaultHosts(options.appId),
    hostsCache: options.hostsCache,
    requestsCache: options.requestsCache,
    responsesCache: options.responsesCache,
    baseHeaders: {
      'content-type': 'application/x-www-form-urlencoded',
      ...auth.headers(),
    },
    baseQueryParameters: auth.queryParameters(),
    userAgent: getUserAgent({
      userAgents: options.userAgents,
      client: 'AlgoliasearchLite',
      version: apiClientVersion,
    }),
    timeouts: options.timeouts,
    requester: options.requester,
  });

  function addUserAgent(segment: string, version?: string): void {
    transporter.userAgent.add({ segment, version });
  }

  return {
    addUserAgent,
    /**
     * Get search results for the given requests.
     *
     * @summary Get search results for the given requests.
     * @param multipleQueriesParams - The multipleQueriesParams object.
     */
    multipleQueries(
      multipleQueriesParams: MultipleQueriesParams,
      requestOptions?: RequestOptions
    ): Promise<MultipleQueriesResponse> {
      if (!multipleQueriesParams) {
        throw new Error(
          'Parameter `multipleQueriesParams` is required when calling `multipleQueries`.'
        );
      }

      if (!multipleQueriesParams.requests) {
        throw new Error(
          'Parameter `multipleQueriesParams.requests` is required when calling `multipleQueries`.'
        );
      }

      const requestPath = '/1/indexes/*/queries';
      const headers: Headers = {};
      const queryParameters: QueryParameters = {};

      const request: Request = {
        method: 'POST',
        path: requestPath,
        data: multipleQueriesParams,
      };

      return transporter.request(
        request,
        {
          queryParameters,
          headers,
        },
        requestOptions
      );
    },

    /**
     * This method allow you to send requests to the Algolia REST API.
     *
     * @summary Send requests to the Algolia REST API.
     * @param post - The post object.
     * @param post.path - The path of the API endpoint to target, anything after the /1 needs to be specified.
     * @param post.parameters - Query parameters to be applied to the current query.
     * @param post.body - The parameters to send with the custom request.
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
        data: body,
      };

      return transporter.request(
        request,
        {
          queryParameters,
          headers,
        },
        requestOptions
      );
    },

    /**
     * Get search results.
     *
     * @summary Get search results.
     * @param search - The search object.
     * @param search.indexName - The index in which to perform the request.
     * @param search.searchParams - The searchParams object.
     */
    search(
      { indexName, searchParams }: SearchProps,
      requestOptions?: RequestOptions
    ): Promise<SearchResponse> {
      if (!indexName) {
        throw new Error(
          'Parameter `indexName` is required when calling `search`.'
        );
      }

      if (!searchParams) {
        throw new Error(
          'Parameter `searchParams` is required when calling `search`.'
        );
      }

      const requestPath = '/1/indexes/{indexName}/query'.replace(
        '{indexName}',
        encodeURIComponent(indexName)
      );
      const headers: Headers = {};
      const queryParameters: QueryParameters = {};

      const request: Request = {
        method: 'POST',
        path: requestPath,
        data: searchParams,
      };

      return transporter.request(
        request,
        {
          queryParameters,
          headers,
        },
        requestOptions
      );
    },

    /**
     * Search for values of a given facet, optionally restricting the returned values to those contained in objects matching other search criteria.
     *
     * @summary Search for values of a given facet.
     * @param searchForFacetValues - The searchForFacetValues object.
     * @param searchForFacetValues.indexName - The index in which to perform the request.
     * @param searchForFacetValues.facetName - The facet name.
     * @param searchForFacetValues.searchForFacetValuesRequest - The searchForFacetValuesRequest object.
     */
    searchForFacetValues(
      {
        indexName,
        facetName,
        searchForFacetValuesRequest,
      }: SearchForFacetValuesProps,
      requestOptions?: RequestOptions
    ): Promise<SearchForFacetValuesResponse> {
      if (!indexName) {
        throw new Error(
          'Parameter `indexName` is required when calling `searchForFacetValues`.'
        );
      }

      if (!facetName) {
        throw new Error(
          'Parameter `facetName` is required when calling `searchForFacetValues`.'
        );
      }

      const requestPath = '/1/indexes/{indexName}/facets/{facetName}/query'
        .replace('{indexName}', encodeURIComponent(indexName))
        .replace('{facetName}', encodeURIComponent(facetName));
      const headers: Headers = {};
      const queryParameters: QueryParameters = {};

      const request: Request = {
        method: 'POST',
        path: requestPath,
        data: searchForFacetValuesRequest,
      };

      return transporter.request(
        request,
        {
          queryParameters,
          headers,
        },
        requestOptions
      );
    },
  };
}

export type AlgoliasearchLiteClient = ReturnType<
  typeof createAlgoliasearchLiteClient
>;

export type PostProps = {
  /**
   * The path of the API endpoint to target, anything after the /1 needs to be specified.
   */
  path: string;
  /**
   * Query parameters to be applied to the current query.
   */
  parameters?: Record<string, any>;
  /**
   * The parameters to send with the custom request.
   */
  body?: Record<string, any>;
};

export type SearchProps = {
  /**
   * The index in which to perform the request.
   */
  indexName: string;
  searchParams: SearchParams;
};

export type SearchForFacetValuesProps = {
  /**
   * The index in which to perform the request.
   */
  indexName: string;
  /**
   * The facet name.
   */
  facetName: string;
  searchForFacetValuesRequest?: SearchForFacetValuesRequest;
};
