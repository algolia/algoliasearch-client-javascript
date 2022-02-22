import {
  createAuth,
  createMemoryCache,
  createTransporter,
  getUserAgent,
} from '@algolia/client-common';
import type {
  CreateClientOptions,
  Headers,
  Host,
  Request,
} from '@algolia/client-common';

import type { LogFile } from '../model/logFile';
import type { QuerySuggestionsIndex } from '../model/querySuggestionsIndex';
import type { QuerySuggestionsIndexParam } from '../model/querySuggestionsIndexParam';
import type { QuerySuggestionsIndexWithIndexParam } from '../model/querySuggestionsIndexWithIndexParam';
import type { Status } from '../model/status';
import type { SucessResponse } from '../model/sucessResponse';

export const apiClientVersion = '5.0.0';

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
    const path = '/1/configs';
    const headers: Headers = { Accept: 'application/json' };
    const queryParameters: Record<string, string> = {};

    const request: Request = {
      method: 'GET',
      path,
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

    return transporter.request(request, {
      queryParameters,
      headers,
    });
  }

  return {
    addUserAgent,
    createConfig,
    deleteConfig,
    getAllConfigs,
    getConfig,
    getConfigStatus,
    getLogFile,
    updateConfig,
  };
}

export type QuerySuggestionsApi = ReturnType<typeof createQuerySuggestionsApi>;

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
