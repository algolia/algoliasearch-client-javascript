import {
  createAuth,
  createMemoryCache,
  createTransporter,
  getUserAgent,
} from '@experimental-api-clients-automation/client-common';
import type {
  CreateClientOptions,
  Headers,
  Host,
  Request,
} from '@experimental-api-clients-automation/client-common';

import type { LogFile } from '../model/logFile';
import type { QuerySuggestionsIndex } from '../model/querySuggestionsIndex';
import type { QuerySuggestionsIndexParam } from '../model/querySuggestionsIndexParam';
import type { QuerySuggestionsIndexWithIndexParam } from '../model/querySuggestionsIndexWithIndexParam';
import type { Status } from '../model/status';
import type { SucessResponse } from '../model/sucessResponse';

export * from '../model/models';
export const apiClientVersion = '0.0.4';

export type Region = 'eu' | 'us';

function getDefaultHosts(region: Region): Host[] {
  return [
    {
      url: `query-suggestions.${region}.algolia.com`,
      accept: 'readWrite',
      protocol: 'https',
    },
  ];
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function createQuerySuggestionsApi(
  options: CreateClientOptions & { region: Region }
) {
  const auth = createAuth(options.appId, options.apiKey, options.authMode);
  const transporter = createTransporter({
    hosts: options?.hosts ?? getDefaultHosts(options.region),
    hostsCache: createMemoryCache(),
    baseHeaders: {
      'content-type': 'application/x-www-form-urlencoded',
      ...auth.headers(),
    },
    baseQueryParameters: auth.queryParameters(),
    userAgent: getUserAgent({
      userAgents: options.userAgents,
      client: 'QuerySuggestions',
      version: apiClientVersion,
    }),
    timeouts: options.timeouts,
    requester: options.requester,
  });

  function addUserAgent(segment: string, version?: string): void {
    transporter.userAgent.add({ segment, version });
  }

  /**
   * Create a configuration of a Query Suggestions index. There\'s a limit of 100 configurations per application.
   *
   * @summary Create a configuration of a Query Suggestions index.
   * @param querySuggestionsIndexWithIndexParam - The querySuggestionsIndexWithIndexParam object.
   */
  function createConfig(
    querySuggestionsIndexWithIndexParam: QuerySuggestionsIndexWithIndexParam
  ): Promise<SucessResponse> {
    const requestPath = '/1/configs';
    const headers: Headers = { Accept: 'application/json' };
    const queryParameters: Record<string, string> = {};

    if (!querySuggestionsIndexWithIndexParam) {
      throw new Error(
        'Parameter `querySuggestionsIndexWithIndexParam` is required when calling `createConfig`.'
      );
    }

    const request: Request = {
      method: 'POST',
      path: requestPath,
      data: querySuggestionsIndexWithIndexParam,
    };

    return transporter.request(request, {
      queryParameters,
      headers,
    });
  }

  /**
   * This method allow you to send requests to the Algolia REST API.
   *
   * @summary Send requests to the Algolia REST API.
   * @param del - The del object.
   * @param del.path - The path of the API endpoint to target, anything after the /1 needs to be specified.
   * @param del.parameters - URL-encoded query string. Force some query parameters to be applied for each query made with this API key.
   * @param del.body - The parameters to send with the custom request.
   */
  function del({
    path,
    parameters,
    body,
  }: DelProps): Promise<Record<string, any>> {
    const requestPath = '/1{path}'.replace(
      '{path}',
      encodeURIComponent(String(path))
    );
    const headers: Headers = { Accept: 'application/json' };
    const queryParameters: Record<string, string> = {};

    if (!path) {
      throw new Error('Parameter `path` is required when calling `del`.');
    }

    if (parameters !== undefined) {
      queryParameters.parameters = parameters.toString();
    }

    const request: Request = {
      method: 'DELETE',
      path: requestPath,
      data: body,
    };

    return transporter.request(request, {
      queryParameters,
      headers,
    });
  }

  /**
   * Delete a configuration of a Query Suggestion\'s index. By deleting a configuraton, you stop all updates to the underlying query suggestion index. Note that when doing this, the underlying index does not change - existing suggestions remain untouched.
   *
   * @summary Delete a configuration of a Query Suggestion\'s index.
   * @param deleteConfig - The deleteConfig object.
   * @param deleteConfig.indexName - The index in which to perform the request.
   */
  function deleteConfig({
    indexName,
  }: DeleteConfigProps): Promise<SucessResponse> {
    const requestPath = '/1/configs/{indexName}'.replace(
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
      path: requestPath,
    };

    return transporter.request(request, {
      queryParameters,
      headers,
    });
  }

  /**
   * This method allow you to send requests to the Algolia REST API.
   *
   * @summary Send requests to the Algolia REST API.
   * @param get - The get object.
   * @param get.path - The path of the API endpoint to target, anything after the /1 needs to be specified.
   * @param get.parameters - URL-encoded query string. Force some query parameters to be applied for each query made with this API key.
   */
  function get({ path, parameters }: GetProps): Promise<Record<string, any>> {
    const requestPath = '/1{path}'.replace(
      '{path}',
      encodeURIComponent(String(path))
    );
    const headers: Headers = { Accept: 'application/json' };
    const queryParameters: Record<string, string> = {};

    if (!path) {
      throw new Error('Parameter `path` is required when calling `get`.');
    }

    if (parameters !== undefined) {
      queryParameters.parameters = parameters.toString();
    }

    const request: Request = {
      method: 'GET',
      path: requestPath,
    };

    return transporter.request(request, {
      queryParameters,
      headers,
    });
  }

  /**
   * Get all the configurations of Query Suggestions. For each index, you get a block of JSON with a list of its configuration settings.
   *
   * @summary Get all the configurations of Query Suggestions.
   */
  function getAllConfigs(): Promise<QuerySuggestionsIndex[]> {
    const requestPath = '/1/configs';
    const headers: Headers = { Accept: 'application/json' };
    const queryParameters: Record<string, string> = {};

    const request: Request = {
      method: 'GET',
      path: requestPath,
    };

    return transporter.request(request, {
      queryParameters,
      headers,
    });
  }

  /**
   * Get the configuration of a single Query Suggestions index.
   *
   * @summary Get the configuration of a single Query Suggestions index.
   * @param getConfig - The getConfig object.
   * @param getConfig.indexName - The index in which to perform the request.
   */
  function getConfig({
    indexName,
  }: GetConfigProps): Promise<QuerySuggestionsIndex> {
    const requestPath = '/1/configs/{indexName}'.replace(
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
      path: requestPath,
    };

    return transporter.request(request, {
      queryParameters,
      headers,
    });
  }

  /**
   * Get the status of a Query Suggestion\'s index. The status includes whether the Query Suggestions index is currently in the process of being built, and the last build time.
   *
   * @summary Get the status of a Query Suggestion\'s index.
   * @param getConfigStatus - The getConfigStatus object.
   * @param getConfigStatus.indexName - The index in which to perform the request.
   */
  function getConfigStatus({
    indexName,
  }: GetConfigStatusProps): Promise<Status> {
    const requestPath = '/1/configs/{indexName}/status'.replace(
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
      path: requestPath,
    };

    return transporter.request(request, {
      queryParameters,
      headers,
    });
  }

  /**
   * Get the log file of the last build of a single Query Suggestion index.
   *
   * @summary Get the log file of the last build of a single Query Suggestion index.
   * @param getLogFile - The getLogFile object.
   * @param getLogFile.indexName - The index in which to perform the request.
   */
  function getLogFile({ indexName }: GetLogFileProps): Promise<LogFile[]> {
    const requestPath = '/1/logs/{indexName}'.replace(
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
      path: requestPath,
    };

    return transporter.request(request, {
      queryParameters,
      headers,
    });
  }

  /**
   * This method allow you to send requests to the Algolia REST API.
   *
   * @summary Send requests to the Algolia REST API.
   * @param post - The post object.
   * @param post.path - The path of the API endpoint to target, anything after the /1 needs to be specified.
   * @param post.parameters - URL-encoded query string. Force some query parameters to be applied for each query made with this API key.
   * @param post.body - The parameters to send with the custom request.
   */
  function post({
    path,
    parameters,
    body,
  }: PostProps): Promise<Record<string, any>> {
    const requestPath = '/1{path}'.replace(
      '{path}',
      encodeURIComponent(String(path))
    );
    const headers: Headers = { Accept: 'application/json' };
    const queryParameters: Record<string, string> = {};

    if (!path) {
      throw new Error('Parameter `path` is required when calling `post`.');
    }

    if (parameters !== undefined) {
      queryParameters.parameters = parameters.toString();
    }

    const request: Request = {
      method: 'POST',
      path: requestPath,
      data: body,
    };

    return transporter.request(request, {
      queryParameters,
      headers,
    });
  }

  /**
   * This method allow you to send requests to the Algolia REST API.
   *
   * @summary Send requests to the Algolia REST API.
   * @param put - The put object.
   * @param put.path - The path of the API endpoint to target, anything after the /1 needs to be specified.
   * @param put.parameters - URL-encoded query string. Force some query parameters to be applied for each query made with this API key.
   * @param put.body - The parameters to send with the custom request.
   */
  function put({
    path,
    parameters,
    body,
  }: PutProps): Promise<Record<string, any>> {
    const requestPath = '/1{path}'.replace(
      '{path}',
      encodeURIComponent(String(path))
    );
    const headers: Headers = { Accept: 'application/json' };
    const queryParameters: Record<string, string> = {};

    if (!path) {
      throw new Error('Parameter `path` is required when calling `put`.');
    }

    if (parameters !== undefined) {
      queryParameters.parameters = parameters.toString();
    }

    const request: Request = {
      method: 'PUT',
      path: requestPath,
      data: body,
    };

    return transporter.request(request, {
      queryParameters,
      headers,
    });
  }

  /**
   * Update the configuration of a Query Suggestions index.
   *
   * @summary Update the configuration of a Query Suggestions index.
   * @param updateConfig - The updateConfig object.
   * @param updateConfig.indexName - The index in which to perform the request.
   * @param updateConfig.querySuggestionsIndexParam - The querySuggestionsIndexParam object.
   */
  function updateConfig({
    indexName,
    querySuggestionsIndexParam,
  }: UpdateConfigProps): Promise<SucessResponse> {
    const requestPath = '/1/configs/{indexName}'.replace(
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
      path: requestPath,
      data: querySuggestionsIndexParam,
    };

    return transporter.request(request, {
      queryParameters,
      headers,
    });
  }

  return {
    addUserAgent,
    createConfig,
    del,
    deleteConfig,
    get,
    getAllConfigs,
    getConfig,
    getConfigStatus,
    getLogFile,
    post,
    put,
    updateConfig,
  };
}

export type QuerySuggestionsApi = ReturnType<typeof createQuerySuggestionsApi>;

export type DelProps = {
  /**
   * The path of the API endpoint to target, anything after the /1 needs to be specified.
   */
  path: string;
  /**
   * URL-encoded query string. Force some query parameters to be applied for each query made with this API key.
   */
  parameters?: string;
  /**
   * The parameters to send with the custom request.
   */
  body?: Record<string, any>;
};

export type DeleteConfigProps = {
  /**
   * The index in which to perform the request.
   */
  indexName: string;
};

export type GetProps = {
  /**
   * The path of the API endpoint to target, anything after the /1 needs to be specified.
   */
  path: string;
  /**
   * URL-encoded query string. Force some query parameters to be applied for each query made with this API key.
   */
  parameters?: string;
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

export type PostProps = {
  /**
   * The path of the API endpoint to target, anything after the /1 needs to be specified.
   */
  path: string;
  /**
   * URL-encoded query string. Force some query parameters to be applied for each query made with this API key.
   */
  parameters?: string;
  /**
   * The parameters to send with the custom request.
   */
  body?: Record<string, any>;
};

export type PutProps = {
  /**
   * The path of the API endpoint to target, anything after the /1 needs to be specified.
   */
  path: string;
  /**
   * URL-encoded query string. Force some query parameters to be applied for each query made with this API key.
   */
  parameters?: string;
  /**
   * The parameters to send with the custom request.
   */
  body?: Record<string, any>;
};

export type UpdateConfigProps = {
  /**
   * The index in which to perform the request.
   */
  indexName: string;
  querySuggestionsIndexParam: QuerySuggestionsIndexParam;
};
