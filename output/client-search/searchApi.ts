import http from 'http';
import { shuffle } from '../complement/helpers';
import { Transporter } from '../complement/Transporter';
import { Headers, Host, Request, RequestOptions } from '../complement/types';

import { BatchObject } from '../model/batchObject';
import { BatchResponse } from '../model/batchResponse';
import { MultipleQueriesObject } from '../model/multipleQueriesObject';
import { MultipleQueriesResponse } from '../model/multipleQueriesResponse';
import { SaveObjectResponse } from '../model/saveObjectResponse';

import { ObjectSerializer, Authentication, VoidAuth, Interceptor } from '../model/models';
import { HttpBasicAuth, HttpBearerAuth, ApiKeyAuth, OAuth } from '../model/models';

import { HttpError, RequestFile } from './apis';

export enum SearchApiApiKeys {
  apiKey,
  appId,
}

export class SearchApi {
  private transporter: Transporter;

  protected authentications = {
    default: <Authentication>new VoidAuth(),
    apiKey: new ApiKeyAuth('header', 'X-Algolia-API-Key'),
    appId: new ApiKeyAuth('header', 'X-Algolia-Application-Id'),
  };

  protected interceptors: Interceptor[] = [];

  constructor(appId: string, apiKey: string) {
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
    });
  }

  public setDefaultAuthentication(auth: Authentication) {
    this.authentications.default = auth;
  }

  public setApiKey(key: SearchApiApiKeys, value: string) {
    (this.authentications as any)[SearchApiApiKeys[key]].apiKey = value;
  }

  public addInterceptor(interceptor: Interceptor) {
    this.interceptors.push(interceptor);
  }

  /**
   *
   * @summary Performs multiple write operations in a single API call
   * @param indexName The index in which to perform the request
   * @param batchObject
   */
  public async batch(
    indexName: string,
    batchObject: BatchObject,
    options: { headers: { [name: string]: string } } = { headers: {} }
  ): Promise<{ response: http.IncomingMessage; body: BatchResponse }> {
    const path = '/1/indexes/{indexName}/batch'.replace(
      '{' + 'indexName' + '}',
      encodeURIComponent(String(indexName))
    );
    let headers: Headers = {};
    let queryParams: Record<string, string> = {};
    const produces = ['application/json'];
    // give precedence to 'application/json'
    if (produces.indexOf('application/json') >= 0) {
      headers.Accept = 'application/json';
    } else {
      headers.Accept = produces.join(',');
    }
    let formParams: Record<string, string> = {};

    // verify required parameter 'indexName' is not null or undefined
    if (indexName === null || indexName === undefined) {
      throw new Error('Required parameter indexName was null or undefined when calling batch.');
    }

    // verify required parameter 'batchObject' is not null or undefined
    if (batchObject === null || batchObject === undefined) {
      throw new Error('Required parameter batchObject was null or undefined when calling batch.');
    }

    headers = { ...headers, ...options.headers };

    const request: Request = {
      method: 'POST',
      url: path,
      headers,
      data: ObjectSerializer.serialize(batchObject, 'BatchObject'),
    };

    const requestOptions: RequestOptions = {};

    let authenticationPromise = Promise.resolve();
    if (this.authentications.apiKey.apiKey) {
      authenticationPromise = authenticationPromise.then(() =>
        this.authentications.apiKey.applyToRequest(requestOptions)
      );
    }
    if (this.authentications.appId.apiKey) {
      authenticationPromise = authenticationPromise.then(() =>
        this.authentications.appId.applyToRequest(requestOptions)
      );
    }
    authenticationPromise = authenticationPromise.then(() =>
      this.authentications.default.applyToRequest(requestOptions)
    );

    let interceptorPromise = authenticationPromise;
    for (const interceptor of this.interceptors) {
      interceptorPromise = interceptorPromise.then(() => interceptor(requestOptions));
    }

    await interceptorPromise;

    return transporter.retryableRequest(request, requestOptions);
  }
  /**
   *
   * @summary Get search results for the given requests.
   * @param multipleQueriesObject
   */
  public async multipleQueries(
    multipleQueriesObject: MultipleQueriesObject,
    options: { headers: { [name: string]: string } } = { headers: {} }
  ): Promise<{ response: http.IncomingMessage; body: MultipleQueriesResponse }> {
    const path = '/1/indexes/*/queries';
    let headers: Headers = {};
    let queryParams: Record<string, string> = {};
    const produces = ['application/json'];
    // give precedence to 'application/json'
    if (produces.indexOf('application/json') >= 0) {
      headers.Accept = 'application/json';
    } else {
      headers.Accept = produces.join(',');
    }
    let formParams: Record<string, string> = {};

    // verify required parameter 'multipleQueriesObject' is not null or undefined
    if (multipleQueriesObject === null || multipleQueriesObject === undefined) {
      throw new Error(
        'Required parameter multipleQueriesObject was null or undefined when calling multipleQueries.'
      );
    }

    headers = { ...headers, ...options.headers };

    const request: Request = {
      method: 'POST',
      url: path,
      headers,
      data: ObjectSerializer.serialize(multipleQueriesObject, 'MultipleQueriesObject'),
    };

    const requestOptions: RequestOptions = {};

    let authenticationPromise = Promise.resolve();
    if (this.authentications.apiKey.apiKey) {
      authenticationPromise = authenticationPromise.then(() =>
        this.authentications.apiKey.applyToRequest(requestOptions)
      );
    }
    if (this.authentications.appId.apiKey) {
      authenticationPromise = authenticationPromise.then(() =>
        this.authentications.appId.applyToRequest(requestOptions)
      );
    }
    authenticationPromise = authenticationPromise.then(() =>
      this.authentications.default.applyToRequest(requestOptions)
    );

    let interceptorPromise = authenticationPromise;
    for (const interceptor of this.interceptors) {
      interceptorPromise = interceptorPromise.then(() => interceptor(requestOptions));
    }

    await interceptorPromise;

    return transporter.retryableRequest(request, requestOptions);
  }
  /**
   * Add an object to the index, automatically assigning it an object ID
   * @summary Save object
   * @param indexName The index in which to perform the request
   * @param requestBody
   */
  public async saveObject(
    indexName: string,
    requestBody: { [key: string]: object },
    options: { headers: { [name: string]: string } } = { headers: {} }
  ): Promise<{ response: http.IncomingMessage; body: SaveObjectResponse }> {
    const path = '/1/indexes/{indexName}'.replace(
      '{' + 'indexName' + '}',
      encodeURIComponent(String(indexName))
    );
    let headers: Headers = {};
    let queryParams: Record<string, string> = {};
    const produces = ['application/json'];
    // give precedence to 'application/json'
    if (produces.indexOf('application/json') >= 0) {
      headers.Accept = 'application/json';
    } else {
      headers.Accept = produces.join(',');
    }
    let formParams: Record<string, string> = {};

    // verify required parameter 'indexName' is not null or undefined
    if (indexName === null || indexName === undefined) {
      throw new Error(
        'Required parameter indexName was null or undefined when calling saveObject.'
      );
    }

    // verify required parameter 'requestBody' is not null or undefined
    if (requestBody === null || requestBody === undefined) {
      throw new Error(
        'Required parameter requestBody was null or undefined when calling saveObject.'
      );
    }

    headers = { ...headers, ...options.headers };

    const request: Request = {
      method: 'POST',
      url: path,
      headers,
      data: ObjectSerializer.serialize(requestBody, '{ [key: string]: object; }'),
    };

    const requestOptions: RequestOptions = {};

    let authenticationPromise = Promise.resolve();
    if (this.authentications.apiKey.apiKey) {
      authenticationPromise = authenticationPromise.then(() =>
        this.authentications.apiKey.applyToRequest(requestOptions)
      );
    }
    if (this.authentications.appId.apiKey) {
      authenticationPromise = authenticationPromise.then(() =>
        this.authentications.appId.applyToRequest(requestOptions)
      );
    }
    authenticationPromise = authenticationPromise.then(() =>
      this.authentications.default.applyToRequest(requestOptions)
    );

    let interceptorPromise = authenticationPromise;
    for (const interceptor of this.interceptors) {
      interceptorPromise = interceptorPromise.then(() => interceptor(requestOptions));
    }

    await interceptorPromise;

    return transporter.retryableRequest(request, requestOptions);
  }
}
