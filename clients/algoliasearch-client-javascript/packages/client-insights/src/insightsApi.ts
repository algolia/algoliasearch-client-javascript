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

import type { InsightEvents } from '../model/insightEvents';
import type { PushEventsResponse } from '../model/pushEventsResponse';

export const apiClientVersion = '5.0.0';

export type Region = 'de' | 'us';

function getDefaultHosts(region?: Region): Host[] {
  const regionHost = region ? `.${region}.` : '.';

  return [
    {
      url: `insights${regionHost}algolia.io`,
      accept: 'readWrite',
      protocol: 'https',
    },
  ];
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function createInsightsApi(
  options: CreateClientOptions & { region?: Region }
) {
  const auth = createAuth(options.appId, options.apiKey, options.authMode);
  const transporter = createTransporter({
    hosts: options?.hosts ?? getDefaultHosts(options.region),
    hostsCache: createMemoryCache(),
    baseHeaders: {
      'content-type': 'application/x-www-form-urlencoded',
      ...auth.headers(),
    },
    baseQueryParameters: auth.queryParameters(),
    userAgent: getUserAgent({
      userAgents: options.userAgents,
      client: 'Insights',
      version: apiClientVersion,
    }),
    timeouts: options.timeouts,
    requester: options.requester,
  });

  function addUserAgent(segment: string, version?: string): void {
    transporter.userAgent.add({ segment, version });
  }

  /**
   * This command pushes an array of events.
   *
   * @summary Pushes an array of events.
   * @param insightEvents - The insightEvents object.
   */
  function pushEvents(
    insightEvents: InsightEvents
  ): Promise<PushEventsResponse> {
    const path = '/1/events';
    const headers: Headers = { Accept: 'application/json' };
    const queryParameters: Record<string, string> = {};

    if (!insightEvents) {
      throw new Error(
        'Parameter `insightEvents` is required when calling `pushEvents`.'
      );
    }

    if (!insightEvents.events) {
      throw new Error(
        'Parameter `insightEvents.events` is required when calling `pushEvents`.'
      );
    }

    const request: Request = {
      method: 'POST',
      path,
      data: insightEvents,
    };

    return transporter.request(request, {
      queryParameters,
      headers,
    });
  }

  return { addUserAgent, pushEvents };
}

export type InsightsApi = ReturnType<typeof createInsightsApi>;
