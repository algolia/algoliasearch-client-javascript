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

import type { InsightEvents } from '../model/insightEvents';
import type { PushEventsResponse } from '../model/pushEventsResponse';

export * from '../model/models';
export const apiClientVersion = '0.0.6';

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
      client: 'Insights',
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
     * This command pushes an array of events.
     *
     * @summary Pushes an array of events.
     * @param insightEvents - The insightEvents object.
     */
    pushEvents(
      insightEvents: InsightEvents,
      requestOptions?: RequestOptions
    ): Promise<PushEventsResponse> {
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

      const requestPath = '/1/events';
      const headers: Headers = {};
      const queryParameters: QueryParameters = {};

      const request: Request = {
        method: 'POST',
        path: requestPath,
        data: insightEvents,
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
  };
}

export type InsightsApi = ReturnType<typeof createInsightsApi>;

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
