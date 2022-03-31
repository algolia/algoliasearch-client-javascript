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

import type { GetRecommendationsParams } from '../model/getRecommendationsParams';
import type { GetRecommendationsResponse } from '../model/getRecommendationsResponse';

export * from '../model/models';
export const apiClientVersion = '0.0.5';

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
export function createRecommendApi(options: CreateClientOptions) {
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
      client: 'Recommend',
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
     * This method allow you to send requests to the Algolia REST API.
     *
     * @summary Send requests to the Algolia REST API.
     * @param del - The del object.
     * @param del.path - The path of the API endpoint to target, anything after the /1 needs to be specified.
     * @param del.parameters - URL-encoded query string. Force some query parameters to be applied for each query made with this API key.
     * @param del.body - The parameters to send with the custom request.
     */
    del(
      { path, parameters, body }: DelProps,
      requestOptions?: RequestOptions
    ): Promise<Record<string, any>> {
      const requestPath = '/1{path}'.replace(
        '{path}',
        encodeURIComponent(String(path))
      );
      const headers: Headers = {};
      const queryParameters: QueryParameters = {};

      if (!path) {
        throw new Error('Parameter `path` is required when calling `del`.');
      }

      if (parameters !== undefined) {
        queryParameters.parameters = parameters.toString();
      }

      const request: Request = {
        method: 'DELETE',
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
     * This method allow you to send requests to the Algolia REST API.
     *
     * @summary Send requests to the Algolia REST API.
     * @param get - The get object.
     * @param get.path - The path of the API endpoint to target, anything after the /1 needs to be specified.
     * @param get.parameters - URL-encoded query string. Force some query parameters to be applied for each query made with this API key.
     */
    get(
      { path, parameters }: GetProps,
      requestOptions?: RequestOptions
    ): Promise<Record<string, any>> {
      const requestPath = '/1{path}'.replace(
        '{path}',
        encodeURIComponent(String(path))
      );
      const headers: Headers = {};
      const queryParameters: QueryParameters = {};

      if (!path) {
        throw new Error('Parameter `path` is required when calling `get`.');
      }

      if (parameters !== undefined) {
        queryParameters.parameters = parameters.toString();
      }

      const request: Request = {
        method: 'GET',
        path: requestPath,
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
     * Returns recommendations for a specific model and objectID.
     *
     * @summary Returns recommendations for a specific model and objectID.
     * @param getRecommendationsParams - The getRecommendationsParams object.
     */
    getRecommendations(
      getRecommendationsParams: GetRecommendationsParams,
      requestOptions?: RequestOptions
    ): Promise<GetRecommendationsResponse> {
      const requestPath = '/1/indexes/*/recommendations';
      const headers: Headers = {};
      const queryParameters: QueryParameters = {};

      if (!getRecommendationsParams) {
        throw new Error(
          'Parameter `getRecommendationsParams` is required when calling `getRecommendations`.'
        );
      }

      if (!getRecommendationsParams.requests) {
        throw new Error(
          'Parameter `getRecommendationsParams.requests` is required when calling `getRecommendations`.'
        );
      }

      const request: Request = {
        method: 'POST',
        path: requestPath,
        data: getRecommendationsParams,
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
     * @param post.parameters - URL-encoded query string. Force some query parameters to be applied for each query made with this API key.
     * @param post.body - The parameters to send with the custom request.
     */
    post(
      { path, parameters, body }: PostProps,
      requestOptions?: RequestOptions
    ): Promise<Record<string, any>> {
      const requestPath = '/1{path}'.replace(
        '{path}',
        encodeURIComponent(String(path))
      );
      const headers: Headers = {};
      const queryParameters: QueryParameters = {};

      if (!path) {
        throw new Error('Parameter `path` is required when calling `post`.');
      }

      if (parameters !== undefined) {
        queryParameters.parameters = parameters.toString();
      }

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
     * This method allow you to send requests to the Algolia REST API.
     *
     * @summary Send requests to the Algolia REST API.
     * @param put - The put object.
     * @param put.path - The path of the API endpoint to target, anything after the /1 needs to be specified.
     * @param put.parameters - URL-encoded query string. Force some query parameters to be applied for each query made with this API key.
     * @param put.body - The parameters to send with the custom request.
     */
    put(
      { path, parameters, body }: PutProps,
      requestOptions?: RequestOptions
    ): Promise<Record<string, any>> {
      const requestPath = '/1{path}'.replace(
        '{path}',
        encodeURIComponent(String(path))
      );
      const headers: Headers = {};
      const queryParameters: QueryParameters = {};

      if (!path) {
        throw new Error('Parameter `path` is required when calling `put`.');
      }

      if (parameters !== undefined) {
        queryParameters.parameters = parameters.toString();
      }

      const request: Request = {
        method: 'PUT',
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
  };
}

export type RecommendApi = ReturnType<typeof createRecommendApi>;

export type DelProps = {
  /**
   * The path of the API endpoint to target, anything after the /1 needs to be specified.
   */
  path: string;
  /**
   * URL-encoded query string. Force some query parameters to be applied for each query made with this API key.
   */
  parameters?: string;
  /**
   * The parameters to send with the custom request.
   */
  body?: Record<string, any>;
};

export type GetProps = {
  /**
   * The path of the API endpoint to target, anything after the /1 needs to be specified.
   */
  path: string;
  /**
   * URL-encoded query string. Force some query parameters to be applied for each query made with this API key.
   */
  parameters?: string;
};

export type PostProps = {
  /**
   * The path of the API endpoint to target, anything after the /1 needs to be specified.
   */
  path: string;
  /**
   * URL-encoded query string. Force some query parameters to be applied for each query made with this API key.
   */
  parameters?: string;
  /**
   * The parameters to send with the custom request.
   */
  body?: Record<string, any>;
};

export type PutProps = {
  /**
   * The path of the API endpoint to target, anything after the /1 needs to be specified.
   */
  path: string;
  /**
   * URL-encoded query string. Force some query parameters to be applied for each query made with this API key.
   */
  parameters?: string;
  /**
   * The parameters to send with the custom request.
   */
  body?: Record<string, any>;
};
