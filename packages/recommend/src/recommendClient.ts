// Code generated by OpenAPI Generator (https://openapi-generator.tech), manual changes will be lost - read more on https://github.com/algolia/api-clients-automation. DO NOT EDIT.

import {
  createAuth,
  createTransporter,
  getAlgoliaAgent,
  shuffle,
} from '@algolia/client-common';
import type {
  CreateClientOptions,
  Headers,
  Host,
  QueryParameters,
  Request,
  RequestOptions,
} from '@algolia/client-common';

import type {
  CustomDeleteProps,
  CustomGetProps,
  CustomPostProps,
  CustomPutProps,
  DeleteRecommendRuleProps,
  GetRecommendRuleProps,
  GetRecommendStatusProps,
  LegacyGetRecommendationsParams,
  SearchRecommendRulesProps,
} from '../model/clientMethodProps';
import type { DeletedAtResponse } from '../model/deletedAtResponse';
import type { GetRecommendTaskResponse } from '../model/getRecommendTaskResponse';
import type { GetRecommendationsParams } from '../model/getRecommendationsParams';
import type { GetRecommendationsResponse } from '../model/getRecommendationsResponse';
import type { RecommendRule } from '../model/recommendRule';
import type { SearchRecommendRulesResponse } from '../model/searchRecommendRulesResponse';

export const apiClientVersion = '5.0.0';

function getDefaultHosts(appId: string): Host[] {
  return (
    [
      {
        url: `${appId}-dsn.algolia.net`,
        accept: 'read',
        protocol: 'https',
      },
      {
        url: `${appId}.algolia.net`,
        accept: 'write',
        protocol: 'https',
      },
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

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function createRecommendClient({
  appId: appIdOption,
  apiKey: apiKeyOption,
  authMode,
  algoliaAgents,
  ...options
}: CreateClientOptions) {
  const auth = createAuth(appIdOption, apiKeyOption, authMode);
  const transporter = createTransporter({
    hosts: getDefaultHosts(appIdOption),
    ...options,
    algoliaAgent: getAlgoliaAgent({
      algoliaAgents,
      client: 'Recommend',
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
     * Clears the cache of the transporter for the `requestsCache` and `responsesCache` properties.
     */
    clearCache(): Promise<void> {
      return Promise.all([
        transporter.requestsCache.clear(),
        transporter.responsesCache.clear(),
      ]).then(() => undefined);
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
    addAlgoliaAgent(segment: string, version?: string): void {
      transporter.algoliaAgent.add({ segment, version });
    },

    /**
     * This method allow you to send requests to the Algolia REST API.
     *
     * @param customDelete - The customDelete object.
     * @param customDelete.path - Path of the endpoint, anything after \"/1\" must be specified.
     * @param customDelete.parameters - Query parameters to apply to the current query.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    customDelete(
      { path, parameters }: CustomDeleteProps,
      requestOptions?: RequestOptions
    ): Promise<Record<string, any>> {
      if (!path) {
        throw new Error(
          'Parameter `path` is required when calling `customDelete`.'
        );
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
     * This method allow you to send requests to the Algolia REST API.
     *
     * @param customGet - The customGet object.
     * @param customGet.path - Path of the endpoint, anything after \"/1\" must be specified.
     * @param customGet.parameters - Query parameters to apply to the current query.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    customGet(
      { path, parameters }: CustomGetProps,
      requestOptions?: RequestOptions
    ): Promise<Record<string, any>> {
      if (!path) {
        throw new Error(
          'Parameter `path` is required when calling `customGet`.'
        );
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
     * This method allow you to send requests to the Algolia REST API.
     *
     * @param customPost - The customPost object.
     * @param customPost.path - Path of the endpoint, anything after \"/1\" must be specified.
     * @param customPost.parameters - Query parameters to apply to the current query.
     * @param customPost.body - Parameters to send with the custom request.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    customPost(
      { path, parameters, body }: CustomPostProps,
      requestOptions?: RequestOptions
    ): Promise<Record<string, any>> {
      if (!path) {
        throw new Error(
          'Parameter `path` is required when calling `customPost`.'
        );
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
     * This method allow you to send requests to the Algolia REST API.
     *
     * @param customPut - The customPut object.
     * @param customPut.path - Path of the endpoint, anything after \"/1\" must be specified.
     * @param customPut.parameters - Query parameters to apply to the current query.
     * @param customPut.body - Parameters to send with the custom request.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    customPut(
      { path, parameters, body }: CustomPutProps,
      requestOptions?: RequestOptions
    ): Promise<Record<string, any>> {
      if (!path) {
        throw new Error(
          'Parameter `path` is required when calling `customPut`.'
        );
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
     * Deletes a Recommend rule from a recommendation scenario.
     *
     * Required API Key ACLs:
     * - editSettings.
     *
     * @param deleteRecommendRule - The deleteRecommendRule object.
     * @param deleteRecommendRule.indexName - Name of the index on which to perform the operation.
     * @param deleteRecommendRule.model - [Recommend model](https://www.algolia.com/doc/guides/algolia-recommend/overview/#recommend-models).
     * @param deleteRecommendRule.objectID - Unique record identifier.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    deleteRecommendRule(
      { indexName, model, objectID }: DeleteRecommendRuleProps,
      requestOptions?: RequestOptions
    ): Promise<DeletedAtResponse> {
      if (!indexName) {
        throw new Error(
          'Parameter `indexName` is required when calling `deleteRecommendRule`.'
        );
      }

      if (!model) {
        throw new Error(
          'Parameter `model` is required when calling `deleteRecommendRule`.'
        );
      }

      if (!objectID) {
        throw new Error(
          'Parameter `objectID` is required when calling `deleteRecommendRule`.'
        );
      }

      const requestPath =
        '/1/indexes/{indexName}/{model}/recommend/rules/{objectID}'
          .replace('{indexName}', encodeURIComponent(indexName))
          .replace('{model}', encodeURIComponent(model))
          .replace('{objectID}', encodeURIComponent(objectID));
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
     * Retrieves a Recommend rule that you previously created in the Algolia dashboard.
     *
     * Required API Key ACLs:
     * - settings.
     *
     * @param getRecommendRule - The getRecommendRule object.
     * @param getRecommendRule.indexName - Name of the index on which to perform the operation.
     * @param getRecommendRule.model - [Recommend model](https://www.algolia.com/doc/guides/algolia-recommend/overview/#recommend-models).
     * @param getRecommendRule.objectID - Unique record identifier.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    getRecommendRule(
      { indexName, model, objectID }: GetRecommendRuleProps,
      requestOptions?: RequestOptions
    ): Promise<RecommendRule> {
      if (!indexName) {
        throw new Error(
          'Parameter `indexName` is required when calling `getRecommendRule`.'
        );
      }

      if (!model) {
        throw new Error(
          'Parameter `model` is required when calling `getRecommendRule`.'
        );
      }

      if (!objectID) {
        throw new Error(
          'Parameter `objectID` is required when calling `getRecommendRule`.'
        );
      }

      const requestPath =
        '/1/indexes/{indexName}/{model}/recommend/rules/{objectID}'
          .replace('{indexName}', encodeURIComponent(indexName))
          .replace('{model}', encodeURIComponent(model))
          .replace('{objectID}', encodeURIComponent(objectID));
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
     * Checks the status of a given task.  Deleting a Recommend rule is asynchronous. When you delete a rule, a task is created on a queue and completed depending on the load on the server. The API response includes a task ID that you can use to check the status.
     *
     * Required API Key ACLs:
     * - editSettings.
     *
     * @param getRecommendStatus - The getRecommendStatus object.
     * @param getRecommendStatus.indexName - Name of the index on which to perform the operation.
     * @param getRecommendStatus.model - [Recommend model](https://www.algolia.com/doc/guides/algolia-recommend/overview/#recommend-models).
     * @param getRecommendStatus.taskID - Unique task identifier.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    getRecommendStatus(
      { indexName, model, taskID }: GetRecommendStatusProps,
      requestOptions?: RequestOptions
    ): Promise<GetRecommendTaskResponse> {
      if (!indexName) {
        throw new Error(
          'Parameter `indexName` is required when calling `getRecommendStatus`.'
        );
      }

      if (!model) {
        throw new Error(
          'Parameter `model` is required when calling `getRecommendStatus`.'
        );
      }

      if (!taskID) {
        throw new Error(
          'Parameter `taskID` is required when calling `getRecommendStatus`.'
        );
      }

      const requestPath = '/1/indexes/{indexName}/{model}/task/{taskID}'
        .replace('{indexName}', encodeURIComponent(indexName))
        .replace('{model}', encodeURIComponent(model))
        .replace('{taskID}', encodeURIComponent(taskID));
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
     * Retrieves recommendations from selected AI models.
     *
     * Required API Key ACLs:
     * - search.
     *
     * @param getRecommendationsParams - The getRecommendationsParams object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    getRecommendations(
      getRecommendationsParams:
        | GetRecommendationsParams
        | LegacyGetRecommendationsParams,
      requestOptions?: RequestOptions
    ): Promise<GetRecommendationsResponse> {
      if (getRecommendationsParams && Array.isArray(getRecommendationsParams)) {
        const newSignatureRequest: GetRecommendationsParams = {
          requests: getRecommendationsParams,
        };

        // eslint-disable-next-line no-param-reassign
        getRecommendationsParams = newSignatureRequest;
      }

      if (!getRecommendationsParams) {
        throw new Error(
          'Parameter `getRecommendationsParams` is required when calling `getRecommendations`.'
        );
      }

      if (!getRecommendationsParams.requests) {
        throw new Error(
          'Parameter `getRecommendationsParams.requests` is required when calling `getRecommendations`.'
        );
      }

      const requestPath = '/1/indexes/*/recommendations';
      const headers: Headers = {};
      const queryParameters: QueryParameters = {};

      const request: Request = {
        method: 'POST',
        path: requestPath,
        queryParameters,
        headers,
        data: getRecommendationsParams,
        useReadTransporter: true,
        cacheable: true,
      };

      return transporter.request(request, requestOptions);
    },

    /**
     * Searches for Recommend rules.  Use an empty query to list all rules for this recommendation scenario.
     *
     * Required API Key ACLs:
     * - settings.
     *
     * @param searchRecommendRules - The searchRecommendRules object.
     * @param searchRecommendRules.indexName - Name of the index on which to perform the operation.
     * @param searchRecommendRules.model - [Recommend model](https://www.algolia.com/doc/guides/algolia-recommend/overview/#recommend-models).
     * @param searchRecommendRules.searchRecommendRulesParams - The searchRecommendRulesParams object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    searchRecommendRules(
      {
        indexName,
        model,
        searchRecommendRulesParams,
      }: SearchRecommendRulesProps,
      requestOptions?: RequestOptions
    ): Promise<SearchRecommendRulesResponse> {
      if (!indexName) {
        throw new Error(
          'Parameter `indexName` is required when calling `searchRecommendRules`.'
        );
      }

      if (!model) {
        throw new Error(
          'Parameter `model` is required when calling `searchRecommendRules`.'
        );
      }

      const requestPath =
        '/1/indexes/{indexName}/{model}/recommend/rules/search'
          .replace('{indexName}', encodeURIComponent(indexName))
          .replace('{model}', encodeURIComponent(model));
      const headers: Headers = {};
      const queryParameters: QueryParameters = {};

      const request: Request = {
        method: 'POST',
        path: requestPath,
        queryParameters,
        headers,
        data: searchRecommendRulesParams ? searchRecommendRulesParams : {},
        useReadTransporter: true,
        cacheable: true,
      };

      return transporter.request(request, requestOptions);
    },
  };
}
