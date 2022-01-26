import { Transporter } from '@algolia/client-common';
import type {
  Headers,
  Requester,
  Host,
  Request,
  RequestOptions,
} from '@algolia/client-common';

import type { LogFile } from '../model/logFile';
import type { QuerySuggestionsIndex } from '../model/querySuggestionsIndex';
import type { QuerySuggestionsIndexParam } from '../model/querySuggestionsIndexParam';
import type { QuerySuggestionsIndexWithIndexParam } from '../model/querySuggestionsIndexWithIndexParam';
import type { Status } from '../model/status';
import type { SucessResponse } from '../model/sucessResponse';

export const version = '5.0.0';

export class QuerySuggestionsApi {
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
    region: 'eu' | 'us',
    options?: { requester?: Requester; hosts?: Host[] }
  ) {
    if (!appId) {
      throw new Error('`appId` is missing.');
    }
    if (!apiKey) {
      throw new Error('`apiKey` is missing.');
    }
    if (!region) {
      throw new Error('`region` is missing.');
    }

    this.setAuthentication({ appId, apiKey });

    this.transporter = new Transporter({
      hosts: options?.hosts ?? this.getDefaultHosts(region),
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

  getDefaultHosts(region: 'eu' | 'us'): Host[] {
    return [
      {
        url: `query-suggestions.${region}.algolia.com`,
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
   * Create a configuration of a Query Suggestions index. There\'s a limit of 100 configurations per application.
   *
   * @summary Create a configuration of a Query Suggestions index.
   * @param querySuggestionsIndexWithIndexParam - The querySuggestionsIndexWithIndexParam object.
   */
  createConfig(
    querySuggestionsIndexWithIndexParam: QuerySuggestionsIndexWithIndexParam
  ): Promise<SucessResponse> {
    const path = '/1/configs';
    const headers: Headers = { Accept: 'application/json' };
    const queryParameters: Record<string, string> = {};

    if (!querySuggestionsIndexWithIndexParam) {
      throw new Error(
        'Parameter `querySuggestionsIndexWithIndexParam` is required when calling `createConfig`.'
      );
    }

    const request: Request = {
      method: 'POST',
      path,
      data: querySuggestionsIndexWithIndexParam,
    };

    const requestOptions: RequestOptions = {
      headers,
      queryParameters,
    };

    return this.sendRequest(request, requestOptions);
  }
  /**
   * Delete a configuration of a Query Suggestion\'s index. By deleting a configuraton, you stop all updates to the underlying query suggestion index. Note that when doing this, the underlying index does not change - existing suggestions remain untouched.
   *
   * @summary Delete a configuration of a Query Suggestion\'s index.
   * @param deleteConfig - The deleteConfig object.
   * @param deleteConfig.indexName - The index in which to perform the request.
   */
  deleteConfig({ indexName }: DeleteConfigProps): Promise<SucessResponse> {
    const path = '/1/configs/{indexName}'.replace(
      '{indexName}',
      encodeURIComponent(String(indexName))
    );
    const headers: Headers = { Accept: 'application/json' };
    const queryParameters: Record<string, string> = {};

    if (!indexName) {
      throw new Error(
        'Parameter `indexName` is required when calling `deleteConfig`.'
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
   * Get all the configurations of Query Suggestions. For each index, you get a block of JSON with a list of its configuration settings.
   *
   * @summary Get all the configurations of Query Suggestions.
   */
  getAllConfigs(): Promise<QuerySuggestionsIndex[]> {
    const path = '/1/configs';
    const headers: Headers = { Accept: 'application/json' };
    const queryParameters: Record<string, string> = {};

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
   * Get the configuration of a single Query Suggestions index.
   *
   * @summary Get the configuration of a single Query Suggestions index.
   * @param getConfig - The getConfig object.
   * @param getConfig.indexName - The index in which to perform the request.
   */
  getConfig({ indexName }: GetConfigProps): Promise<QuerySuggestionsIndex> {
    const path = '/1/configs/{indexName}'.replace(
      '{indexName}',
      encodeURIComponent(String(indexName))
    );
    const headers: Headers = { Accept: 'application/json' };
    const queryParameters: Record<string, string> = {};

    if (!indexName) {
      throw new Error(
        'Parameter `indexName` is required when calling `getConfig`.'
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
   * Get the status of a Query Suggestion\'s index. The status includes whether the Query Suggestions index is currently in the process of being built, and the last build time.
   *
   * @summary Get the status of a Query Suggestion\'s index.
   * @param getConfigStatus - The getConfigStatus object.
   * @param getConfigStatus.indexName - The index in which to perform the request.
   */
  getConfigStatus({ indexName }: GetConfigStatusProps): Promise<Status> {
    const path = '/1/configs/{indexName}/status'.replace(
      '{indexName}',
      encodeURIComponent(String(indexName))
    );
    const headers: Headers = { Accept: 'application/json' };
    const queryParameters: Record<string, string> = {};

    if (!indexName) {
      throw new Error(
        'Parameter `indexName` is required when calling `getConfigStatus`.'
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
   * Get the log file of the last build of a single Query Suggestion index.
   *
   * @summary Get the log file of the last build of a single Query Suggestion index.
   * @param getLogFile - The getLogFile object.
   * @param getLogFile.indexName - The index in which to perform the request.
   */
  getLogFile({ indexName }: GetLogFileProps): Promise<LogFile[]> {
    const path = '/1/logs/{indexName}'.replace(
      '{indexName}',
      encodeURIComponent(String(indexName))
    );
    const headers: Headers = { Accept: 'application/json' };
    const queryParameters: Record<string, string> = {};

    if (!indexName) {
      throw new Error(
        'Parameter `indexName` is required when calling `getLogFile`.'
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
   * Update the configuration of a Query Suggestions index.
   *
   * @summary Update the configuration of a Query Suggestions index.
   * @param updateConfig - The updateConfig object.
   * @param updateConfig.indexName - The index in which to perform the request.
   * @param updateConfig.querySuggestionsIndexParam - The querySuggestionsIndexParam object.
   */
  updateConfig({
    indexName,
    querySuggestionsIndexParam,
  }: UpdateConfigProps): Promise<SucessResponse> {
    const path = '/1/configs/{indexName}'.replace(
      '{indexName}',
      encodeURIComponent(String(indexName))
    );
    const headers: Headers = { Accept: 'application/json' };
    const queryParameters: Record<string, string> = {};

    if (!indexName) {
      throw new Error(
        'Parameter `indexName` is required when calling `updateConfig`.'
      );
    }

    if (!querySuggestionsIndexParam) {
      throw new Error(
        'Parameter `querySuggestionsIndexParam` is required when calling `updateConfig`.'
      );
    }

    if (!querySuggestionsIndexParam.sourceIndices) {
      throw new Error(
        'Parameter `querySuggestionsIndexParam.sourceIndices` is required when calling `updateConfig`.'
      );
    }

    const request: Request = {
      method: 'PUT',
      path,
      data: querySuggestionsIndexParam,
    };

    const requestOptions: RequestOptions = {
      headers,
      queryParameters,
    };

    return this.sendRequest(request, requestOptions);
  }
}

export type DeleteConfigProps = {
  /**
   * The index in which to perform the request.
   */
  indexName: string;
};

export type GetConfigProps = {
  /**
   * The index in which to perform the request.
   */
  indexName: string;
};

export type GetConfigStatusProps = {
  /**
   * The index in which to perform the request.
   */
  indexName: string;
};

export type GetLogFileProps = {
  /**
   * The index in which to perform the request.
   */
  indexName: string;
};

export type UpdateConfigProps = {
  /**
   * The index in which to perform the request.
   */
  indexName: string;
  querySuggestionsIndexParam: QuerySuggestionsIndexParam;
};
