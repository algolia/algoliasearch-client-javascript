import type { DeleteUserProfileResponse } from '../model/deleteUserProfileResponse';
import type { GetUserTokenResponse } from '../model/getUserTokenResponse';
import type { PersonalizationStrategyObject } from '../model/personalizationStrategyObject';
import type { SetPersonalizationStrategyResponse } from '../model/setPersonalizationStrategyResponse';
import { Transporter } from '../utils/Transporter';
import type { Requester } from '../utils/requester/Requester';
import type { Headers, Host, Request, RequestOptions } from '../utils/types';

export class PersonalizationApi {
  protected authentications = {
    apiKey: 'Algolia-API-Key',
    appId: 'Algolia-Application-Id',
  };

  private transporter: Transporter;

  private applyAuthenticationHeaders(
    requestOptions: RequestOptions
  ): RequestOptions {
    if (requestOptions?.headers) {
      return {
        ...requestOptions,
        headers: {
          ...requestOptions.headers,
          'X-Algolia-API-Key': this.authentications.apiKey,
          'X-Algolia-Application-Id': this.authentications.appId,
        },
      };
    }

    return requestOptions;
  }

  private sendRequest<TResponse>(
    request: Request,
    requestOptions: RequestOptions
  ): Promise<TResponse> {
    return this.transporter.request(
      request,
      this.applyAuthenticationHeaders(requestOptions)
    );
  }

  constructor(
    appId: string,
    apiKey: string,
    region: 'eu' | 'us',
    options?: { requester?: Requester; hosts?: Host[] }
  ) {
    this.setAuthentication({ appId, apiKey });

    this.transporter = new Transporter({
      hosts: options?.hosts ?? this.getDefaultHosts(region),
      baseHeaders: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      userAgent: 'Algolia for Javascript',
      timeouts: {
        connect: 2,
        read: 5,
        write: 30,
      },
      requester: options?.requester,
    });
  }

  getDefaultHosts(region: 'eu' | 'us' = 'us'): Host[] {
    return [
      {
        url: `personalization.${region}.algolia.com`,
        accept: 'readWrite',
        protocol: 'https',
      },
    ];
  }

  setRequest(requester: Requester): void {
    this.transporter.setRequester(requester);
  }

  setHosts(hosts: Host[]): void {
    this.transporter.setHosts(hosts);
  }

  setAuthentication({ appId, apiKey }): void {
    this.authentications = {
      apiKey,
      appId,
    };
  }

  /**
   * Returns, as part of the response, a date until which the data can safely be considered as deleted for the given user. This means that if you send events for the given user before this date, they will be ignored. Any data received after the deletedUntil date will start building a new user profile. It might take a couple hours before for the deletion request to be fully processed.
   *
   * @summary Delete the user profile and all its associated data.
   * @param deleteUserProfile - The deleteUserProfile object.
   * @param deleteUserProfile.userToken - UserToken representing the user for which to fetch the Personalization profile.
   */
  deleteUserProfile({
    userToken,
  }: DeleteUserProfileProps): Promise<DeleteUserProfileResponse> {
    const path = '/1/profiles/{userToken}'.replace(
      '{userToken}',
      encodeURIComponent(String(userToken))
    );
    const headers: Headers = { Accept: 'application/json' };
    const queryParameters: Record<string, string> = {};

    if (userToken === null || userToken === undefined) {
      throw new Error(
        'Required parameter userToken was null or undefined when calling deleteUserProfile.'
      );
    }

    const request: Request = {
      method: 'DELETE',
      path,
    };

    const requestOptions: RequestOptions = {
      headers,
      queryParameters,
    };

    return this.sendRequest(request, requestOptions);
  }
  /**
   * The strategy contains information on the events and facets that impact user profiles and personalized search results.
   *
   * @summary Get the current personalization strategy.
   */
  getPersonalizationStrategy(): Promise<PersonalizationStrategyObject> {
    const path = '/1/strategies/personalization';
    const headers: Headers = { Accept: 'application/json' };
    const queryParameters: Record<string, string> = {};

    const request: Request = {
      method: 'GET',
      path,
    };

    const requestOptions: RequestOptions = {
      headers,
      queryParameters,
    };

    return this.sendRequest(request, requestOptions);
  }
  /**
   * The profile is structured by facet name used in the strategy. Each facet value is mapped to its score. Each score represents the user affinity for a specific facet value given the userToken past events and the Personalization strategy defined. Scores are bounded to 20. The last processed event timestamp is provided using the ISO 8601 format for debugging purposes.
   *
   * @summary Get the user profile built from Personalization strategy.
   * @param getUserTokenProfile - The getUserTokenProfile object.
   * @param getUserTokenProfile.userToken - UserToken representing the user for which to fetch the Personalization profile.
   */
  getUserTokenProfile({
    userToken,
  }: GetUserTokenProfileProps): Promise<GetUserTokenResponse> {
    const path = '/1/profiles/personalization/{userToken}'.replace(
      '{userToken}',
      encodeURIComponent(String(userToken))
    );
    const headers: Headers = { Accept: 'application/json' };
    const queryParameters: Record<string, string> = {};

    if (userToken === null || userToken === undefined) {
      throw new Error(
        'Required parameter userToken was null or undefined when calling getUserTokenProfile.'
      );
    }

    const request: Request = {
      method: 'GET',
      path,
    };

    const requestOptions: RequestOptions = {
      headers,
      queryParameters,
    };

    return this.sendRequest(request, requestOptions);
  }
  /**
   * A strategy defines the events and facets that impact user profiles and personalized search results.
   *
   * @summary Set a new personalization strategy.
   * @param personalizationStrategyObject - The personalizationStrategyObject object.
   */
  setPersonalizationStrategy(
    personalizationStrategyObject: PersonalizationStrategyObject
  ): Promise<SetPersonalizationStrategyResponse> {
    const path = '/1/strategies/personalization';
    const headers: Headers = { Accept: 'application/json' };
    const queryParameters: Record<string, string> = {};

    if (
      personalizationStrategyObject === null ||
      personalizationStrategyObject === undefined
    ) {
      throw new Error(
        'Required parameter personalizationStrategyObject was null or undefined when calling setPersonalizationStrategy.'
      );
    }

    if (
      personalizationStrategyObject.eventScoring === null ||
      personalizationStrategyObject.eventScoring === undefined
    ) {
      throw new Error(
        'Required parameter personalizationStrategyObject.eventScoring was null or undefined when calling setPersonalizationStrategy.'
      );
    }
    if (
      personalizationStrategyObject.facetScoring === null ||
      personalizationStrategyObject.facetScoring === undefined
    ) {
      throw new Error(
        'Required parameter personalizationStrategyObject.facetScoring was null or undefined when calling setPersonalizationStrategy.'
      );
    }
    if (
      personalizationStrategyObject.personalizationImpact === null ||
      personalizationStrategyObject.personalizationImpact === undefined
    ) {
      throw new Error(
        'Required parameter personalizationStrategyObject.personalizationImpact was null or undefined when calling setPersonalizationStrategy.'
      );
    }

    const request: Request = {
      method: 'POST',
      path,
      data: personalizationStrategyObject,
    };

    const requestOptions: RequestOptions = {
      headers,
      queryParameters,
    };

    return this.sendRequest(request, requestOptions);
  }
}

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
