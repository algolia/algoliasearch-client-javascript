import { shuffle } from '../utils/helpers';
import { Transporter } from '../utils/Transporter';
import { Headers, Host, Request, RequestOptions } from '../utils/types';
import { Requester } from '../utils/Requester';

import { BatchObject } from '../model/batchObject';
import { BatchResponse } from '../model/batchResponse';
import { ErrorBase } from '../model/errorBase';
import { MultipleQueriesObject } from '../model/multipleQueriesObject';
import { MultipleQueriesResponse } from '../model/multipleQueriesResponse';
import { SaveObjectResponse } from '../model/saveObjectResponse';
import { SearchParams } from '../model/searchParams';
import { SearchParamsString } from '../model/searchParamsString';
import { SearchResponse } from '../model/searchResponse';
import { ApiKeyAuth } from '../model/models';

export enum SearchApiApiKeys {
  apiKey,
  appId,
}

export class SearchApi {
  private transporter: Transporter;

  protected authentications = {
    apiKey: new ApiKeyAuth('header', 'X-Algolia-API-Key'),
    appId: new ApiKeyAuth('header', 'X-Algolia-Application-Id'),
  };

  constructor(appId: string, apiKey: string, requester?: Requester) {
    this.setApiKey(SearchApiApiKeys.appId, appId);
    this.setApiKey(SearchApiApiKeys.apiKey, apiKey);
    this.transporter = new Transporter({
      hosts: (
        [
          { url: `${appId}-dsn.algolia.net`, accept: 'read', protocol: 'https' },
          { url: `${appId}.algolia.net`, accept: 'write', protocol: 'https' },
        ] as Host[]
      ).concat(
        shuffle([
          { url: `${appId}-1.algolianet.com`, accept: 'readWrite', protocol: 'https' },
          { url: `${appId}-2.algolianet.com`, accept: 'readWrite', protocol: 'https' },
          { url: `${appId}-3.algolianet.com`, accept: 'readWrite', protocol: 'https' },
        ])
      ),
      baseHeaders: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      userAgent: 'Algolia for Javascript',
      timeouts: {
        connect: 2,
        read: 5,
        write: 30,
      },
      requester,
    });
  }

  public setApiKey(key: SearchApiApiKeys, value: string) {
    this.authentications[SearchApiApiKeys[key]].apiKey = value;
  }

  private async sendRequest<TResponse>(
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

  /**
   *
   * @summary Performs multiple write operations in a single API call
   * @param indexName The index in which to perform the request
   * @param batchObject
   */
  public async batch(indexName: string, batchObject: BatchObject): Promise<BatchResponse> {
    const path = '/1/indexes/{indexName}/batch'.replace(
      '{' + 'indexName' + '}',
      encodeURIComponent(String(indexName))
    );
    let headers: Headers = { Accept: 'application/json' };
    let queryParameters: Record<string, string> = {};

    if (indexName === null || indexName === undefined) {
      throw new Error('Required parameter indexName was null or undefined when calling batch.');
    }

    if (batchObject === null || batchObject === undefined) {
      throw new Error('Required parameter batchObject was null or undefined when calling batch.');
    }

    const request: Request = {
      method: 'POST',
      path,
      data: batchObject,
    };

    const requestOptions: RequestOptions = {
      headers,
      queryParameters,
    };

    return this.sendRequest(request, requestOptions);
  }
  /**
   *
   * @summary Get search results for the given requests.
   * @param multipleQueriesObject
   */
  public async multipleQueries(
    multipleQueriesObject: MultipleQueriesObject
  ): Promise<MultipleQueriesResponse> {
    const path = '/1/indexes/*/queries';
    let headers: Headers = { Accept: 'application/json' };
    let queryParameters: Record<string, string> = {};

    if (multipleQueriesObject === null || multipleQueriesObject === undefined) {
      throw new Error(
        'Required parameter multipleQueriesObject was null or undefined when calling multipleQueries.'
      );
    }

    const request: Request = {
      method: 'POST',
      path,
      data: multipleQueriesObject,
    };

    const requestOptions: RequestOptions = {
      headers,
      queryParameters,
    };

    return this.sendRequest(request, requestOptions);
  }
  /**
   * Add an object to the index, automatically assigning it an object ID
   * @summary Save object
   * @param indexName The index in which to perform the request
   * @param requestBody
   */
  public async saveObject(
    indexName: string,
    requestBody: { [key: string]: object }
  ): Promise<SaveObjectResponse> {
    const path = '/1/indexes/{indexName}'.replace(
      '{' + 'indexName' + '}',
      encodeURIComponent(String(indexName))
    );
    let headers: Headers = { Accept: 'application/json' };
    let queryParameters: Record<string, string> = {};

    if (indexName === null || indexName === undefined) {
      throw new Error(
        'Required parameter indexName was null or undefined when calling saveObject.'
      );
    }

    if (requestBody === null || requestBody === undefined) {
      throw new Error(
        'Required parameter requestBody was null or undefined when calling saveObject.'
      );
    }

    const request: Request = {
      method: 'POST',
      path,
      data: requestBody,
    };

    const requestOptions: RequestOptions = {
      headers,
      queryParameters,
    };

    return this.sendRequest(request, requestOptions);
  }
  /**
   *
   * @summary Get search results
   * @param indexName The index in which to perform the request
   * @param searchParamsSearchParamsString
   */
  public async search(
    indexName: string,
    searchParamsSearchParamsString: SearchParams | SearchParamsString
  ): Promise<SearchResponse> {
    const path = '/1/indexes/{indexName}/query'.replace(
      '{' + 'indexName' + '}',
      encodeURIComponent(String(indexName))
    );
    let headers: Headers = { Accept: 'application/json' };
    let queryParameters: Record<string, string> = {};

    if (indexName === null || indexName === undefined) {
      throw new Error('Required parameter indexName was null or undefined when calling search.');
    }

    if (searchParamsSearchParamsString === null || searchParamsSearchParamsString === undefined) {
      throw new Error(
        'Required parameter searchParamsSearchParamsString was null or undefined when calling search.'
      );
    }

    const request: Request = {
      method: 'POST',
      path,
      data: searchParamsSearchParamsString,
    };

    const requestOptions: RequestOptions = {
      headers,
      queryParameters,
    };

    return this.sendRequest(request, requestOptions);
  }
}
