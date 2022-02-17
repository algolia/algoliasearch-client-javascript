import { Transporter, createAuth, getUserAgent } from '@algolia/client-common';
import type {
  CreateClientOptions,
  Headers,
  Host,
  Request,
} from '@algolia/client-common';

import type { DeleteUserProfileResponse } from '../model/deleteUserProfileResponse';
import type { GetUserTokenResponse } from '../model/getUserTokenResponse';
import type { PersonalizationStrategyParams } from '../model/personalizationStrategyParams';
import type { SetPersonalizationStrategyResponse } from '../model/setPersonalizationStrategyResponse';

export const apiClientVersion = '5.0.0';

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
export const createPersonalizationApi = (
  options: CreateClientOptions & { region: Region }
) => {
  const auth = createAuth(options.appId, options.apiKey, options.authMode);
  const transporter = new Transporter({
    hosts: options?.hosts ?? getDefaultHosts(options.region),
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

  /**
   * Returns, as part of the response, a date until which the data can safely be considered as deleted for the given user. This means that if you send events for the given user before this date, they will be ignored. Any data received after the deletedUntil date will start building a new user profile. It might take a couple hours before for the deletion request to be fully processed.
   *
   * @summary Delete the user profile and all its associated data.
   * @param deleteUserProfile - The deleteUserProfile object.
   * @param deleteUserProfile.userToken - UserToken representing the user for which to fetch the Personalization profile.
   */
  function deleteUserProfile({
    userToken,
  }: DeleteUserProfileProps): Promise<DeleteUserProfileResponse> {
    const path = '/1/profiles/{userToken}'.replace(
      '{userToken}',
      encodeURIComponent(String(userToken))
    );
    const headers: Headers = { Accept: 'application/json' };
    const queryParameters: Record<string, string> = {};

    if (!userToken) {
      throw new Error(
        'Parameter `userToken` is required when calling `deleteUserProfile`.'
      );
    }

    const request: Request = {
      method: 'DELETE',
      path,
    };

    return transporter.request(request, {
      queryParameters,
      headers,
    });
  }

  /**
   * The strategy contains information on the events and facets that impact user profiles and personalized search results.
   *
   * @summary Get the current personalization strategy.
   */
  function getPersonalizationStrategy(): Promise<PersonalizationStrategyParams> {
    const path = '/1/strategies/personalization';
    const headers: Headers = { Accept: 'application/json' };
    const queryParameters: Record<string, string> = {};

    const request: Request = {
      method: 'GET',
      path,
    };

    return transporter.request(request, {
      queryParameters,
      headers,
    });
  }

  /**
   * The profile is structured by facet name used in the strategy. Each facet value is mapped to its score. Each score represents the user affinity for a specific facet value given the userToken past events and the Personalization strategy defined. Scores are bounded to 20. The last processed event timestamp is provided using the ISO 8601 format for debugging purposes.
   *
   * @summary Get the user profile built from Personalization strategy.
   * @param getUserTokenProfile - The getUserTokenProfile object.
   * @param getUserTokenProfile.userToken - UserToken representing the user for which to fetch the Personalization profile.
   */
  function getUserTokenProfile({
    userToken,
  }: GetUserTokenProfileProps): Promise<GetUserTokenResponse> {
    const path = '/1/profiles/personalization/{userToken}'.replace(
      '{userToken}',
      encodeURIComponent(String(userToken))
    );
    const headers: Headers = { Accept: 'application/json' };
    const queryParameters: Record<string, string> = {};

    if (!userToken) {
      throw new Error(
        'Parameter `userToken` is required when calling `getUserTokenProfile`.'
      );
    }

    const request: Request = {
      method: 'GET',
      path,
    };

    return transporter.request(request, {
      queryParameters,
      headers,
    });
  }

  /**
   * A strategy defines the events and facets that impact user profiles and personalized search results.
   *
   * @summary Set a new personalization strategy.
   * @param personalizationStrategyParams - The personalizationStrategyParams object.
   */
  function setPersonalizationStrategy(
    personalizationStrategyParams: PersonalizationStrategyParams
  ): Promise<SetPersonalizationStrategyResponse> {
    const path = '/1/strategies/personalization';
    const headers: Headers = { Accept: 'application/json' };
    const queryParameters: Record<string, string> = {};

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

    const request: Request = {
      method: 'POST',
      path,
      data: personalizationStrategyParams,
    };

    return transporter.request(request, {
      queryParameters,
      headers,
    });
  }

  return {
    deleteUserProfile,
    getPersonalizationStrategy,
    getUserTokenProfile,
    setPersonalizationStrategy,
  };
};

export type PersonalizationApi = ReturnType<typeof createPersonalizationApi>;

export type DeleteUserProfileProps = {
  /**
   * UserToken representing the user for which to fetch the Personalization profile.
   */
  userToken: string;
};

export type GetUserTokenProfileProps = {
  /**
   * UserToken representing the user for which to fetch the Personalization profile.
   */
  userToken: string;
};
