import type { GetRecommendations } from '../model/getRecommendations';
import type { GetRecommendationsResponse } from '../model/getRecommendationsResponse';
import { ApiKeyAuth } from '../model/models';
import { Transporter } from '../utils/Transporter';
import { shuffle } from '../utils/helpers';
import type { Requester } from '../utils/requester/Requester';
import type { Headers, Host, Request, RequestOptions } from '../utils/types';

export enum RecommendApiKeys {
  apiKey,
  appId,
}

export class RecommendApi {
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
    this.setApiKey(RecommendApiKeys.appId, appId);
    this.setApiKey(RecommendApiKeys.apiKey, apiKey);
    this.transporter = new Transporter({
      hosts: options?.hosts ?? this.getDefaultHosts(appId),
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

  getDefaultHosts(appId: string): Host[] {
    return (
      [
        { url: `${appId}-dsn.algolia.net`, accept: 'read', protocol: 'https' },
        { url: `${appId}.algolia.net`, accept: 'write', protocol: 'https' },
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

  setRequest(requester: Requester): void {
    this.transporter.setRequester(requester);
  }

  setHosts(hosts: Host[]): void {
    this.transporter.setHosts(hosts);
  }

  setApiKey(key: RecommendApiKeys, value: string): void {
    this.authentications[RecommendApiKeys[key]].apiKey = value;
  }

  /**
   * Returns recommendations for a specific model and objectID.
   *
   * @param getRecommendations - The getRecommendations.
   */
  getRecommendations(
    getRecommendations: GetRecommendations
  ): Promise<GetRecommendationsResponse> {
    const path = '/1/indexes/*/recommendations';
    const headers: Headers = { Accept: 'application/json' };
    const queryParameters: Record<string, string> = {};

    if (getRecommendations === null || getRecommendations === undefined) {
      throw new Error(
        'Required parameter getRecommendations was null or undefined when calling getRecommendations.'
      );
    }

    const request: Request = {
      method: 'POST',
      path,
      data: getRecommendations,
    };

    const requestOptions: RequestOptions = {
      headers,
      queryParameters,
    };

    return this.sendRequest(request, requestOptions);
  }
}
