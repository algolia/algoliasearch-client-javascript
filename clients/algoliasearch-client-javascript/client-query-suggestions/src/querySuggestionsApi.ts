import type { LogFile } from '../model/logFile';
import { ApiKeyAuth } from '../model/models';
import type { QuerySuggestionsIndex } from '../model/querySuggestionsIndex';
import type { QuerySuggestionsIndexParam } from '../model/querySuggestionsIndexParam';
import type { QuerySuggestionsIndexWithIndexParam } from '../model/querySuggestionsIndexWithIndexParam';
import type { Status } from '../model/status';
import type { SucessResponse } from '../model/sucessResponse';
import { Transporter } from '../utils/Transporter';
import type { Requester } from '../utils/requester/Requester';
import type { Headers, Host, Request, RequestOptions } from '../utils/types';

export enum QuerySuggestionsApiKeys {
  apiKey,
  appId,
}

export class QuerySuggestionsApi {
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
    region: 'eu' | 'us',
    options?: { requester?: Requester; hosts?: Host[] }
  ) {
    this.setApiKey(QuerySuggestionsApiKeys.appId, appId);
    this.setApiKey(QuerySuggestionsApiKeys.apiKey, apiKey);

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

  getDefaultHosts(region: 'eu' | 'us' = 'us'): Host[] {
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

  setApiKey(key: QuerySuggestionsApiKeys, value: string): void {
    this.authentications[QuerySuggestionsApiKeys[key]].apiKey = value;
  }

  /**
   * Create a configuration of a Query Suggestions index. There\'s a limit of 100 configurations per application.
   *
   * @param querySuggestionsIndexWithIndexParam - The querySuggestionsIndexWithIndexParam object.
   */
  createConfig(
    querySuggestionsIndexWithIndexParam: QuerySuggestionsIndexWithIndexParam
  ): Promise<SucessResponse> {
    const path = '/1/configs';
    const headers: Headers = { Accept: 'application/json' };
    const queryParameters: Record<string, string> = {};

    if (
      querySuggestionsIndexWithIndexParam === null ||
      querySuggestionsIndexWithIndexParam === undefined
    ) {
      throw new Error(
        'Required parameter querySuggestionsIndexWithIndexParam was null or undefined when calling createConfig.'
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

    if (indexName === null || indexName === undefined) {
      throw new Error(
        'Required parameter indexName was null or undefined when calling deleteConfig.'
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

    if (indexName === null || indexName === undefined) {
      throw new Error(
        'Required parameter indexName was null or undefined when calling getConfig.'
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

    if (indexName === null || indexName === undefined) {
      throw new Error(
        'Required parameter indexName was null or undefined when calling getConfigStatus.'
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

    if (indexName === null || indexName === undefined) {
      throw new Error(
        'Required parameter indexName was null or undefined when calling getLogFile.'
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

    if (indexName === null || indexName === undefined) {
      throw new Error(
        'Required parameter indexName was null or undefined when calling updateConfig.'
      );
    }

    if (
      querySuggestionsIndexParam === null ||
      querySuggestionsIndexParam === undefined
    ) {
      throw new Error(
        'Required parameter querySuggestionsIndexParam was null or undefined when calling updateConfig.'
      );
    }

    if (
      querySuggestionsIndexParam.sourceIndices === null ||
      querySuggestionsIndexParam.sourceIndices === undefined
    ) {
      throw new Error(
        'Required parameter querySuggestionsIndexParam.sourceIndices was null or undefined when calling updateConfig.'
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
