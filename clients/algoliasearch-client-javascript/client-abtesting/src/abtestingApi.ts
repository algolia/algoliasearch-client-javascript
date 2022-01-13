import type { ABTest } from '../model/aBTest';
import type { ABTestResponse } from '../model/aBTestResponse';
import type { AddABTestsRequest } from '../model/addABTestsRequest';
import type { ListABTestsResponse } from '../model/listABTestsResponse';
import { Transporter } from '../utils/Transporter';
import type { Requester } from '../utils/requester/Requester';
import type { Headers, Host, Request, RequestOptions } from '../utils/types';

export class AbtestingApi {
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
    region: 'de' | 'us',
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

  getDefaultHosts(region: 'de' | 'us' = 'us'): Host[] {
    return [
      {
        url: `analytics.${region}.algolia.com`,
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
   * Creates a new A/B test with provided configuration. You can set an A/B test on two different indices with different settings, or on the same index with different search parameters by providing a customSearchParameters setting on one of the variants.
   *
   * @summary Creates a new A/B test with provided configuration.
   * @param addABTestsRequest - The addABTestsRequest object.
   */
  addABTests(addABTestsRequest: AddABTestsRequest): Promise<ABTestResponse> {
    const path = '/2/abtests';
    const headers: Headers = { Accept: 'application/json' };
    const queryParameters: Record<string, string> = {};

    if (addABTestsRequest === null || addABTestsRequest === undefined) {
      throw new Error(
        'Required parameter addABTestsRequest was null or undefined when calling addABTests.'
      );
    }

    if (
      addABTestsRequest.name === null ||
      addABTestsRequest.name === undefined
    ) {
      throw new Error(
        'Required parameter addABTestsRequest.name was null or undefined when calling addABTests.'
      );
    }
    if (
      addABTestsRequest.variant === null ||
      addABTestsRequest.variant === undefined
    ) {
      throw new Error(
        'Required parameter addABTestsRequest.variant was null or undefined when calling addABTests.'
      );
    }
    if (
      addABTestsRequest.endAt === null ||
      addABTestsRequest.endAt === undefined
    ) {
      throw new Error(
        'Required parameter addABTestsRequest.endAt was null or undefined when calling addABTests.'
      );
    }

    const request: Request = {
      method: 'POST',
      path,
      data: addABTestsRequest,
    };

    const requestOptions: RequestOptions = {
      headers,
      queryParameters,
    };

    return this.sendRequest(request, requestOptions);
  }
  /**
   * Deletes the A/B Test and removes all associated metadata & metrics.
   *
   * @summary Deletes the A/B Test.
   * @param deleteABTest - The deleteABTest object.
   * @param deleteABTest.id - The A/B test ID.
   */
  deleteABTest({ id }: DeleteABTestProps): Promise<ABTestResponse> {
    const path = '/2/abtests/{id}'.replace(
      '{id}',
      encodeURIComponent(String(id))
    );
    const headers: Headers = { Accept: 'application/json' };
    const queryParameters: Record<string, string> = {};

    if (id === null || id === undefined) {
      throw new Error(
        'Required parameter id was null or undefined when calling deleteABTest.'
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
   * Returns metadata and metrics for A/B test id. Behaves in the same way as GET /2/abtests however the endpoint will return 403.
   *
   * @summary Returns metadata and metrics for A/B test id.
   * @param getABTest - The getABTest object.
   * @param getABTest.id - The A/B test ID.
   */
  getABTest({ id }: GetABTestProps): Promise<ABTest> {
    const path = '/2/abtests/{id}'.replace(
      '{id}',
      encodeURIComponent(String(id))
    );
    const headers: Headers = { Accept: 'application/json' };
    const queryParameters: Record<string, string> = {};

    if (id === null || id === undefined) {
      throw new Error(
        'Required parameter id was null or undefined when calling getABTest.'
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
   * Fetch all existing A/B tests for App that are available for the current API Key. Returns an array of metadata and metrics. When no data has been processed, the metrics will be returned as null.
   *
   * @summary Fetch all existing A/B tests for App that are available for the current API Key.
   * @param listABTests - The listABTests object.
   * @param listABTests.offset - Position of the starting record. Used for paging. 0 is the first record.
   * @param listABTests.limit - Number of records to return. Limit is the size of the page.
   */
  listABTests({
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

    const requestOptions: RequestOptions = {
      headers,
      queryParameters,
    };

    return this.sendRequest(request, requestOptions);
  }
  /**
   * Marks the A/B test as stopped. At this point, the test is over and cannot be restarted. As a result, your application is back to normal: index A will perform as usual, receiving 100% of all search requests. Associated metadata and metrics are still stored.
   *
   * @summary Marks the A/B test as stopped.
   * @param stopABTest - The stopABTest object.
   * @param stopABTest.id - The A/B test ID.
   */
  stopABTest({ id }: StopABTestProps): Promise<ABTestResponse> {
    const path = '/2/abtests/{id}/stop'.replace(
      '{id}',
      encodeURIComponent(String(id))
    );
    const headers: Headers = { Accept: 'application/json' };
    const queryParameters: Record<string, string> = {};

    if (id === null || id === undefined) {
      throw new Error(
        'Required parameter id was null or undefined when calling stopABTest.'
      );
    }

    const request: Request = {
      method: 'POST',
      path,
    };

    const requestOptions: RequestOptions = {
      headers,
      queryParameters,
    };

    return this.sendRequest(request, requestOptions);
  }
}

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
