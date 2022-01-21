import { Transporter } from '@algolia/client-common';
import type {
  Headers,
  Requester,
  Host,
  Request,
  RequestOptions,
} from '@algolia/client-common';

import type { PostIngestUrlResponse } from '../model/postIngestUrlResponse';
import type { PostURLJob } from '../model/postURLJob';

export class SourcesApi {
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
        url: `data.${region}.algolia.com`,
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
   * Add an ingestion job that will fetch data from an URL.
   *
   * @summary Create a new ingestion job via URL.
   * @param postURLJob - The postURLJob object.
   */
  postIngestUrl(postURLJob: PostURLJob): Promise<PostIngestUrlResponse> {
    const path = '/1/ingest/url';
    const headers: Headers = { Accept: 'application/json' };
    const queryParameters: Record<string, string> = {};

    if (!postURLJob) {
      throw new Error(
        'Parameter `postURLJob` is required when calling `postIngestUrl`.'
      );
    }

    if (!postURLJob.type) {
      throw new Error(
        'Parameter `postURLJob.type` is required when calling `postIngestUrl`.'
      );
    }
    if (!postURLJob.input) {
      throw new Error(
        'Parameter `postURLJob.input` is required when calling `postIngestUrl`.'
      );
    }

    const request: Request = {
      method: 'POST',
      path,
      data: postURLJob,
    };

    const requestOptions: RequestOptions = {
      headers,
      queryParameters,
    };

    return this.sendRequest(request, requestOptions);
  }
}
