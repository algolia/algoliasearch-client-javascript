import {
  shuffle,
  Transporter,
  createAuth,
  getUserAgent,
} from '@algolia/client-common';
import type {
  CreateClientOptions,
  Headers,
  Host,
  Request,
} from '@algolia/client-common';

import type { GetRecommendationsParams } from '../model/getRecommendationsParams';
import type { GetRecommendationsResponse } from '../model/getRecommendationsResponse';

export const version = '5.0.0';

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
export const createRecommendApi = (options: CreateClientOptions) => {
  const auth = createAuth(options.appId, options.apiKey, options.authMode);
  const transporter = new Transporter({
    hosts: options?.hosts ?? getDefaultHosts(options.appId),
    baseHeaders: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    userAgent: getUserAgent({
      userAgents: options.userAgents,
      client: 'Recommend',
      version,
    }),
    timeouts: options.timeouts,
    requester: options.requester,
  });

  /**
   * Returns recommendations for a specific model and objectID.
   *
   * @summary Returns recommendations for a specific model and objectID.
   * @param getRecommendationsParams - The getRecommendationsParams object.
   */
  function getRecommendations(
    getRecommendationsParams: GetRecommendationsParams
  ): Promise<GetRecommendationsResponse> {
    const path = '/1/indexes/*/recommendations';
    const headers: Headers = { Accept: 'application/json' };
    const queryParameters: Record<string, string> = {};

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
      path,
      data: getRecommendationsParams,
    };

    return transporter.request(request, {
      queryParameters,
      headers: {
        ...headers,
        ...auth.headers(),
      },
    });
  }

  return { getRecommendations };
};

export type RecommendApi = ReturnType<typeof createRecommendApi>;
