import type { InsightEvents } from '../model/insightEvents';
import { ApiKeyAuth } from '../model/models';
import type { PushEventsResponse } from '../model/pushEventsResponse';
import { Transporter } from '../utils/Transporter';
import type { Requester } from '../utils/requester/Requester';
import type { Headers, Host, Request, RequestOptions } from '../utils/types';

export enum InsightsApiKeys {
  apiKey,
  appId,
}

export class InsightsApi {
  protected authentications = {
    apiKey: new ApiKeyAuth('header', 'X-Algolia-API-Key'),
    appId: new ApiKeyAuth('header', 'X-Algolia-Application-Id'),
  };

  private transporter: Transporter;

  private sendRequest<TResponse>(
    request: Request,
    requestOptions: RequestOptions
  ): Promise<TResponse> {
    if (this.authentications.apiKey.apiKey) {
      this.authentications.apiKey.applyToRequest(requestOptions);
    }

    if (this.authentications.appId.apiKey) {
      this.authentications.appId.applyToRequest(requestOptions);
    }

    return this.transporter.request(request, requestOptions);
  }

  constructor(
    appId: string,
    apiKey: string,
    options?: { requester?: Requester; hosts?: Host[] }
  ) {
    this.setApiKey(InsightsApiKeys.appId, appId);
    this.setApiKey(InsightsApiKeys.apiKey, apiKey);

    this.transporter = new Transporter({
      hosts: options?.hosts ?? this.getDefaultHosts(),
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

  getDefaultHosts(): Host[] {
    return [
      { url: `insights.algolia.io`, accept: 'readWrite', protocol: 'https' },
    ];
  }

  setRequest(requester: Requester): void {
    this.transporter.setRequester(requester);
  }

  setHosts(hosts: Host[]): void {
    this.transporter.setHosts(hosts);
  }

  setApiKey(key: InsightsApiKeys, value: string): void {
    this.authentications[InsightsApiKeys[key]].apiKey = value;
  }

  /**
   * This command pushes an array of events.
   *
   * @summary Pushes an array of events.
   * @param pushEvents - The pushEvents parameters.
   * @param pushEvents.insightEvents - The insightEvents.
   */
  pushEvents({ insightEvents }: PushEventsProps): Promise<PushEventsResponse> {
    const path = '/1/events';
    const headers: Headers = { Accept: 'application/json' };
    const queryParameters: Record<string, string> = {};

    if (insightEvents === null || insightEvents === undefined) {
      throw new Error(
        'Required parameter insightEvents was null or undefined when calling pushEvents.'
      );
    }

    if (insightEvents.events === null || insightEvents.events === undefined) {
      throw new Error(
        'Required parameter insightEvents.events was null or undefined when calling pushEvents.'
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

export type PushEventsProps = {
  insightEvents: InsightEvents;
};
