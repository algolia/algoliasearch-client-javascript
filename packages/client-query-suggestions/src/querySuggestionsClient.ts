// Code generated by OpenAPI Generator (https://openapi-generator.tech), manual changes will be lost - read more on https://github.com/algolia/api-clients-automation. DO NOT EDIT.

import type {
  CreateClientOptions,
  Headers,
  Host,
  QueryParameters,
  Request,
  RequestOptions,
} from '@algolia/client-common';
import { createAuth, createTransporter, getAlgoliaAgent } from '@algolia/client-common';

import type { BaseResponse } from '../model/baseResponse';
import type { ConfigStatus } from '../model/configStatus';

import type { ConfigurationResponse } from '../model/configurationResponse';
import type { ConfigurationWithIndex } from '../model/configurationWithIndex';

import type { LogFile } from '../model/logFile';

import type {
  CustomDeleteProps,
  CustomGetProps,
  CustomPostProps,
  CustomPutProps,
  DeleteConfigProps,
  GetConfigProps,
  GetConfigStatusProps,
  GetLogFileProps,
  UpdateConfigProps,
} from '../model/clientMethodProps';

export const apiClientVersion = '5.35.0';

export const REGIONS = ['eu', 'us'] as const;
export type Region = (typeof REGIONS)[number];
export type RegionOptions = { region: Region };

function getDefaultHosts(region: Region): Host[] {
  const url = 'query-suggestions.{region}.algolia.com'.replace('{region}', region);

  return [{ url, accept: 'readWrite', protocol: 'https' }];
}

export function createQuerySuggestionsClient({
  appId: appIdOption,
  apiKey: apiKeyOption,
  authMode,
  algoliaAgents,
  region: regionOption,
  ...options
}: CreateClientOptions & RegionOptions) {
  const auth = createAuth(appIdOption, apiKeyOption, authMode);
  const transporter = createTransporter({
    hosts: getDefaultHosts(regionOption),
    ...options,
    algoliaAgent: getAlgoliaAgent({
      algoliaAgents,
      client: 'QuerySuggestions',
      version: apiClientVersion,
    }),
    baseHeaders: {
      'content-type': 'text/plain',
      ...auth.headers(),
      ...options.baseHeaders,
    },
    baseQueryParameters: {
      ...auth.queryParameters(),
      ...options.baseQueryParameters,
    },
  });

  return {
    transporter,

    /**
     * The `appId` currently in use.
     */
    appId: appIdOption,

    /**
     * The `apiKey` currently in use.
     */
    apiKey: apiKeyOption,

    /**
     * Clears the cache of the transporter for the `requestsCache` and `responsesCache` properties.
     */
    clearCache(): Promise<void> {
      return Promise.all([transporter.requestsCache.clear(), transporter.responsesCache.clear()]).then(() => undefined);
    },

    /**
     * Get the value of the `algoliaAgent`, used by our libraries internally and telemetry system.
     */
    get _ua(): string {
      return transporter.algoliaAgent.value;
    },

    /**
     * Adds a `segment` to the `x-algolia-agent` sent with every requests.
     *
     * @param segment - The algolia agent (user-agent) segment to add.
     * @param version - The version of the agent.
     */
    addAlgoliaAgent(segment: string, version?: string | undefined): void {
      transporter.algoliaAgent.add({ segment, version });
    },

    /**
     * Helper method to switch the API key used to authenticate the requests.
     *
     * @param params - Method params.
     * @param params.apiKey - The new API Key to use.
     */
    setClientApiKey({ apiKey }: { apiKey: string }): void {
      if (!authMode || authMode === 'WithinHeaders') {
        transporter.baseHeaders['x-algolia-api-key'] = apiKey;
      } else {
        transporter.baseQueryParameters['x-algolia-api-key'] = apiKey;
      }
    },

    /**
     * Creates a new Query Suggestions configuration.  You can have up to 100 configurations per Algolia application.
     *
     * Required API Key ACLs:
     *  - editSettings
     * @param configurationWithIndex - The configurationWithIndex object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    createConfig(
      configurationWithIndex: ConfigurationWithIndex,
      requestOptions?: RequestOptions,
    ): Promise<BaseResponse> {
      if (!configurationWithIndex) {
        throw new Error('Parameter `configurationWithIndex` is required when calling `createConfig`.');
      }

      const requestPath = '/1/configs';
      const headers: Headers = {};
      const queryParameters: QueryParameters = {};

      const request: Request = {
        method: 'POST',
        path: requestPath,
        queryParameters,
        headers,
        data: configurationWithIndex,
      };

      return transporter.request(request, requestOptions);
    },

    /**
     * This method lets you send requests to the Algolia REST API.
     * @param customDelete - The customDelete object.
     * @param customDelete.path - Path of the endpoint, for example `1/newFeature`.
     * @param customDelete.parameters - Query parameters to apply to the current query.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    customDelete(
      { path, parameters }: CustomDeleteProps,
      requestOptions?: RequestOptions,
    ): Promise<Record<string, unknown>> {
      if (!path) {
        throw new Error('Parameter `path` is required when calling `customDelete`.');
      }

      const requestPath = '/{path}'.replace('{path}', path);
      const headers: Headers = {};
      const queryParameters: QueryParameters = parameters ? parameters : {};

      const request: Request = {
        method: 'DELETE',
        path: requestPath,
        queryParameters,
        headers,
      };

      return transporter.request(request, requestOptions);
    },

    /**
     * This method lets you send requests to the Algolia REST API.
     * @param customGet - The customGet object.
     * @param customGet.path - Path of the endpoint, for example `1/newFeature`.
     * @param customGet.parameters - Query parameters to apply to the current query.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    customGet({ path, parameters }: CustomGetProps, requestOptions?: RequestOptions): Promise<Record<string, unknown>> {
      if (!path) {
        throw new Error('Parameter `path` is required when calling `customGet`.');
      }

      const requestPath = '/{path}'.replace('{path}', path);
      const headers: Headers = {};
      const queryParameters: QueryParameters = parameters ? parameters : {};

      const request: Request = {
        method: 'GET',
        path: requestPath,
        queryParameters,
        headers,
      };

      return transporter.request(request, requestOptions);
    },

    /**
     * This method lets you send requests to the Algolia REST API.
     * @param customPost - The customPost object.
     * @param customPost.path - Path of the endpoint, for example `1/newFeature`.
     * @param customPost.parameters - Query parameters to apply to the current query.
     * @param customPost.body - Parameters to send with the custom request.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    customPost(
      { path, parameters, body }: CustomPostProps,
      requestOptions?: RequestOptions,
    ): Promise<Record<string, unknown>> {
      if (!path) {
        throw new Error('Parameter `path` is required when calling `customPost`.');
      }

      const requestPath = '/{path}'.replace('{path}', path);
      const headers: Headers = {};
      const queryParameters: QueryParameters = parameters ? parameters : {};

      const request: Request = {
        method: 'POST',
        path: requestPath,
        queryParameters,
        headers,
        data: body ? body : {},
      };

      return transporter.request(request, requestOptions);
    },

    /**
     * This method lets you send requests to the Algolia REST API.
     * @param customPut - The customPut object.
     * @param customPut.path - Path of the endpoint, for example `1/newFeature`.
     * @param customPut.parameters - Query parameters to apply to the current query.
     * @param customPut.body - Parameters to send with the custom request.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    customPut(
      { path, parameters, body }: CustomPutProps,
      requestOptions?: RequestOptions,
    ): Promise<Record<string, unknown>> {
      if (!path) {
        throw new Error('Parameter `path` is required when calling `customPut`.');
      }

      const requestPath = '/{path}'.replace('{path}', path);
      const headers: Headers = {};
      const queryParameters: QueryParameters = parameters ? parameters : {};

      const request: Request = {
        method: 'PUT',
        path: requestPath,
        queryParameters,
        headers,
        data: body ? body : {},
      };

      return transporter.request(request, requestOptions);
    },

    /**
     * Deletes a Query Suggestions configuration.  Deleting only removes the configuration and stops updates to the Query Suggestions index. To delete the Query Suggestions index itself, use the Search API and the `Delete an index` operation.
     *
     * Required API Key ACLs:
     *  - editSettings
     * @param deleteConfig - The deleteConfig object.
     * @param deleteConfig.indexName - Query Suggestions index name.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    deleteConfig({ indexName }: DeleteConfigProps, requestOptions?: RequestOptions): Promise<BaseResponse> {
      if (!indexName) {
        throw new Error('Parameter `indexName` is required when calling `deleteConfig`.');
      }

      const requestPath = '/1/configs/{indexName}'.replace('{indexName}', encodeURIComponent(indexName));
      const headers: Headers = {};
      const queryParameters: QueryParameters = {};

      const request: Request = {
        method: 'DELETE',
        path: requestPath,
        queryParameters,
        headers,
      };

      return transporter.request(request, requestOptions);
    },

    /**
     * Retrieves all Query Suggestions configurations of your Algolia application.
     *
     * Required API Key ACLs:
     *  - settings
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    getAllConfigs(requestOptions?: RequestOptions | undefined): Promise<Array<ConfigurationResponse>> {
      const requestPath = '/1/configs';
      const headers: Headers = {};
      const queryParameters: QueryParameters = {};

      const request: Request = {
        method: 'GET',
        path: requestPath,
        queryParameters,
        headers,
      };

      return transporter.request(request, requestOptions);
    },

    /**
     * Retrieves a single Query Suggestions configuration by its index name.
     *
     * Required API Key ACLs:
     *  - settings
     * @param getConfig - The getConfig object.
     * @param getConfig.indexName - Query Suggestions index name.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    getConfig({ indexName }: GetConfigProps, requestOptions?: RequestOptions): Promise<ConfigurationResponse> {
      if (!indexName) {
        throw new Error('Parameter `indexName` is required when calling `getConfig`.');
      }

      const requestPath = '/1/configs/{indexName}'.replace('{indexName}', encodeURIComponent(indexName));
      const headers: Headers = {};
      const queryParameters: QueryParameters = {};

      const request: Request = {
        method: 'GET',
        path: requestPath,
        queryParameters,
        headers,
      };

      return transporter.request(request, requestOptions);
    },

    /**
     * Reports the status of a Query Suggestions index.
     *
     * Required API Key ACLs:
     *  - settings
     * @param getConfigStatus - The getConfigStatus object.
     * @param getConfigStatus.indexName - Query Suggestions index name.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    getConfigStatus({ indexName }: GetConfigStatusProps, requestOptions?: RequestOptions): Promise<ConfigStatus> {
      if (!indexName) {
        throw new Error('Parameter `indexName` is required when calling `getConfigStatus`.');
      }

      const requestPath = '/1/configs/{indexName}/status'.replace('{indexName}', encodeURIComponent(indexName));
      const headers: Headers = {};
      const queryParameters: QueryParameters = {};

      const request: Request = {
        method: 'GET',
        path: requestPath,
        queryParameters,
        headers,
      };

      return transporter.request(request, requestOptions);
    },

    /**
     * Retrieves the logs for a single Query Suggestions index.
     *
     * Required API Key ACLs:
     *  - settings
     * @param getLogFile - The getLogFile object.
     * @param getLogFile.indexName - Query Suggestions index name.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    getLogFile({ indexName }: GetLogFileProps, requestOptions?: RequestOptions): Promise<LogFile> {
      if (!indexName) {
        throw new Error('Parameter `indexName` is required when calling `getLogFile`.');
      }

      const requestPath = '/1/logs/{indexName}'.replace('{indexName}', encodeURIComponent(indexName));
      const headers: Headers = {};
      const queryParameters: QueryParameters = {};

      const request: Request = {
        method: 'GET',
        path: requestPath,
        queryParameters,
        headers,
      };

      return transporter.request(request, requestOptions);
    },

    /**
     * Updates a QuerySuggestions configuration.
     *
     * Required API Key ACLs:
     *  - editSettings
     * @param updateConfig - The updateConfig object.
     * @param updateConfig.indexName - Query Suggestions index name.
     * @param updateConfig.configuration - The configuration object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    updateConfig(
      { indexName, configuration }: UpdateConfigProps,
      requestOptions?: RequestOptions,
    ): Promise<BaseResponse> {
      if (!indexName) {
        throw new Error('Parameter `indexName` is required when calling `updateConfig`.');
      }

      if (!configuration) {
        throw new Error('Parameter `configuration` is required when calling `updateConfig`.');
      }

      if (!configuration.sourceIndices) {
        throw new Error('Parameter `configuration.sourceIndices` is required when calling `updateConfig`.');
      }

      const requestPath = '/1/configs/{indexName}'.replace('{indexName}', encodeURIComponent(indexName));
      const headers: Headers = {};
      const queryParameters: QueryParameters = {};

      const request: Request = {
        method: 'PUT',
        path: requestPath,
        queryParameters,
        headers,
        data: configuration,
      };

      return transporter.request(request, requestOptions);
    },
  };
}
