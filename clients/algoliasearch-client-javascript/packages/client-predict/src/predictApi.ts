import {
  createAuth,
  createMemoryCache,
  createTransporter,
  getUserAgent,
} from '@algolia/client-common';
import type {
  CreateClientOptions,
  Headers,
  Host,
  Request,
} from '@algolia/client-common';

import type { FetchUserProfileResponse } from '../model/fetchUserProfileResponse';
import type { Params } from '../model/params';

export const apiClientVersion = '0.0.1';

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
    hostsCache: createMemoryCache(),
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

  /**
   * Get predictions, properties (raw, computed or custom) and segments (computed or custom) for a user profile.
   *
   * @summary Get user profile.
   * @param fetchUserProfile - The fetchUserProfile object.
   * @param fetchUserProfile.userID - User ID for authenticated users or cookie ID for non-authenticated repeated users (visitors).
   * @param fetchUserProfile.params - The params object.
   */
  function fetchUserProfile({
    userID,
    params,
  }: FetchUserProfileProps): Promise<FetchUserProfileResponse> {
    const path = '/1/users/{userID}/fetch'.replace(
      '{userID}',
      encodeURIComponent(String(userID))
    );
    const headers: Headers = { Accept: 'application/json' };
    const queryParameters: Record<string, string> = {};

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
      path,
      data: params,
    };

    return transporter.request(request, {
      queryParameters,
      headers,
    });
  }

  return { addUserAgent, fetchUserProfile };
}

export type PredictApi = ReturnType<typeof createPredictApi>;

export type FetchUserProfileProps = {
  /**
   * User ID for authenticated users or cookie ID for non-authenticated repeated users (visitors).
   */
  userID: string;
  params: Params;
};
