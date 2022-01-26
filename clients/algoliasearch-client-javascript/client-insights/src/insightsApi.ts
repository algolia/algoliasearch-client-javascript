import { Transporter } from '@algolia/client-common';
import type {
  Headers,
  Requester,
  Host,
  Request,
  RequestOptions,
} from '@algolia/client-common';

import type { InsightEvents } from '../model/insightEvents';
import type { PushEventsResponse } from '../model/pushEventsResponse';

export const version = '5.0.0';

export class InsightsApi {
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
    options?: { requester?: Requester; hosts?: Host[] }
  ) {
    this.setAuthentication({ appId, apiKey });

    this.transporter = new Transporter({
      hosts: options?.hosts ?? this.getDefaultHosts(),
      baseHeaders: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      userAgent: 'Algolia for Javascript (5.0.0)',
      timeouts: {
        connect: 2,
        read: 5,
        write: 30,
      },
      requester: options?.requester,
    });
  }

  getDefaultHosts(): Host[] {
    return [
      { url: 'insights.algolia.io', accept: 'readWrite', protocol: 'https' },
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
   * This command pushes an array of events.
   *
   * @summary Pushes an array of events.
   * @param insightEvents - The insightEvents object.
   */
  pushEvents(insightEvents: InsightEvents): Promise<PushEventsResponse> {
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

    const requestOptions: RequestOptions = {
      headers,
      queryParameters,
    };

    return this.sendRequest(request, requestOptions);
  }
}
