import { Transporter, createAuth, getUserAgent } from '@algolia/client-common';
import type {
  CreateClientOptions,
  Headers,
  Host,
  Request,
} from '@algolia/client-common';

import type { ABTest } from '../model/aBTest';
import type { ABTestResponse } from '../model/aBTestResponse';
import type { AddABTestsRequest } from '../model/addABTestsRequest';
import type { ListABTestsResponse } from '../model/listABTestsResponse';

export const version = '5.0.0';

export type Region = 'de' | 'us';

function getDefaultHosts(region?: Region): Host[] {
  const regionHost = region ? `.${region}.` : '.';

  return [
    {
      url: `analytics${regionHost}algolia.com`,
      accept: 'readWrite',
      protocol: 'https',
    },
  ];
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const createAbtestingApi = (
  options: CreateClientOptions & { region?: Region }
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
      client: 'Abtesting',
      version,
    }),
    timeouts: options.timeouts,
    requester: options.requester,
  });

  /**
   * Creates a new A/B test with provided configuration. You can set an A/B test on two different indices with different settings, or on the same index with different search parameters by providing a customSearchParameters setting on one of the variants.
   *
   * @summary Creates a new A/B test with provided configuration.
   * @param addABTestsRequest - The addABTestsRequest object.
   */
  function addABTests(
    addABTestsRequest: AddABTestsRequest
  ): Promise<ABTestResponse> {
    const path = '/2/abtests';
    const headers: Headers = { Accept: 'application/json' };
    const queryParameters: Record<string, string> = {};

    if (!addABTestsRequest) {
      throw new Error(
        'Parameter `addABTestsRequest` is required when calling `addABTests`.'
      );
    }

    if (!addABTestsRequest.name) {
      throw new Error(
        'Parameter `addABTestsRequest.name` is required when calling `addABTests`.'
      );
    }
    if (!addABTestsRequest.variant) {
      throw new Error(
        'Parameter `addABTestsRequest.variant` is required when calling `addABTests`.'
      );
    }
    if (!addABTestsRequest.endAt) {
      throw new Error(
        'Parameter `addABTestsRequest.endAt` is required when calling `addABTests`.'
      );
    }

    const request: Request = {
      method: 'POST',
      path,
      data: addABTestsRequest,
    };

    return transporter.request(request, {
      queryParameters,
      headers,
    });
  }

  /**
   * Deletes the A/B Test and removes all associated metadata & metrics.
   *
   * @summary Deletes the A/B Test.
   * @param deleteABTest - The deleteABTest object.
   * @param deleteABTest.id - The A/B test ID.
   */
  function deleteABTest({ id }: DeleteABTestProps): Promise<ABTestResponse> {
    const path = '/2/abtests/{id}'.replace(
      '{id}',
      encodeURIComponent(String(id))
    );
    const headers: Headers = { Accept: 'application/json' };
    const queryParameters: Record<string, string> = {};

    if (!id) {
      throw new Error(
        'Parameter `id` is required when calling `deleteABTest`.'
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
   * Returns metadata and metrics for A/B test id. Behaves in the same way as GET /2/abtests however the endpoint will return 403.
   *
   * @summary Returns metadata and metrics for A/B test id.
   * @param getABTest - The getABTest object.
   * @param getABTest.id - The A/B test ID.
   */
  function getABTest({ id }: GetABTestProps): Promise<ABTest> {
    const path = '/2/abtests/{id}'.replace(
      '{id}',
      encodeURIComponent(String(id))
    );
    const headers: Headers = { Accept: 'application/json' };
    const queryParameters: Record<string, string> = {};

    if (!id) {
      throw new Error('Parameter `id` is required when calling `getABTest`.');
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
   * Fetch all existing A/B tests for App that are available for the current API Key. Returns an array of metadata and metrics. When no data has been processed, the metrics will be returned as null.
   *
   * @summary Fetch all existing A/B tests for App that are available for the current API Key.
   * @param listABTests - The listABTests object.
   * @param listABTests.offset - Position of the starting record. Used for paging. 0 is the first record.
   * @param listABTests.limit - Number of records to return. Limit is the size of the page.
   */
  function listABTests({
    offset,
    limit,
  }: ListABTestsProps): Promise<ListABTestsResponse> {
    const path = '/2/abtests';
    const headers: Headers = { Accept: 'application/json' };
    const queryParameters: Record<string, string> = {};

    if (offset !== undefined) {
      queryParameters.offset = offset.toString();
    }

    if (limit !== undefined) {
      queryParameters.limit = limit.toString();
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
   * Marks the A/B test as stopped. At this point, the test is over and cannot be restarted. As a result, your application is back to normal: index A will perform as usual, receiving 100% of all search requests. Associated metadata and metrics are still stored.
   *
   * @summary Marks the A/B test as stopped.
   * @param stopABTest - The stopABTest object.
   * @param stopABTest.id - The A/B test ID.
   */
  function stopABTest({ id }: StopABTestProps): Promise<ABTestResponse> {
    const path = '/2/abtests/{id}/stop'.replace(
      '{id}',
      encodeURIComponent(String(id))
    );
    const headers: Headers = { Accept: 'application/json' };
    const queryParameters: Record<string, string> = {};

    if (!id) {
      throw new Error('Parameter `id` is required when calling `stopABTest`.');
    }

    const request: Request = {
      method: 'POST',
      path,
    };

    return transporter.request(request, {
      queryParameters,
      headers,
    });
  }

  return { addABTests, deleteABTest, getABTest, listABTests, stopABTest };
};

export type AbtestingApi = ReturnType<typeof createAbtestingApi>;

export type DeleteABTestProps = {
  /**
   * The A/B test ID.
   */
  id: number;
};

export type GetABTestProps = {
  /**
   * The A/B test ID.
   */
  id: number;
};

export type ListABTestsProps = {
  /**
   * Position of the starting record. Used for paging. 0 is the first record.
   */
  offset?: number;
  /**
   * Number of records to return. Limit is the size of the page.
   */
  limit?: number;
};

export type StopABTestProps = {
  /**
   * The A/B test ID.
   */
  id: number;
};
