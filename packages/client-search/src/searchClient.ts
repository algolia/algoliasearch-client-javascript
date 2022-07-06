import {
  createAuth,
  createTransporter,
  getAlgoliaAgent,
  shuffle,
  createRetryablePromise,
} from '@experimental-api-clients-automation/client-common';
import type {
  CreateClientOptions,
  Headers,
  Host,
  Request,
  RequestOptions,
  QueryParameters,
  ApiError,
} from '@experimental-api-clients-automation/client-common';

import type { AddApiKeyResponse } from '../model/addApiKeyResponse';
import type { ApiKey } from '../model/apiKey';
import type { BatchParams } from '../model/batchParams';
import type { BatchResponse } from '../model/batchResponse';
import type { BrowseResponse } from '../model/browseResponse';
import type {
  WaitForTaskOptions,
  WaitForApiKeyOptions,
  AddOrUpdateObjectProps,
  AssignUserIdProps,
  BatchProps,
  BatchAssignUserIdsProps,
  BatchDictionaryEntriesProps,
  BrowseProps,
  ClearAllSynonymsProps,
  ClearObjectsProps,
  ClearRulesProps,
  DelProps,
  DeleteApiKeyProps,
  DeleteByProps,
  DeleteIndexProps,
  DeleteObjectProps,
  DeleteRuleProps,
  DeleteSourceProps,
  DeleteSynonymProps,
  GetProps,
  GetApiKeyProps,
  GetLogsProps,
  GetObjectProps,
  GetRuleProps,
  GetSettingsProps,
  GetSynonymProps,
  GetTaskProps,
  GetUserIdProps,
  HasPendingMappingsProps,
  ListIndicesProps,
  ListUserIdsProps,
  OperationIndexProps,
  PartialUpdateObjectProps,
  PostProps,
  PutProps,
  RemoveUserIdProps,
  ReplaceSourcesProps,
  RestoreApiKeyProps,
  SaveObjectProps,
  SaveRuleProps,
  SaveRulesProps,
  SaveSynonymProps,
  SaveSynonymsProps,
  LegacySearchMethodProps,
  SearchDictionaryEntriesProps,
  SearchForFacetValuesProps,
  SearchRulesProps,
  SearchSingleIndexProps,
  SearchSynonymsProps,
  SetSettingsProps,
  UpdateApiKeyProps,
} from '../model/clientMethodProps';
import type { CreatedAtResponse } from '../model/createdAtResponse';
import type { DeleteApiKeyResponse } from '../model/deleteApiKeyResponse';
import type { DeleteSourceResponse } from '../model/deleteSourceResponse';
import type { DeletedAtResponse } from '../model/deletedAtResponse';
import type { DictionarySettingsParams } from '../model/dictionarySettingsParams';
import type { GetDictionarySettingsResponse } from '../model/getDictionarySettingsResponse';
import type { GetLogsResponse } from '../model/getLogsResponse';
import type { GetObjectsParams } from '../model/getObjectsParams';
import type { GetObjectsResponse } from '../model/getObjectsResponse';
import type { GetTaskResponse } from '../model/getTaskResponse';
import type { GetTopUserIdsResponse } from '../model/getTopUserIdsResponse';
import type { HasPendingMappingsResponse } from '../model/hasPendingMappingsResponse';
import type { IndexSettings } from '../model/indexSettings';
import type { Key } from '../model/key';
import type { Languages } from '../model/languages';
import type { ListApiKeysResponse } from '../model/listApiKeysResponse';
import type { ListClustersResponse } from '../model/listClustersResponse';
import type { ListIndicesResponse } from '../model/listIndicesResponse';
import type { ListUserIdsResponse } from '../model/listUserIdsResponse';
import type { MultipleBatchResponse } from '../model/multipleBatchResponse';
import type { RemoveUserIdResponse } from '../model/removeUserIdResponse';
import type { ReplaceSourceResponse } from '../model/replaceSourceResponse';
import type { Rule } from '../model/rule';
import type { SaveObjectResponse } from '../model/saveObjectResponse';
import type { SaveSynonymResponse } from '../model/saveSynonymResponse';
import type { SearchForFacetValuesResponse } from '../model/searchForFacetValuesResponse';
import type { SearchMethodParams } from '../model/searchMethodParams';
import type { SearchResponse } from '../model/searchResponse';
import type { SearchResponses } from '../model/searchResponses';
import type { SearchRulesResponse } from '../model/searchRulesResponse';
import type { SearchSynonymsResponse } from '../model/searchSynonymsResponse';
import type { SearchUserIdsParams } from '../model/searchUserIdsParams';
import type { SearchUserIdsResponse } from '../model/searchUserIdsResponse';
import type { Source } from '../model/source';
import type { SynonymHit } from '../model/synonymHit';
import type { UpdateApiKeyResponse } from '../model/updateApiKeyResponse';
import type { UpdatedAtResponse } from '../model/updatedAtResponse';
import type { UpdatedAtWithObjectIdResponse } from '../model/updatedAtWithObjectIdResponse';
import type { UpdatedRuleResponse } from '../model/updatedRuleResponse';
import type { UserId } from '../model/userId';

export const apiClientVersion = '0.8.0';

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
export function createSearchClient({
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
      client: 'Search',
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

  function addAlgoliaAgent(segment: string, version?: string): void {
    transporter.algoliaAgent.add({ segment, version });
  }

  return {
    addAlgoliaAgent,
    /**
     * Helper: Wait for a task to complete with `indexName` and `taskID`.
     *
     * @summary Wait for a task to complete.
     * @param waitForTaskOptions - The waitForTaskOptions object.
     * @param waitForTaskOptions.indexName - The `indexName` where the operation was performed.
     * @param waitForTaskOptions.taskID - The `taskID` returned in the method response.
     */
    waitForTask({
      indexName,
      taskID,
      ...createRetryablePromiseOptions
    }: WaitForTaskOptions): Promise<GetTaskResponse> {
      return createRetryablePromise({
        ...createRetryablePromiseOptions,
        func: () => this.getTask({ indexName, taskID }),
        validate: (response) => response.status === 'published',
      });
    },

    /**
     * Helper: Wait for an API key to be valid, updated or deleted based on a given `operation`.
     *
     * @summary Wait for an API key task to be processed.
     * @param waitForApiKeyOptions - The waitForApiKeyOptions object.
     * @param waitForApiKeyOptions.operation - The `operation` that was done on a `key`.
     * @param waitForApiKeyOptions.key - The `key` that has been added, deleted or updated.
     * @param waitForApiKeyOptions.apiKey - Necessary to know if an `update` operation has been processed, compare fields of the response with it.
     */
    waitForApiKey({
      operation,
      key,
      apiKey,
      ...createRetryablePromiseOptions
    }: WaitForApiKeyOptions): Promise<ApiError | Key> {
      if (operation === 'update') {
        if (!apiKey) {
          throw new Error(
            '`apiKey` is required when waiting for an `update` operation.'
          );
        }

        return createRetryablePromise({
          ...createRetryablePromiseOptions,
          func: () => this.getApiKey({ key }),
          validate: (response) => {
            for (const field of Object.keys(apiKey)) {
              if (Array.isArray(apiKey[field])) {
                if (
                  apiKey[field].length !== response[field].length ||
                  (apiKey[field] as string[]).some(
                    (value, index) => value !== response[field][index]
                  )
                ) {
                  return false;
                }
              } else if (response[field] !== apiKey[field]) {
                return false;
              }
            }
            return true;
          },
        });
      }

      return createRetryablePromise({
        ...createRetryablePromiseOptions,
        func: () => this.getApiKey({ key }).catch((error) => error),
        validate: (error: ApiError) =>
          operation === 'add' ? error.status !== 404 : error.status === 404,
      });
    },

    /**
     * Add a new API Key with specific permissions/restrictions.
     *
     * @summary Create an API key.
     * @param apiKey - The apiKey object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    addApiKey(
      apiKey: ApiKey,
      requestOptions?: RequestOptions
    ): Promise<AddApiKeyResponse> {
      if (!apiKey) {
        throw new Error(
          'Parameter `apiKey` is required when calling `addApiKey`.'
        );
      }

      if (!apiKey.acl) {
        throw new Error(
          'Parameter `apiKey.acl` is required when calling `addApiKey`.'
        );
      }

      const requestPath = '/1/keys';
      const headers: Headers = {};
      const queryParameters: QueryParameters = {};

      const request: Request = {
        method: 'POST',
        path: requestPath,
        queryParameters,
        headers,
        data: apiKey,
      };

      return transporter.request(request, requestOptions);
    },

    /**
     * Add or replace an object with a given object ID. If the object does not exist, it will be created. If it already exists, it will be replaced.
     *
     * @summary Add or replace an object.
     * @param addOrUpdateObject - The addOrUpdateObject object.
     * @param addOrUpdateObject.indexName - The index in which to perform the request.
     * @param addOrUpdateObject.objectID - Unique identifier of an object.
     * @param addOrUpdateObject.body - The Algolia object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    addOrUpdateObject(
      { indexName, objectID, body }: AddOrUpdateObjectProps,
      requestOptions?: RequestOptions
    ): Promise<UpdatedAtWithObjectIdResponse> {
      if (!indexName) {
        throw new Error(
          'Parameter `indexName` is required when calling `addOrUpdateObject`.'
        );
      }

      if (!objectID) {
        throw new Error(
          'Parameter `objectID` is required when calling `addOrUpdateObject`.'
        );
      }

      if (!body) {
        throw new Error(
          'Parameter `body` is required when calling `addOrUpdateObject`.'
        );
      }

      const requestPath = '/1/indexes/{indexName}/{objectID}'
        .replace('{indexName}', encodeURIComponent(indexName))
        .replace('{objectID}', encodeURIComponent(objectID));
      const headers: Headers = {};
      const queryParameters: QueryParameters = {};

      const request: Request = {
        method: 'PUT',
        path: requestPath,
        queryParameters,
        headers,
        data: body,
      };

      return transporter.request(request, requestOptions);
    },

    /**
     * Add a single source to the list of allowed sources.
     *
     * @summary Add a single source.
     * @param source - The source to add.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    appendSource(
      source: Source,
      requestOptions?: RequestOptions
    ): Promise<CreatedAtResponse> {
      if (!source) {
        throw new Error(
          'Parameter `source` is required when calling `appendSource`.'
        );
      }

      const requestPath = '/1/security/sources/append';
      const headers: Headers = {};
      const queryParameters: QueryParameters = {};

      const request: Request = {
        method: 'POST',
        path: requestPath,
        queryParameters,
        headers,
        data: source,
      };

      return transporter.request(request, requestOptions);
    },

    /**
     * Assign or Move a userID to a cluster. The time it takes to migrate (move) a user is proportional to the amount of data linked to the userID. Upon success, the response is 200 OK. A successful response indicates that the operation has been taken into account, and the userID is directly usable.
     *
     * @summary Assign or Move userID.
     * @param assignUserId - The assignUserId object.
     * @param assignUserId.xAlgoliaUserID - UserID to assign.
     * @param assignUserId.assignUserIdParams - The assignUserIdParams object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    assignUserId(
      { xAlgoliaUserID, assignUserIdParams }: AssignUserIdProps,
      requestOptions?: RequestOptions
    ): Promise<CreatedAtResponse> {
      if (!xAlgoliaUserID) {
        throw new Error(
          'Parameter `xAlgoliaUserID` is required when calling `assignUserId`.'
        );
      }

      if (!assignUserIdParams) {
        throw new Error(
          'Parameter `assignUserIdParams` is required when calling `assignUserId`.'
        );
      }

      if (!assignUserIdParams.cluster) {
        throw new Error(
          'Parameter `assignUserIdParams.cluster` is required when calling `assignUserId`.'
        );
      }

      const requestPath = '/1/clusters/mapping';
      const headers: Headers = {};
      const queryParameters: QueryParameters = {};

      if (xAlgoliaUserID !== undefined) {
        headers['X-Algolia-User-ID'] = xAlgoliaUserID.toString();
      }

      const request: Request = {
        method: 'POST',
        path: requestPath,
        queryParameters,
        headers,
        data: assignUserIdParams,
      };

      return transporter.request(request, requestOptions);
    },

    /**
     * Perform multiple write operations targeting one index, in a single API call.
     *
     * @summary Batch operations to one index.
     * @param batch - The batch object.
     * @param batch.indexName - The index in which to perform the request.
     * @param batch.batchWriteParams - The batchWriteParams object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    batch(
      { indexName, batchWriteParams }: BatchProps,
      requestOptions?: RequestOptions
    ): Promise<BatchResponse> {
      if (!indexName) {
        throw new Error(
          'Parameter `indexName` is required when calling `batch`.'
        );
      }

      if (!batchWriteParams) {
        throw new Error(
          'Parameter `batchWriteParams` is required when calling `batch`.'
        );
      }

      const requestPath = '/1/indexes/{indexName}/batch'.replace(
        '{indexName}',
        encodeURIComponent(indexName)
      );
      const headers: Headers = {};
      const queryParameters: QueryParameters = {};

      const request: Request = {
        method: 'POST',
        path: requestPath,
        queryParameters,
        headers,
        data: batchWriteParams,
      };

      return transporter.request(request, requestOptions);
    },

    /**
     * Assign multiple userIDs to a cluster. Upon success, the response is 200 OK. A successful response indicates that the operation has been taken into account, and the userIDs are directly usable.
     *
     * @summary Batch assign userIDs.
     * @param batchAssignUserIds - The batchAssignUserIds object.
     * @param batchAssignUserIds.xAlgoliaUserID - UserID to assign.
     * @param batchAssignUserIds.batchAssignUserIdsParams - The batchAssignUserIdsParams object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    batchAssignUserIds(
      { xAlgoliaUserID, batchAssignUserIdsParams }: BatchAssignUserIdsProps,
      requestOptions?: RequestOptions
    ): Promise<CreatedAtResponse> {
      if (!xAlgoliaUserID) {
        throw new Error(
          'Parameter `xAlgoliaUserID` is required when calling `batchAssignUserIds`.'
        );
      }

      if (!batchAssignUserIdsParams) {
        throw new Error(
          'Parameter `batchAssignUserIdsParams` is required when calling `batchAssignUserIds`.'
        );
      }

      if (!batchAssignUserIdsParams.cluster) {
        throw new Error(
          'Parameter `batchAssignUserIdsParams.cluster` is required when calling `batchAssignUserIds`.'
        );
      }
      if (!batchAssignUserIdsParams.users) {
        throw new Error(
          'Parameter `batchAssignUserIdsParams.users` is required when calling `batchAssignUserIds`.'
        );
      }

      const requestPath = '/1/clusters/mapping/batch';
      const headers: Headers = {};
      const queryParameters: QueryParameters = {};

      if (xAlgoliaUserID !== undefined) {
        headers['X-Algolia-User-ID'] = xAlgoliaUserID.toString();
      }

      const request: Request = {
        method: 'POST',
        path: requestPath,
        queryParameters,
        headers,
        data: batchAssignUserIdsParams,
      };

      return transporter.request(request, requestOptions);
    },

    /**
     * Send a batch of dictionary entries.
     *
     * @summary Batch dictionary entries.
     * @param batchDictionaryEntries - The batchDictionaryEntries object.
     * @param batchDictionaryEntries.dictionaryName - The dictionary to search in.
     * @param batchDictionaryEntries.batchDictionaryEntriesParams - The batchDictionaryEntriesParams object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    batchDictionaryEntries(
      {
        dictionaryName,
        batchDictionaryEntriesParams,
      }: BatchDictionaryEntriesProps,
      requestOptions?: RequestOptions
    ): Promise<UpdatedAtResponse> {
      if (!dictionaryName) {
        throw new Error(
          'Parameter `dictionaryName` is required when calling `batchDictionaryEntries`.'
        );
      }

      if (!batchDictionaryEntriesParams) {
        throw new Error(
          'Parameter `batchDictionaryEntriesParams` is required when calling `batchDictionaryEntries`.'
        );
      }

      if (!batchDictionaryEntriesParams.requests) {
        throw new Error(
          'Parameter `batchDictionaryEntriesParams.requests` is required when calling `batchDictionaryEntries`.'
        );
      }

      const requestPath = '/1/dictionaries/{dictionaryName}/batch'.replace(
        '{dictionaryName}',
        encodeURIComponent(dictionaryName)
      );
      const headers: Headers = {};
      const queryParameters: QueryParameters = {};

      const request: Request = {
        method: 'POST',
        path: requestPath,
        queryParameters,
        headers,
        data: batchDictionaryEntriesParams,
      };

      return transporter.request(request, requestOptions);
    },

    /**
     * This method allows you to retrieve all index content. It can retrieve up to 1,000 records per call and supports full text search and filters. For performance reasons, some features are not supported, including `distinct`, sorting by `typos`, `words` or `geo distance`. When there is more content to be browsed, the response contains a cursor field. This cursor has to be passed to the subsequent call to browse in order to get the next page of results. When the end of the index has been reached, the cursor field is absent from the response.
     *
     * @summary Retrieve all index content.
     * @param browse - The browse object.
     * @param browse.indexName - The index in which to perform the request.
     * @param browse.browseRequest - The browseRequest object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    browse(
      { indexName, browseRequest }: BrowseProps,
      requestOptions?: RequestOptions
    ): Promise<BrowseResponse> {
      if (!indexName) {
        throw new Error(
          'Parameter `indexName` is required when calling `browse`.'
        );
      }

      const requestPath = '/1/indexes/{indexName}/browse'.replace(
        '{indexName}',
        encodeURIComponent(indexName)
      );
      const headers: Headers = {};
      const queryParameters: QueryParameters = {};

      const request: Request = {
        method: 'POST',
        path: requestPath,
        queryParameters,
        headers,
        data: browseRequest,
      };

      return transporter.request(request, requestOptions);
    },

    /**
     * Remove all synonyms from an index.
     *
     * @summary Clear all synonyms.
     * @param clearAllSynonyms - The clearAllSynonyms object.
     * @param clearAllSynonyms.indexName - The index in which to perform the request.
     * @param clearAllSynonyms.forwardToReplicas - When true, changes are also propagated to replicas of the given indexName.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    clearAllSynonyms(
      { indexName, forwardToReplicas }: ClearAllSynonymsProps,
      requestOptions?: RequestOptions
    ): Promise<UpdatedAtResponse> {
      if (!indexName) {
        throw new Error(
          'Parameter `indexName` is required when calling `clearAllSynonyms`.'
        );
      }

      const requestPath = '/1/indexes/{indexName}/synonyms/clear'.replace(
        '{indexName}',
        encodeURIComponent(indexName)
      );
      const headers: Headers = {};
      const queryParameters: QueryParameters = {};

      if (forwardToReplicas !== undefined) {
        queryParameters.forwardToReplicas = forwardToReplicas.toString();
      }

      const request: Request = {
        method: 'POST',
        path: requestPath,
        queryParameters,
        headers,
      };

      return transporter.request(request, requestOptions);
    },

    /**
     * Delete an index\'s content, but leave settings and index-specific API keys untouched.
     *
     * @summary Clear all objects from an index.
     * @param clearObjects - The clearObjects object.
     * @param clearObjects.indexName - The index in which to perform the request.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    clearObjects(
      { indexName }: ClearObjectsProps,
      requestOptions?: RequestOptions
    ): Promise<UpdatedAtResponse> {
      if (!indexName) {
        throw new Error(
          'Parameter `indexName` is required when calling `clearObjects`.'
        );
      }

      const requestPath = '/1/indexes/{indexName}/clear'.replace(
        '{indexName}',
        encodeURIComponent(indexName)
      );
      const headers: Headers = {};
      const queryParameters: QueryParameters = {};

      const request: Request = {
        method: 'POST',
        path: requestPath,
        queryParameters,
        headers,
      };

      return transporter.request(request, requestOptions);
    },

    /**
     * Delete all Rules in the index.
     *
     * @summary Clear Rules.
     * @param clearRules - The clearRules object.
     * @param clearRules.indexName - The index in which to perform the request.
     * @param clearRules.forwardToReplicas - When true, changes are also propagated to replicas of the given indexName.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    clearRules(
      { indexName, forwardToReplicas }: ClearRulesProps,
      requestOptions?: RequestOptions
    ): Promise<UpdatedAtResponse> {
      if (!indexName) {
        throw new Error(
          'Parameter `indexName` is required when calling `clearRules`.'
        );
      }

      const requestPath = '/1/indexes/{indexName}/rules/clear'.replace(
        '{indexName}',
        encodeURIComponent(indexName)
      );
      const headers: Headers = {};
      const queryParameters: QueryParameters = {};

      if (forwardToReplicas !== undefined) {
        queryParameters.forwardToReplicas = forwardToReplicas.toString();
      }

      const request: Request = {
        method: 'POST',
        path: requestPath,
        queryParameters,
        headers,
      };

      return transporter.request(request, requestOptions);
    },

    /**
     * This method allow you to send requests to the Algolia REST API.
     *
     * @summary Send requests to the Algolia REST API.
     * @param del - The del object.
     * @param del.path - The path of the API endpoint to target, anything after the /1 needs to be specified.
     * @param del.parameters - Query parameters to be applied to the current query.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    del(
      { path, parameters }: DelProps,
      requestOptions?: RequestOptions
    ): Promise<Record<string, any>> {
      if (!path) {
        throw new Error('Parameter `path` is required when calling `del`.');
      }

      const requestPath = '/1{path}'.replace('{path}', path);
      const headers: Headers = {};
      const queryParameters: QueryParameters = parameters || {};

      const request: Request = {
        method: 'DELETE',
        path: requestPath,
        queryParameters,
        headers,
      };

      return transporter.request(request, requestOptions);
    },

    /**
     * Delete an existing API Key.
     *
     * @summary Delete an API key.
     * @param deleteApiKey - The deleteApiKey object.
     * @param deleteApiKey.key - API Key string.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    deleteApiKey(
      { key }: DeleteApiKeyProps,
      requestOptions?: RequestOptions
    ): Promise<DeleteApiKeyResponse> {
      if (!key) {
        throw new Error(
          'Parameter `key` is required when calling `deleteApiKey`.'
        );
      }

      const requestPath = '/1/keys/{key}'.replace(
        '{key}',
        encodeURIComponent(key)
      );
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
     * Remove all objects matching a filter (including geo filters). This method enables you to delete one or more objects based on filters (numeric, facet, tag or geo queries). It doesn\'t accept empty filters or a query.
     *
     * @summary Delete all records matching the query.
     * @param deleteBy - The deleteBy object.
     * @param deleteBy.indexName - The index in which to perform the request.
     * @param deleteBy.searchParams - The searchParams object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    deleteBy(
      { indexName, searchParams }: DeleteByProps,
      requestOptions?: RequestOptions
    ): Promise<DeletedAtResponse> {
      if (!indexName) {
        throw new Error(
          'Parameter `indexName` is required when calling `deleteBy`.'
        );
      }

      if (!searchParams) {
        throw new Error(
          'Parameter `searchParams` is required when calling `deleteBy`.'
        );
      }

      const requestPath = '/1/indexes/{indexName}/deleteByQuery'.replace(
        '{indexName}',
        encodeURIComponent(indexName)
      );
      const headers: Headers = {};
      const queryParameters: QueryParameters = {};

      const request: Request = {
        method: 'POST',
        path: requestPath,
        queryParameters,
        headers,
        data: searchParams,
      };

      return transporter.request(request, requestOptions);
    },

    /**
     * Delete an existing index.
     *
     * @summary Delete index.
     * @param deleteIndex - The deleteIndex object.
     * @param deleteIndex.indexName - The index in which to perform the request.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    deleteIndex(
      { indexName }: DeleteIndexProps,
      requestOptions?: RequestOptions
    ): Promise<DeletedAtResponse> {
      if (!indexName) {
        throw new Error(
          'Parameter `indexName` is required when calling `deleteIndex`.'
        );
      }

      const requestPath = '/1/indexes/{indexName}'.replace(
        '{indexName}',
        encodeURIComponent(indexName)
      );
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
     * Delete an existing object.
     *
     * @summary Delete an object.
     * @param deleteObject - The deleteObject object.
     * @param deleteObject.indexName - The index in which to perform the request.
     * @param deleteObject.objectID - Unique identifier of an object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    deleteObject(
      { indexName, objectID }: DeleteObjectProps,
      requestOptions?: RequestOptions
    ): Promise<DeletedAtResponse> {
      if (!indexName) {
        throw new Error(
          'Parameter `indexName` is required when calling `deleteObject`.'
        );
      }

      if (!objectID) {
        throw new Error(
          'Parameter `objectID` is required when calling `deleteObject`.'
        );
      }

      const requestPath = '/1/indexes/{indexName}/{objectID}'
        .replace('{indexName}', encodeURIComponent(indexName))
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
     * Delete the Rule with the specified objectID.
     *
     * @summary Delete a rule.
     * @param deleteRule - The deleteRule object.
     * @param deleteRule.indexName - The index in which to perform the request.
     * @param deleteRule.objectID - Unique identifier of an object.
     * @param deleteRule.forwardToReplicas - When true, changes are also propagated to replicas of the given indexName.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    deleteRule(
      { indexName, objectID, forwardToReplicas }: DeleteRuleProps,
      requestOptions?: RequestOptions
    ): Promise<UpdatedAtResponse> {
      if (!indexName) {
        throw new Error(
          'Parameter `indexName` is required when calling `deleteRule`.'
        );
      }

      if (!objectID) {
        throw new Error(
          'Parameter `objectID` is required when calling `deleteRule`.'
        );
      }

      const requestPath = '/1/indexes/{indexName}/rules/{objectID}'
        .replace('{indexName}', encodeURIComponent(indexName))
        .replace('{objectID}', encodeURIComponent(objectID));
      const headers: Headers = {};
      const queryParameters: QueryParameters = {};

      if (forwardToReplicas !== undefined) {
        queryParameters.forwardToReplicas = forwardToReplicas.toString();
      }

      const request: Request = {
        method: 'DELETE',
        path: requestPath,
        queryParameters,
        headers,
      };

      return transporter.request(request, requestOptions);
    },

    /**
     * Remove a single source from the list of allowed sources.
     *
     * @summary Remove a single source.
     * @param deleteSource - The deleteSource object.
     * @param deleteSource.source - The IP range of the source.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    deleteSource(
      { source }: DeleteSourceProps,
      requestOptions?: RequestOptions
    ): Promise<DeleteSourceResponse> {
      if (!source) {
        throw new Error(
          'Parameter `source` is required when calling `deleteSource`.'
        );
      }

      const requestPath = '/1/security/sources/{source}'.replace(
        '{source}',
        encodeURIComponent(source)
      );
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
     * Delete a single synonyms set, identified by the given objectID.
     *
     * @summary Delete synonym.
     * @param deleteSynonym - The deleteSynonym object.
     * @param deleteSynonym.indexName - The index in which to perform the request.
     * @param deleteSynonym.objectID - Unique identifier of an object.
     * @param deleteSynonym.forwardToReplicas - When true, changes are also propagated to replicas of the given indexName.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    deleteSynonym(
      { indexName, objectID, forwardToReplicas }: DeleteSynonymProps,
      requestOptions?: RequestOptions
    ): Promise<DeletedAtResponse> {
      if (!indexName) {
        throw new Error(
          'Parameter `indexName` is required when calling `deleteSynonym`.'
        );
      }

      if (!objectID) {
        throw new Error(
          'Parameter `objectID` is required when calling `deleteSynonym`.'
        );
      }

      const requestPath = '/1/indexes/{indexName}/synonyms/{objectID}'
        .replace('{indexName}', encodeURIComponent(indexName))
        .replace('{objectID}', encodeURIComponent(objectID));
      const headers: Headers = {};
      const queryParameters: QueryParameters = {};

      if (forwardToReplicas !== undefined) {
        queryParameters.forwardToReplicas = forwardToReplicas.toString();
      }

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
     * @summary Send requests to the Algolia REST API.
     * @param get - The get object.
     * @param get.path - The path of the API endpoint to target, anything after the /1 needs to be specified.
     * @param get.parameters - Query parameters to be applied to the current query.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    get(
      { path, parameters }: GetProps,
      requestOptions?: RequestOptions
    ): Promise<Record<string, any>> {
      if (!path) {
        throw new Error('Parameter `path` is required when calling `get`.');
      }

      const requestPath = '/1{path}'.replace('{path}', path);
      const headers: Headers = {};
      const queryParameters: QueryParameters = parameters || {};

      const request: Request = {
        method: 'GET',
        path: requestPath,
        queryParameters,
        headers,
      };

      return transporter.request(request, requestOptions);
    },

    /**
     * Get the permissions of an API key.
     *
     * @summary Get an API key.
     * @param getApiKey - The getApiKey object.
     * @param getApiKey.key - API Key string.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    getApiKey(
      { key }: GetApiKeyProps,
      requestOptions?: RequestOptions
    ): Promise<Key> {
      if (!key) {
        throw new Error(
          'Parameter `key` is required when calling `getApiKey`.'
        );
      }

      const requestPath = '/1/keys/{key}'.replace(
        '{key}',
        encodeURIComponent(key)
      );
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
     * List dictionaries supported per language.
     *
     * @summary List available languages.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    getDictionaryLanguages(
      requestOptions?: RequestOptions
    ): Promise<Record<string, Languages>> {
      const requestPath = '/1/dictionaries/*/languages';
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
     * Retrieve dictionaries settings. The API stores languages whose standard entries are disabled. Fetch settings does not return false values.
     *
     * @summary Retrieve dictionaries settings.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    getDictionarySettings(
      requestOptions?: RequestOptions
    ): Promise<GetDictionarySettingsResponse> {
      const requestPath = '/1/dictionaries/*/settings';
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
     * Return the latest log entries.
     *
     * @summary Return the latest log entries.
     * @param getLogs - The getLogs object.
     * @param getLogs.offset - First entry to retrieve (zero-based). Log entries are sorted by decreasing date, therefore 0 designates the most recent log entry.
     * @param getLogs.length - Maximum number of entries to retrieve. The maximum allowed value is 1000.
     * @param getLogs.indexName - Index for which log entries should be retrieved. When omitted, log entries are retrieved across all indices.
     * @param getLogs.type - Type of log entries to retrieve. When omitted, all log entries are retrieved.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    getLogs(
      { offset, length, indexName, type }: GetLogsProps,
      requestOptions?: RequestOptions
    ): Promise<GetLogsResponse> {
      const requestPath = '/1/logs';
      const headers: Headers = {};
      const queryParameters: QueryParameters = {};

      if (offset !== undefined) {
        queryParameters.offset = offset.toString();
      }

      if (length !== undefined) {
        queryParameters.length = length.toString();
      }

      if (indexName !== undefined) {
        queryParameters.indexName = indexName.toString();
      }

      if (type !== undefined) {
        queryParameters.type = type.toString();
      }

      const request: Request = {
        method: 'GET',
        path: requestPath,
        queryParameters,
        headers,
      };

      return transporter.request(request, requestOptions);
    },

    /**
     * Retrieve one object from the index.
     *
     * @summary Retrieve an object.
     * @param getObject - The getObject object.
     * @param getObject.indexName - The index in which to perform the request.
     * @param getObject.objectID - Unique identifier of an object.
     * @param getObject.attributesToRetrieve - List of attributes to retrieve. If not specified, all retrievable attributes are returned.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    getObject(
      { indexName, objectID, attributesToRetrieve }: GetObjectProps,
      requestOptions?: RequestOptions
    ): Promise<Record<string, string>> {
      if (!indexName) {
        throw new Error(
          'Parameter `indexName` is required when calling `getObject`.'
        );
      }

      if (!objectID) {
        throw new Error(
          'Parameter `objectID` is required when calling `getObject`.'
        );
      }

      const requestPath = '/1/indexes/{indexName}/{objectID}'
        .replace('{indexName}', encodeURIComponent(indexName))
        .replace('{objectID}', encodeURIComponent(objectID));
      const headers: Headers = {};
      const queryParameters: QueryParameters = {};

      if (attributesToRetrieve !== undefined) {
        queryParameters.attributesToRetrieve = attributesToRetrieve.toString();
      }

      const request: Request = {
        method: 'GET',
        path: requestPath,
        queryParameters,
        headers,
      };

      return transporter.request(request, requestOptions);
    },

    /**
     * Retrieve one or more objects, potentially from different indices, in a single API call.
     *
     * @summary Retrieve one or more objects.
     * @param getObjectsParams - The Algolia object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    getObjects(
      getObjectsParams: GetObjectsParams,
      requestOptions?: RequestOptions
    ): Promise<GetObjectsResponse> {
      if (!getObjectsParams) {
        throw new Error(
          'Parameter `getObjectsParams` is required when calling `getObjects`.'
        );
      }

      const requestPath = '/1/indexes/*/objects';
      const headers: Headers = {};
      const queryParameters: QueryParameters = {};

      const request: Request = {
        method: 'POST',
        path: requestPath,
        queryParameters,
        headers,
        data: getObjectsParams,
        useReadTransporter: true,
        cacheable: true,
      };

      return transporter.request(request, requestOptions);
    },

    /**
     * Retrieve the Rule with the specified objectID.
     *
     * @summary Get a rule.
     * @param getRule - The getRule object.
     * @param getRule.indexName - The index in which to perform the request.
     * @param getRule.objectID - Unique identifier of an object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    getRule(
      { indexName, objectID }: GetRuleProps,
      requestOptions?: RequestOptions
    ): Promise<Rule> {
      if (!indexName) {
        throw new Error(
          'Parameter `indexName` is required when calling `getRule`.'
        );
      }

      if (!objectID) {
        throw new Error(
          'Parameter `objectID` is required when calling `getRule`.'
        );
      }

      const requestPath = '/1/indexes/{indexName}/rules/{objectID}'
        .replace('{indexName}', encodeURIComponent(indexName))
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
     * Retrieve settings of an index.
     *
     * @summary Retrieve settings of an index.
     * @param getSettings - The getSettings object.
     * @param getSettings.indexName - The index in which to perform the request.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    getSettings(
      { indexName }: GetSettingsProps,
      requestOptions?: RequestOptions
    ): Promise<IndexSettings> {
      if (!indexName) {
        throw new Error(
          'Parameter `indexName` is required when calling `getSettings`.'
        );
      }

      const requestPath = '/1/indexes/{indexName}/settings'.replace(
        '{indexName}',
        encodeURIComponent(indexName)
      );
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
     * List all allowed sources.
     *
     * @summary List all allowed sources.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    getSources(requestOptions?: RequestOptions): Promise<Source[]> {
      const requestPath = '/1/security/sources';
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
     * Fetch a synonym object identified by its objectID.
     *
     * @summary Get synonym.
     * @param getSynonym - The getSynonym object.
     * @param getSynonym.indexName - The index in which to perform the request.
     * @param getSynonym.objectID - Unique identifier of an object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    getSynonym(
      { indexName, objectID }: GetSynonymProps,
      requestOptions?: RequestOptions
    ): Promise<SynonymHit> {
      if (!indexName) {
        throw new Error(
          'Parameter `indexName` is required when calling `getSynonym`.'
        );
      }

      if (!objectID) {
        throw new Error(
          'Parameter `objectID` is required when calling `getSynonym`.'
        );
      }

      const requestPath = '/1/indexes/{indexName}/synonyms/{objectID}'
        .replace('{indexName}', encodeURIComponent(indexName))
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
     * Check the current status of a given task.
     *
     * @summary Check the status of a task.
     * @param getTask - The getTask object.
     * @param getTask.indexName - The index in which to perform the request.
     * @param getTask.taskID - Unique identifier of an task. Numeric value (up to 64bits).
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    getTask(
      { indexName, taskID }: GetTaskProps,
      requestOptions?: RequestOptions
    ): Promise<GetTaskResponse> {
      if (!indexName) {
        throw new Error(
          'Parameter `indexName` is required when calling `getTask`.'
        );
      }

      if (!taskID) {
        throw new Error(
          'Parameter `taskID` is required when calling `getTask`.'
        );
      }

      const requestPath = '/1/indexes/{indexName}/task/{taskID}'
        .replace('{indexName}', encodeURIComponent(indexName))
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
     * Get the top 10 userIDs with the highest number of records per cluster. The data returned will usually be a few seconds behind real time, because userID usage may take up to a few seconds to propagate to the different clusters. Upon success, the response is 200 OK and contains the following array of userIDs and clusters.
     *
     * @summary Get top userID.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    getTopUserIds(
      requestOptions?: RequestOptions
    ): Promise<GetTopUserIdsResponse> {
      const requestPath = '/1/clusters/mapping/top';
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
     * Returns the userID data stored in the mapping. The data returned will usually be a few seconds behind real time, because userID usage may take up to a few seconds to propagate to the different clusters. Upon success, the response is 200 OK and contains the following userID data.
     *
     * @summary Get userID.
     * @param getUserId - The getUserId object.
     * @param getUserId.userID - UserID to assign.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    getUserId(
      { userID }: GetUserIdProps,
      requestOptions?: RequestOptions
    ): Promise<UserId> {
      if (!userID) {
        throw new Error(
          'Parameter `userID` is required when calling `getUserId`.'
        );
      }

      const requestPath = '/1/clusters/mapping/{userID}'.replace(
        '{userID}',
        encodeURIComponent(userID)
      );
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
     * Get the status of your clusters\' migrations or user creations. Creating a large batch of users or migrating your multi-cluster may take quite some time. This method lets you retrieve the status of the migration, so you can know when it\'s done. Upon success, the response is 200 OK. A successful response indicates that the operation has been taken into account, and the userIDs are directly usable.
     *
     * @summary Get migration status.
     * @param hasPendingMappings - The hasPendingMappings object.
     * @param hasPendingMappings.getClusters - If the clusters pending mapping state should be on the response.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    hasPendingMappings(
      { getClusters }: HasPendingMappingsProps,
      requestOptions?: RequestOptions
    ): Promise<HasPendingMappingsResponse> {
      const requestPath = '/1/clusters/mapping/pending';
      const headers: Headers = {};
      const queryParameters: QueryParameters = {};

      if (getClusters !== undefined) {
        queryParameters.getClusters = getClusters.toString();
      }

      const request: Request = {
        method: 'GET',
        path: requestPath,
        queryParameters,
        headers,
      };

      return transporter.request(request, requestOptions);
    },

    /**
     * List API keys, along with their associated rights.
     *
     * @summary List API Keys.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    listApiKeys(requestOptions?: RequestOptions): Promise<ListApiKeysResponse> {
      const requestPath = '/1/keys';
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
     * List the clusters available in a multi-clusters setup for a single appID. Upon success, the response is 200 OK and contains the following clusters.
     *
     * @summary List clusters.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    listClusters(
      requestOptions?: RequestOptions
    ): Promise<ListClustersResponse> {
      const requestPath = '/1/clusters';
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
     * List existing indexes from an application.
     *
     * @summary List existing indexes.
     * @param listIndices - The listIndices object.
     * @param listIndices.page - Requested page (zero-based). When specified, will retrieve a specific page; the page size is implicitly set to 100. When null, will retrieve all indices (no pagination).
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    listIndices(
      { page }: ListIndicesProps,
      requestOptions?: RequestOptions
    ): Promise<ListIndicesResponse> {
      const requestPath = '/1/indexes';
      const headers: Headers = {};
      const queryParameters: QueryParameters = {};

      if (page !== undefined) {
        queryParameters.page = page.toString();
      }

      const request: Request = {
        method: 'GET',
        path: requestPath,
        queryParameters,
        headers,
      };

      return transporter.request(request, requestOptions);
    },

    /**
     * List the userIDs assigned to a multi-clusters appID. The data returned will usually be a few seconds behind real time, because userID usage may take up to a few seconds to propagate to the different clusters. Upon success, the response is 200 OK and contains the following userIDs data.
     *
     * @summary List userIDs.
     * @param listUserIds - The listUserIds object.
     * @param listUserIds.page - Requested page (zero-based). When specified, will retrieve a specific page; the page size is implicitly set to 100. When null, will retrieve all indices (no pagination).
     * @param listUserIds.hitsPerPage - Maximum number of objects to retrieve.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    listUserIds(
      { page, hitsPerPage }: ListUserIdsProps,
      requestOptions?: RequestOptions
    ): Promise<ListUserIdsResponse> {
      const requestPath = '/1/clusters/mapping';
      const headers: Headers = {};
      const queryParameters: QueryParameters = {};

      if (page !== undefined) {
        queryParameters.page = page.toString();
      }

      if (hitsPerPage !== undefined) {
        queryParameters.hitsPerPage = hitsPerPage.toString();
      }

      const request: Request = {
        method: 'GET',
        path: requestPath,
        queryParameters,
        headers,
      };

      return transporter.request(request, requestOptions);
    },

    /**
     * Perform multiple write operations, potentially targeting multiple indices, in a single API call.
     *
     * @summary Batch operations to many indices.
     * @param batchParams - The batchParams object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    multipleBatch(
      batchParams: BatchParams,
      requestOptions?: RequestOptions
    ): Promise<MultipleBatchResponse> {
      if (!batchParams) {
        throw new Error(
          'Parameter `batchParams` is required when calling `multipleBatch`.'
        );
      }

      const requestPath = '/1/indexes/*/batch';
      const headers: Headers = {};
      const queryParameters: QueryParameters = {};

      const request: Request = {
        method: 'POST',
        path: requestPath,
        queryParameters,
        headers,
        data: batchParams,
      };

      return transporter.request(request, requestOptions);
    },

    /**
     * Performs a copy or a move operation on a index.
     *
     * @summary Copy/move index.
     * @param operationIndex - The operationIndex object.
     * @param operationIndex.indexName - The index in which to perform the request.
     * @param operationIndex.operationIndexParams - The operationIndexParams object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    operationIndex(
      { indexName, operationIndexParams }: OperationIndexProps,
      requestOptions?: RequestOptions
    ): Promise<UpdatedAtResponse> {
      if (!indexName) {
        throw new Error(
          'Parameter `indexName` is required when calling `operationIndex`.'
        );
      }

      if (!operationIndexParams) {
        throw new Error(
          'Parameter `operationIndexParams` is required when calling `operationIndex`.'
        );
      }

      if (!operationIndexParams.operation) {
        throw new Error(
          'Parameter `operationIndexParams.operation` is required when calling `operationIndex`.'
        );
      }
      if (!operationIndexParams.destination) {
        throw new Error(
          'Parameter `operationIndexParams.destination` is required when calling `operationIndex`.'
        );
      }

      const requestPath = '/1/indexes/{indexName}/operation'.replace(
        '{indexName}',
        encodeURIComponent(indexName)
      );
      const headers: Headers = {};
      const queryParameters: QueryParameters = {};

      const request: Request = {
        method: 'POST',
        path: requestPath,
        queryParameters,
        headers,
        data: operationIndexParams,
      };

      return transporter.request(request, requestOptions);
    },

    /**
     * Update one or more attributes of an existing object. This method lets you update only a part of an existing object, either by adding new attributes or updating existing ones. You can partially update several objects in a single method call. If the index targeted by this operation doesn\'t exist yet, it\'s automatically created.
     *
     * @summary Partially update an object.
     * @param partialUpdateObject - The partialUpdateObject object.
     * @param partialUpdateObject.indexName - The index in which to perform the request.
     * @param partialUpdateObject.objectID - Unique identifier of an object.
     * @param partialUpdateObject.attributeOrBuiltInOperation - List of attributes to update.
     * @param partialUpdateObject.createIfNotExists - Creates the record if it does not exist yet.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    partialUpdateObject(
      {
        indexName,
        objectID,
        attributeOrBuiltInOperation,
        createIfNotExists,
      }: PartialUpdateObjectProps,
      requestOptions?: RequestOptions
    ): Promise<UpdatedAtWithObjectIdResponse> {
      if (!indexName) {
        throw new Error(
          'Parameter `indexName` is required when calling `partialUpdateObject`.'
        );
      }

      if (!objectID) {
        throw new Error(
          'Parameter `objectID` is required when calling `partialUpdateObject`.'
        );
      }

      if (!attributeOrBuiltInOperation) {
        throw new Error(
          'Parameter `attributeOrBuiltInOperation` is required when calling `partialUpdateObject`.'
        );
      }

      const requestPath = '/1/indexes/{indexName}/{objectID}/partial'
        .replace('{indexName}', encodeURIComponent(indexName))
        .replace('{objectID}', encodeURIComponent(objectID));
      const headers: Headers = {};
      const queryParameters: QueryParameters = {};

      if (createIfNotExists !== undefined) {
        queryParameters.createIfNotExists = createIfNotExists.toString();
      }

      const request: Request = {
        method: 'POST',
        path: requestPath,
        queryParameters,
        headers,
        data: attributeOrBuiltInOperation,
      };

      return transporter.request(request, requestOptions);
    },

    /**
     * This method allow you to send requests to the Algolia REST API.
     *
     * @summary Send requests to the Algolia REST API.
     * @param post - The post object.
     * @param post.path - The path of the API endpoint to target, anything after the /1 needs to be specified.
     * @param post.parameters - Query parameters to be applied to the current query.
     * @param post.body - The parameters to send with the custom request.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    post(
      { path, parameters, body }: PostProps,
      requestOptions?: RequestOptions
    ): Promise<Record<string, any>> {
      if (!path) {
        throw new Error('Parameter `path` is required when calling `post`.');
      }

      const requestPath = '/1{path}'.replace('{path}', path);
      const headers: Headers = {};
      const queryParameters: QueryParameters = parameters || {};

      const request: Request = {
        method: 'POST',
        path: requestPath,
        queryParameters,
        headers,
        data: body,
      };

      return transporter.request(request, requestOptions);
    },

    /**
     * This method allow you to send requests to the Algolia REST API.
     *
     * @summary Send requests to the Algolia REST API.
     * @param put - The put object.
     * @param put.path - The path of the API endpoint to target, anything after the /1 needs to be specified.
     * @param put.parameters - Query parameters to be applied to the current query.
     * @param put.body - The parameters to send with the custom request.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    put(
      { path, parameters, body }: PutProps,
      requestOptions?: RequestOptions
    ): Promise<Record<string, any>> {
      if (!path) {
        throw new Error('Parameter `path` is required when calling `put`.');
      }

      const requestPath = '/1{path}'.replace('{path}', path);
      const headers: Headers = {};
      const queryParameters: QueryParameters = parameters || {};

      const request: Request = {
        method: 'PUT',
        path: requestPath,
        queryParameters,
        headers,
        data: body,
      };

      return transporter.request(request, requestOptions);
    },

    /**
     * Remove a userID and its associated data from the multi-clusters. Upon success, the response is 200 OK and a task is created to remove the userID data and mapping.
     *
     * @summary Remove userID.
     * @param removeUserId - The removeUserId object.
     * @param removeUserId.userID - UserID to assign.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    removeUserId(
      { userID }: RemoveUserIdProps,
      requestOptions?: RequestOptions
    ): Promise<RemoveUserIdResponse> {
      if (!userID) {
        throw new Error(
          'Parameter `userID` is required when calling `removeUserId`.'
        );
      }

      const requestPath = '/1/clusters/mapping/{userID}'.replace(
        '{userID}',
        encodeURIComponent(userID)
      );
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
     * Replace all allowed sources.
     *
     * @summary Replace all allowed sources.
     * @param replaceSources - The replaceSources object.
     * @param replaceSources.source - The sources to allow.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    replaceSources(
      { source }: ReplaceSourcesProps,
      requestOptions?: RequestOptions
    ): Promise<ReplaceSourceResponse> {
      if (!source) {
        throw new Error(
          'Parameter `source` is required when calling `replaceSources`.'
        );
      }

      const requestPath = '/1/security/sources';
      const headers: Headers = {};
      const queryParameters: QueryParameters = {};

      const request: Request = {
        method: 'PUT',
        path: requestPath,
        queryParameters,
        headers,
        data: source,
      };

      return transporter.request(request, requestOptions);
    },

    /**
     * Restore a deleted API key, along with its associated rights.
     *
     * @summary Restore an API key.
     * @param restoreApiKey - The restoreApiKey object.
     * @param restoreApiKey.key - API Key string.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    restoreApiKey(
      { key }: RestoreApiKeyProps,
      requestOptions?: RequestOptions
    ): Promise<AddApiKeyResponse> {
      if (!key) {
        throw new Error(
          'Parameter `key` is required when calling `restoreApiKey`.'
        );
      }

      const requestPath = '/1/keys/{key}/restore'.replace(
        '{key}',
        encodeURIComponent(key)
      );
      const headers: Headers = {};
      const queryParameters: QueryParameters = {};

      const request: Request = {
        method: 'POST',
        path: requestPath,
        queryParameters,
        headers,
      };

      return transporter.request(request, requestOptions);
    },

    /**
     * Add an object to the index, automatically assigning it an object ID.
     *
     * @summary Add an object to the index.
     * @param saveObject - The saveObject object.
     * @param saveObject.indexName - The index in which to perform the request.
     * @param saveObject.body - The Algolia record.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    saveObject(
      { indexName, body }: SaveObjectProps,
      requestOptions?: RequestOptions
    ): Promise<SaveObjectResponse> {
      if (!indexName) {
        throw new Error(
          'Parameter `indexName` is required when calling `saveObject`.'
        );
      }

      if (!body) {
        throw new Error(
          'Parameter `body` is required when calling `saveObject`.'
        );
      }

      const requestPath = '/1/indexes/{indexName}'.replace(
        '{indexName}',
        encodeURIComponent(indexName)
      );
      const headers: Headers = {};
      const queryParameters: QueryParameters = {};

      const request: Request = {
        method: 'POST',
        path: requestPath,
        queryParameters,
        headers,
        data: body,
      };

      return transporter.request(request, requestOptions);
    },

    /**
     * Create or update the Rule with the specified objectID.
     *
     * @summary Save/Update a rule.
     * @param saveRule - The saveRule object.
     * @param saveRule.indexName - The index in which to perform the request.
     * @param saveRule.objectID - Unique identifier of an object.
     * @param saveRule.rule - The rule object.
     * @param saveRule.forwardToReplicas - When true, changes are also propagated to replicas of the given indexName.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    saveRule(
      { indexName, objectID, rule, forwardToReplicas }: SaveRuleProps,
      requestOptions?: RequestOptions
    ): Promise<UpdatedRuleResponse> {
      if (!indexName) {
        throw new Error(
          'Parameter `indexName` is required when calling `saveRule`.'
        );
      }

      if (!objectID) {
        throw new Error(
          'Parameter `objectID` is required when calling `saveRule`.'
        );
      }

      if (!rule) {
        throw new Error(
          'Parameter `rule` is required when calling `saveRule`.'
        );
      }

      if (!rule.objectID) {
        throw new Error(
          'Parameter `rule.objectID` is required when calling `saveRule`.'
        );
      }

      const requestPath = '/1/indexes/{indexName}/rules/{objectID}'
        .replace('{indexName}', encodeURIComponent(indexName))
        .replace('{objectID}', encodeURIComponent(objectID));
      const headers: Headers = {};
      const queryParameters: QueryParameters = {};

      if (forwardToReplicas !== undefined) {
        queryParameters.forwardToReplicas = forwardToReplicas.toString();
      }

      const request: Request = {
        method: 'PUT',
        path: requestPath,
        queryParameters,
        headers,
        data: rule,
      };

      return transporter.request(request, requestOptions);
    },

    /**
     * Create/update multiple rules objects at once.
     *
     * @summary Save a batch of rules.
     * @param saveRules - The saveRules object.
     * @param saveRules.indexName - The index in which to perform the request.
     * @param saveRules.rule - The rule object.
     * @param saveRules.forwardToReplicas - When true, changes are also propagated to replicas of the given indexName.
     * @param saveRules.clearExistingRules - When true, existing Rules are cleared before adding this batch. When false, existing Rules are kept.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    saveRules(
      {
        indexName,
        rule,
        forwardToReplicas,
        clearExistingRules,
      }: SaveRulesProps,
      requestOptions?: RequestOptions
    ): Promise<UpdatedAtResponse> {
      if (!indexName) {
        throw new Error(
          'Parameter `indexName` is required when calling `saveRules`.'
        );
      }

      if (!rule) {
        throw new Error(
          'Parameter `rule` is required when calling `saveRules`.'
        );
      }

      const requestPath = '/1/indexes/{indexName}/rules/batch'.replace(
        '{indexName}',
        encodeURIComponent(indexName)
      );
      const headers: Headers = {};
      const queryParameters: QueryParameters = {};

      if (forwardToReplicas !== undefined) {
        queryParameters.forwardToReplicas = forwardToReplicas.toString();
      }

      if (clearExistingRules !== undefined) {
        queryParameters.clearExistingRules = clearExistingRules.toString();
      }

      const request: Request = {
        method: 'POST',
        path: requestPath,
        queryParameters,
        headers,
        data: rule,
      };

      return transporter.request(request, requestOptions);
    },

    /**
     * Create a new synonym object or update the existing synonym object with the given object ID.
     *
     * @summary Save synonym.
     * @param saveSynonym - The saveSynonym object.
     * @param saveSynonym.indexName - The index in which to perform the request.
     * @param saveSynonym.objectID - Unique identifier of an object.
     * @param saveSynonym.synonymHit - The synonymHit object.
     * @param saveSynonym.forwardToReplicas - When true, changes are also propagated to replicas of the given indexName.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    saveSynonym(
      { indexName, objectID, synonymHit, forwardToReplicas }: SaveSynonymProps,
      requestOptions?: RequestOptions
    ): Promise<SaveSynonymResponse> {
      if (!indexName) {
        throw new Error(
          'Parameter `indexName` is required when calling `saveSynonym`.'
        );
      }

      if (!objectID) {
        throw new Error(
          'Parameter `objectID` is required when calling `saveSynonym`.'
        );
      }

      if (!synonymHit) {
        throw new Error(
          'Parameter `synonymHit` is required when calling `saveSynonym`.'
        );
      }

      if (!synonymHit.objectID) {
        throw new Error(
          'Parameter `synonymHit.objectID` is required when calling `saveSynonym`.'
        );
      }

      const requestPath = '/1/indexes/{indexName}/synonyms/{objectID}'
        .replace('{indexName}', encodeURIComponent(indexName))
        .replace('{objectID}', encodeURIComponent(objectID));
      const headers: Headers = {};
      const queryParameters: QueryParameters = {};

      if (forwardToReplicas !== undefined) {
        queryParameters.forwardToReplicas = forwardToReplicas.toString();
      }

      const request: Request = {
        method: 'PUT',
        path: requestPath,
        queryParameters,
        headers,
        data: synonymHit,
      };

      return transporter.request(request, requestOptions);
    },

    /**
     * Create/update multiple synonym objects at once, potentially replacing the entire list of synonyms if replaceExistingSynonyms is true.
     *
     * @summary Save a batch of synonyms.
     * @param saveSynonyms - The saveSynonyms object.
     * @param saveSynonyms.indexName - The index in which to perform the request.
     * @param saveSynonyms.synonymHit - The synonymHit object.
     * @param saveSynonyms.forwardToReplicas - When true, changes are also propagated to replicas of the given indexName.
     * @param saveSynonyms.replaceExistingSynonyms - Replace all synonyms of the index with the ones sent with this request.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    saveSynonyms(
      {
        indexName,
        synonymHit,
        forwardToReplicas,
        replaceExistingSynonyms,
      }: SaveSynonymsProps,
      requestOptions?: RequestOptions
    ): Promise<UpdatedAtResponse> {
      if (!indexName) {
        throw new Error(
          'Parameter `indexName` is required when calling `saveSynonyms`.'
        );
      }

      if (!synonymHit) {
        throw new Error(
          'Parameter `synonymHit` is required when calling `saveSynonyms`.'
        );
      }

      const requestPath = '/1/indexes/{indexName}/synonyms/batch'.replace(
        '{indexName}',
        encodeURIComponent(indexName)
      );
      const headers: Headers = {};
      const queryParameters: QueryParameters = {};

      if (forwardToReplicas !== undefined) {
        queryParameters.forwardToReplicas = forwardToReplicas.toString();
      }

      if (replaceExistingSynonyms !== undefined) {
        queryParameters.replaceExistingSynonyms =
          replaceExistingSynonyms.toString();
      }

      const request: Request = {
        method: 'POST',
        path: requestPath,
        queryParameters,
        headers,
        data: synonymHit,
      };

      return transporter.request(request, requestOptions);
    },

    /**
     * Perform a search operation targeting one or many indices.
     *
     * @summary Search multiple indices.
     * @param searchMethodParams - The `search` requests and strategy.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    search(
      searchMethodParams: LegacySearchMethodProps | SearchMethodParams,
      requestOptions?: RequestOptions
    ): Promise<SearchResponses> {
      if (searchMethodParams && Array.isArray(searchMethodParams)) {
        const newSignatureRequest: SearchMethodParams = {
          requests: searchMethodParams.map(({ params, ...legacyRequest }) => {
            if (legacyRequest.type === 'facet') {
              return {
                ...legacyRequest,
                ...params,
                type: 'facet',
              };
            }

            return {
              ...legacyRequest,
              ...params,
              facet: undefined,
              maxFacetHits: undefined,
              facetQuery: undefined,
            };
          }),
        };

        // eslint-disable-next-line no-param-reassign
        searchMethodParams = newSignatureRequest;
      }

      if (!searchMethodParams) {
        throw new Error(
          'Parameter `searchMethodParams` is required when calling `search`.'
        );
      }

      if (!searchMethodParams.requests) {
        throw new Error(
          'Parameter `searchMethodParams.requests` is required when calling `search`.'
        );
      }

      const requestPath = '/1/indexes/*/queries';
      const headers: Headers = {};
      const queryParameters: QueryParameters = {};

      const request: Request = {
        method: 'POST',
        path: requestPath,
        queryParameters,
        headers,
        data: searchMethodParams,
        useReadTransporter: true,
        cacheable: true,
      };

      return transporter.request(request, requestOptions);
    },

    /**
     * Search the dictionary entries.
     *
     * @summary Search a dictionary entries.
     * @param searchDictionaryEntries - The searchDictionaryEntries object.
     * @param searchDictionaryEntries.dictionaryName - The dictionary to search in.
     * @param searchDictionaryEntries.searchDictionaryEntriesParams - The searchDictionaryEntriesParams object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    searchDictionaryEntries(
      {
        dictionaryName,
        searchDictionaryEntriesParams,
      }: SearchDictionaryEntriesProps,
      requestOptions?: RequestOptions
    ): Promise<UpdatedAtResponse> {
      if (!dictionaryName) {
        throw new Error(
          'Parameter `dictionaryName` is required when calling `searchDictionaryEntries`.'
        );
      }

      if (!searchDictionaryEntriesParams) {
        throw new Error(
          'Parameter `searchDictionaryEntriesParams` is required when calling `searchDictionaryEntries`.'
        );
      }

      if (!searchDictionaryEntriesParams.query) {
        throw new Error(
          'Parameter `searchDictionaryEntriesParams.query` is required when calling `searchDictionaryEntries`.'
        );
      }

      const requestPath = '/1/dictionaries/{dictionaryName}/search'.replace(
        '{dictionaryName}',
        encodeURIComponent(dictionaryName)
      );
      const headers: Headers = {};
      const queryParameters: QueryParameters = {};

      const request: Request = {
        method: 'POST',
        path: requestPath,
        queryParameters,
        headers,
        data: searchDictionaryEntriesParams,
        useReadTransporter: true,
        cacheable: true,
      };

      return transporter.request(request, requestOptions);
    },

    /**
     * Search for values of a given facet, optionally restricting the returned values to those contained in objects matching other search criteria.
     *
     * @summary Search for values of a given facet.
     * @param searchForFacetValues - The searchForFacetValues object.
     * @param searchForFacetValues.indexName - The index in which to perform the request.
     * @param searchForFacetValues.facetName - The facet name.
     * @param searchForFacetValues.searchForFacetValuesRequest - The searchForFacetValuesRequest object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    searchForFacetValues(
      {
        indexName,
        facetName,
        searchForFacetValuesRequest,
      }: SearchForFacetValuesProps,
      requestOptions?: RequestOptions
    ): Promise<SearchForFacetValuesResponse> {
      if (!indexName) {
        throw new Error(
          'Parameter `indexName` is required when calling `searchForFacetValues`.'
        );
      }

      if (!facetName) {
        throw new Error(
          'Parameter `facetName` is required when calling `searchForFacetValues`.'
        );
      }

      const requestPath = '/1/indexes/{indexName}/facets/{facetName}/query'
        .replace('{indexName}', encodeURIComponent(indexName))
        .replace('{facetName}', encodeURIComponent(facetName));
      const headers: Headers = {};
      const queryParameters: QueryParameters = {};

      const request: Request = {
        method: 'POST',
        path: requestPath,
        queryParameters,
        headers,
        data: searchForFacetValuesRequest,
        useReadTransporter: true,
        cacheable: true,
      };

      return transporter.request(request, requestOptions);
    },

    /**
     * Search for rules matching various criteria.
     *
     * @summary Search for rules.
     * @param searchRules - The searchRules object.
     * @param searchRules.indexName - The index in which to perform the request.
     * @param searchRules.searchRulesParams - The searchRulesParams object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    searchRules(
      { indexName, searchRulesParams }: SearchRulesProps,
      requestOptions?: RequestOptions
    ): Promise<SearchRulesResponse> {
      if (!indexName) {
        throw new Error(
          'Parameter `indexName` is required when calling `searchRules`.'
        );
      }

      if (!searchRulesParams) {
        throw new Error(
          'Parameter `searchRulesParams` is required when calling `searchRules`.'
        );
      }

      const requestPath = '/1/indexes/{indexName}/rules/search'.replace(
        '{indexName}',
        encodeURIComponent(indexName)
      );
      const headers: Headers = {};
      const queryParameters: QueryParameters = {};

      const request: Request = {
        method: 'POST',
        path: requestPath,
        queryParameters,
        headers,
        data: searchRulesParams,
        useReadTransporter: true,
        cacheable: true,
      };

      return transporter.request(request, requestOptions);
    },

    /**
     * Perform a search operation targeting one specific index.
     *
     * @summary Search in a single index.
     * @param searchSingleIndex - The searchSingleIndex object.
     * @param searchSingleIndex.indexName - The index in which to perform the request.
     * @param searchSingleIndex.searchParams - The searchParams object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    searchSingleIndex(
      { indexName, searchParams }: SearchSingleIndexProps,
      requestOptions?: RequestOptions
    ): Promise<SearchResponse> {
      if (!indexName) {
        throw new Error(
          'Parameter `indexName` is required when calling `searchSingleIndex`.'
        );
      }

      if (!searchParams) {
        throw new Error(
          'Parameter `searchParams` is required when calling `searchSingleIndex`.'
        );
      }

      const requestPath = '/1/indexes/{indexName}/query'.replace(
        '{indexName}',
        encodeURIComponent(indexName)
      );
      const headers: Headers = {};
      const queryParameters: QueryParameters = {};

      const request: Request = {
        method: 'POST',
        path: requestPath,
        queryParameters,
        headers,
        data: searchParams,
        useReadTransporter: true,
        cacheable: true,
      };

      return transporter.request(request, requestOptions);
    },

    /**
     * Search or browse all synonyms, optionally filtering them by type.
     *
     * @summary Search synonyms.
     * @param searchSynonyms - The searchSynonyms object.
     * @param searchSynonyms.indexName - The index in which to perform the request.
     * @param searchSynonyms.query - Search for specific synonyms matching this string.
     * @param searchSynonyms.type - Only search for specific types of synonyms.
     * @param searchSynonyms.page - Requested page (zero-based). When specified, will retrieve a specific page; the page size is implicitly set to 100. When null, will retrieve all indices (no pagination).
     * @param searchSynonyms.hitsPerPage - Maximum number of objects to retrieve.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    searchSynonyms(
      { indexName, query, type, page, hitsPerPage }: SearchSynonymsProps,
      requestOptions?: RequestOptions
    ): Promise<SearchSynonymsResponse> {
      if (!indexName) {
        throw new Error(
          'Parameter `indexName` is required when calling `searchSynonyms`.'
        );
      }

      const requestPath = '/1/indexes/{indexName}/synonyms/search'.replace(
        '{indexName}',
        encodeURIComponent(indexName)
      );
      const headers: Headers = {};
      const queryParameters: QueryParameters = {};

      if (query !== undefined) {
        queryParameters.query = query.toString();
      }

      if (type !== undefined) {
        queryParameters.type = type.toString();
      }

      if (page !== undefined) {
        queryParameters.page = page.toString();
      }

      if (hitsPerPage !== undefined) {
        queryParameters.hitsPerPage = hitsPerPage.toString();
      }

      const request: Request = {
        method: 'POST',
        path: requestPath,
        queryParameters,
        headers,
        useReadTransporter: true,
        cacheable: true,
      };

      return transporter.request(request, requestOptions);
    },

    /**
     * Search for userIDs. The data returned will usually be a few seconds behind real time, because userID usage may take up to a few seconds propagate to the different clusters. To keep updates moving quickly, the index of userIDs isn\'t built synchronously with the mapping. Instead, the index is built once every 12h, at the same time as the update of userID usage. For example, when you perform a modification like adding or moving a userID, the search will report an outdated value until the next rebuild of the mapping, which takes place every 12h. Upon success, the response is 200 OK and contains the following userIDs data.
     *
     * @summary Search userID.
     * @param searchUserIdsParams - The searchUserIdsParams object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    searchUserIds(
      searchUserIdsParams: SearchUserIdsParams,
      requestOptions?: RequestOptions
    ): Promise<SearchUserIdsResponse> {
      if (!searchUserIdsParams) {
        throw new Error(
          'Parameter `searchUserIdsParams` is required when calling `searchUserIds`.'
        );
      }

      if (!searchUserIdsParams.query) {
        throw new Error(
          'Parameter `searchUserIdsParams.query` is required when calling `searchUserIds`.'
        );
      }

      const requestPath = '/1/clusters/mapping/search';
      const headers: Headers = {};
      const queryParameters: QueryParameters = {};

      const request: Request = {
        method: 'POST',
        path: requestPath,
        queryParameters,
        headers,
        data: searchUserIdsParams,
        useReadTransporter: true,
        cacheable: true,
      };

      return transporter.request(request, requestOptions);
    },

    /**
     * Set dictionaries settings.
     *
     * @summary Set dictionaries settings.
     * @param dictionarySettingsParams - The dictionarySettingsParams object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    setDictionarySettings(
      dictionarySettingsParams: DictionarySettingsParams,
      requestOptions?: RequestOptions
    ): Promise<UpdatedAtResponse> {
      if (!dictionarySettingsParams) {
        throw new Error(
          'Parameter `dictionarySettingsParams` is required when calling `setDictionarySettings`.'
        );
      }

      if (!dictionarySettingsParams.disableStandardEntries) {
        throw new Error(
          'Parameter `dictionarySettingsParams.disableStandardEntries` is required when calling `setDictionarySettings`.'
        );
      }

      const requestPath = '/1/dictionaries/*/settings';
      const headers: Headers = {};
      const queryParameters: QueryParameters = {};

      const request: Request = {
        method: 'PUT',
        path: requestPath,
        queryParameters,
        headers,
        data: dictionarySettingsParams,
      };

      return transporter.request(request, requestOptions);
    },

    /**
     * Update settings of an index. Only specified settings are overridden; unspecified settings are left unchanged. Specifying null for a setting resets it to its default value.
     *
     * @summary Update settings of an index.
     * @param setSettings - The setSettings object.
     * @param setSettings.indexName - The index in which to perform the request.
     * @param setSettings.indexSettings - The indexSettings object.
     * @param setSettings.forwardToReplicas - When true, changes are also propagated to replicas of the given indexName.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    setSettings(
      { indexName, indexSettings, forwardToReplicas }: SetSettingsProps,
      requestOptions?: RequestOptions
    ): Promise<UpdatedAtResponse> {
      if (!indexName) {
        throw new Error(
          'Parameter `indexName` is required when calling `setSettings`.'
        );
      }

      if (!indexSettings) {
        throw new Error(
          'Parameter `indexSettings` is required when calling `setSettings`.'
        );
      }

      const requestPath = '/1/indexes/{indexName}/settings'.replace(
        '{indexName}',
        encodeURIComponent(indexName)
      );
      const headers: Headers = {};
      const queryParameters: QueryParameters = {};

      if (forwardToReplicas !== undefined) {
        queryParameters.forwardToReplicas = forwardToReplicas.toString();
      }

      const request: Request = {
        method: 'PUT',
        path: requestPath,
        queryParameters,
        headers,
        data: indexSettings,
      };

      return transporter.request(request, requestOptions);
    },

    /**
     * Replace every permission of an existing API key.
     *
     * @summary Update an API key.
     * @param updateApiKey - The updateApiKey object.
     * @param updateApiKey.key - API Key string.
     * @param updateApiKey.apiKey - The apiKey object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    updateApiKey(
      { key, apiKey }: UpdateApiKeyProps,
      requestOptions?: RequestOptions
    ): Promise<UpdateApiKeyResponse> {
      if (!key) {
        throw new Error(
          'Parameter `key` is required when calling `updateApiKey`.'
        );
      }

      if (!apiKey) {
        throw new Error(
          'Parameter `apiKey` is required when calling `updateApiKey`.'
        );
      }

      if (!apiKey.acl) {
        throw new Error(
          'Parameter `apiKey.acl` is required when calling `updateApiKey`.'
        );
      }

      const requestPath = '/1/keys/{key}'.replace(
        '{key}',
        encodeURIComponent(key)
      );
      const headers: Headers = {};
      const queryParameters: QueryParameters = {};

      const request: Request = {
        method: 'PUT',
        path: requestPath,
        queryParameters,
        headers,
        data: apiKey,
      };

      return transporter.request(request, requestOptions);
    },
  };
}

export type SearchClient = ReturnType<typeof createSearchClient>;