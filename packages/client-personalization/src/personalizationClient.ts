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

import type { DeleteUserProfileResponse } from '../model/deleteUserProfileResponse';
import type { GetUserTokenResponse } from '../model/getUserTokenResponse';
import type { PersonalizationStrategyParams } from '../model/personalizationStrategyParams';
import type { SetPersonalizationStrategyResponse } from '../model/setPersonalizationStrategyResponse';

export * from '../model';
export const apiClientVersion = '0.1.0';

export type Region = 'eu' | 'us';

function getDefaultHosts(region: Region): Host[] {
  return [
    {
      url: `personalization.${region}.algolia.com`,
      accept: 'readWrite',
      protocol: 'https',
    },
  ];
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function createPersonalizationClient(
  options: CreateClientOptions & { region: Region }
) {
  const auth = createAuth(options.appId, options.apiKey, options.authMode);
  const transporter = createTransporter({
    hosts: options?.hosts ?? getDefaultHosts(options.region),
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
      client: 'Personalization',
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
     * @param del.parameters - Query parameters to be applied to the current query.
     */
    del(
      { path, parameters }: DelProps,
      requestOptions?: RequestOptions
    ): Promise<Record<string, any>> {
      if (!path) {
        throw new Error('Parameter `path` is required when calling `del`.');
      }

      const requestPath = '/1{path}'.replace('{path}', path);
      const headers: Headers = {};
      const queryParameters: QueryParameters = parameters || {};

      const request: Request = {
        method: 'DELETE',
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
     * Returns, as part of the response, a date until which the data can safely be considered as deleted for the given user. This means that if you send events for the given user before this date, they will be ignored. Any data received after the deletedUntil date will start building a new user profile. It might take a couple hours before for the deletion request to be fully processed.
     *
     * @summary Delete the user profile and all its associated data.
     * @param deleteUserProfile - The deleteUserProfile object.
     * @param deleteUserProfile.userToken - UserToken representing the user for which to fetch the Personalization profile.
     */
    deleteUserProfile(
      { userToken }: DeleteUserProfileProps,
      requestOptions?: RequestOptions
    ): Promise<DeleteUserProfileResponse> {
      if (!userToken) {
        throw new Error(
          'Parameter `userToken` is required when calling `deleteUserProfile`.'
        );
      }

      const requestPath = '/1/profiles/{userToken}'.replace(
        '{userToken}',
        encodeURIComponent(userToken)
      );
      const headers: Headers = {};
      const queryParameters: QueryParameters = {};

      const request: Request = {
        method: 'DELETE',
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
     * @param get - The get object.
     * @param get.path - The path of the API endpoint to target, anything after the /1 needs to be specified.
     * @param get.parameters - Query parameters to be applied to the current query.
     */
    get(
      { path, parameters }: GetProps,
      requestOptions?: RequestOptions
    ): Promise<Record<string, any>> {
      if (!path) {
        throw new Error('Parameter `path` is required when calling `get`.');
      }

      const requestPath = '/1{path}'.replace('{path}', path);
      const headers: Headers = {};
      const queryParameters: QueryParameters = parameters || {};

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
     * The strategy contains information on the events and facets that impact user profiles and personalized search results.
     *
     * @summary Get the current personalization strategy.
     */
    getPersonalizationStrategy(
      requestOptions?: RequestOptions
    ): Promise<PersonalizationStrategyParams> {
      const requestPath = '/1/strategies/personalization';
      const headers: Headers = {};
      const queryParameters: QueryParameters = {};

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
     * The profile is structured by facet name used in the strategy. Each facet value is mapped to its score. Each score represents the user affinity for a specific facet value given the userToken past events and the Personalization strategy defined. Scores are bounded to 20. The last processed event timestamp is provided using the ISO 8601 format for debugging purposes.
     *
     * @summary Get the user profile built from Personalization strategy.
     * @param getUserTokenProfile - The getUserTokenProfile object.
     * @param getUserTokenProfile.userToken - UserToken representing the user for which to fetch the Personalization profile.
     */
    getUserTokenProfile(
      { userToken }: GetUserTokenProfileProps,
      requestOptions?: RequestOptions
    ): Promise<GetUserTokenResponse> {
      if (!userToken) {
        throw new Error(
          'Parameter `userToken` is required when calling `getUserTokenProfile`.'
        );
      }

      const requestPath = '/1/profiles/personalization/{userToken}'.replace(
        '{userToken}',
        encodeURIComponent(userToken)
      );
      const headers: Headers = {};
      const queryParameters: QueryParameters = {};

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
     * This method allow you to send requests to the Algolia REST API.
     *
     * @summary Send requests to the Algolia REST API.
     * @param put - The put object.
     * @param put.path - The path of the API endpoint to target, anything after the /1 needs to be specified.
     * @param put.parameters - Query parameters to be applied to the current query.
     * @param put.body - The parameters to send with the custom request.
     */
    put(
      { path, parameters, body }: PutProps,
      requestOptions?: RequestOptions
    ): Promise<Record<string, any>> {
      if (!path) {
        throw new Error('Parameter `path` is required when calling `put`.');
      }

      const requestPath = '/1{path}'.replace('{path}', path);
      const headers: Headers = {};
      const queryParameters: QueryParameters = parameters || {};

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

    /**
     * A strategy defines the events and facets that impact user profiles and personalized search results.
     *
     * @summary Set a new personalization strategy.
     * @param personalizationStrategyParams - The personalizationStrategyParams object.
     */
    setPersonalizationStrategy(
      personalizationStrategyParams: PersonalizationStrategyParams,
      requestOptions?: RequestOptions
    ): Promise<SetPersonalizationStrategyResponse> {
      if (!personalizationStrategyParams) {
        throw new Error(
          'Parameter `personalizationStrategyParams` is required when calling `setPersonalizationStrategy`.'
        );
      }

      if (!personalizationStrategyParams.eventScoring) {
        throw new Error(
          'Parameter `personalizationStrategyParams.eventScoring` is required when calling `setPersonalizationStrategy`.'
        );
      }
      if (!personalizationStrategyParams.facetScoring) {
        throw new Error(
          'Parameter `personalizationStrategyParams.facetScoring` is required when calling `setPersonalizationStrategy`.'
        );
      }
      if (!personalizationStrategyParams.personalizationImpact) {
        throw new Error(
          'Parameter `personalizationStrategyParams.personalizationImpact` is required when calling `setPersonalizationStrategy`.'
        );
      }

      const requestPath = '/1/strategies/personalization';
      const headers: Headers = {};
      const queryParameters: QueryParameters = {};

      const request: Request = {
        method: 'POST',
        path: requestPath,
        data: personalizationStrategyParams,
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

export type PersonalizationClient = ReturnType<
  typeof createPersonalizationClient
>;

export type DelProps = {
  /**
   * The path of the API endpoint to target, anything after the /1 needs to be specified.
   */
  path: string;
  /**
   * Query parameters to be applied to the current query.
   */
  parameters?: Record<string, any>;
};

export type DeleteUserProfileProps = {
  /**
   * UserToken representing the user for which to fetch the Personalization profile.
   */
  userToken: string;
};

export type GetProps = {
  /**
   * The path of the API endpoint to target, anything after the /1 needs to be specified.
   */
  path: string;
  /**
   * Query parameters to be applied to the current query.
   */
  parameters?: Record<string, any>;
};

export type GetUserTokenProfileProps = {
  /**
   * UserToken representing the user for which to fetch the Personalization profile.
   */
  userToken: string;
};

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

export type PutProps = {
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
