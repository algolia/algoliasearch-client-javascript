import {
  createAuth,
  createTransporter,
  getUserAgent,
} from '@experimental-api-clients-automation/client-common';
import type {
  CreateClientOptions,
  Headers,
  Host,
  Request,
  RequestOptions,
  QueryParameters,
} from '@experimental-api-clients-automation/client-common';

import type { FetchUserProfileResponse } from '../model/fetchUserProfileResponse';
import type { Params } from '../model/params';

export * from '../model/models';
export const apiClientVersion = '0.0.5';

function getDefaultHosts(): Host[] {
  return [
    {
      url: 'predict-api-oslcbws3zq-ew.a.run.app',
      accept: 'readWrite',
      protocol: 'https',
    },
  ];
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function createPredictApi(options: CreateClientOptions) {
  const auth = createAuth(options.appId, options.apiKey, options.authMode);
  const transporter = createTransporter({
    hosts: options?.hosts ?? getDefaultHosts(),
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
      client: 'Predict',
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
     * Get predictions, properties (raw, computed or custom) and segments (computed or custom) for a user profile.
     *
     * @summary Get user profile.
     * @param fetchUserProfile - The fetchUserProfile object.
     * @param fetchUserProfile.userID - User ID for authenticated users or cookie ID for non-authenticated repeated users (visitors).
     * @param fetchUserProfile.params - The params object.
     */
    fetchUserProfile(
      { userID, params }: FetchUserProfileProps,
      requestOptions?: RequestOptions
    ): Promise<FetchUserProfileResponse> {
      const requestPath = '/1/users/{userID}/fetch'.replace(
        '{userID}',
        encodeURIComponent(String(userID))
      );
      const headers: Headers = {};
      const queryParameters: QueryParameters = {};

      if (!userID) {
        throw new Error(
          'Parameter `userID` is required when calling `fetchUserProfile`.'
        );
      }

      if (!params) {
        throw new Error(
          'Parameter `params` is required when calling `fetchUserProfile`.'
        );
      }

      const request: Request = {
        method: 'POST',
        path: requestPath,
        data: params,
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

export type PredictApi = ReturnType<typeof createPredictApi>;

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

export type FetchUserProfileProps = {
  /**
   * User ID for authenticated users or cookie ID for non-authenticated repeated users (visitors).
   */
  userID: string;
  params: Params;
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
