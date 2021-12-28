/* eslint-disable no-param-reassign */
import type { RequestOptions } from '../utils/types';

export * from './addApiKeyResponse';
export * from './anchoring';
export * from './apiKey';
export * from './appendSourceResponse';
export * from './assignUserIdObject';
export * from './assignUserIdResponse';
export * from './automaticFacetFilter';
export * from './baseIndexSettings';
export * from './baseSearchParams';
export * from './baseSearchResponse';
export * from './baseSearchResponseFacetsStats';
export * from './batchAssignUserIdsObject';
export * from './batchAssignUserIdsResponse';
export * from './batchDictionaryEntries';
export * from './batchDictionaryEntriesRequest';
export * from './batchObject';
export * from './batchResponse';
export * from './clearAllSynonymsResponse';
export * from './condition';
export * from './consequence';
export * from './consequenceHide';
export * from './createdAtObject';
export * from './deleteApiKeyResponse';
export * from './deleteIndexResponse';
export * from './deleteSourceResponse';
export * from './deleteSynonymResponse';
export * from './dictionaryEntriesResponse';
export * from './dictionaryEntry';
export * from './dictionaryLanguage';
export * from './dictionarySettingsRequest';
export * from './errorBase';
export * from './getDictionarySettingsResponse';
export * from './getLogsResponse';
export * from './getLogsResponseInnerQueries';
export * from './getLogsResponseLogs';
export * from './getTaskResponse';
export * from './getTopUserIdsResponse';
export * from './hasPendingMappingsResponse';
export * from './highlightResult';
export * from './index';
export * from './indexSettings';
export * from './indexSettingsAsSearchParams';
export * from './keyObject';
export * from './languages';
export * from './listApiKeysResponse';
export * from './listClustersResponse';
export * from './listIndicesResponse';
export * from './listUserIdsResponse';
export * from './multipleQueries';
export * from './multipleQueriesObject';
export * from './multipleQueriesResponse';
export * from './operation';
export * from './operationIndexObject';
export * from './operationIndexResponse';
export * from './params';
export * from './promote';
export * from './rankingInfo';
export * from './rankingInfoMatchedGeoLocation';
export * from './record';
export * from './removeUserIdResponse';
export * from './replaceSourceResponse';
export * from './rule';
export * from './saveObjectResponse';
export * from './saveSynonymResponse';
export * from './saveSynonymsResponse';
export * from './searchDictionaryEntries';
export * from './searchHits';
export * from './searchParams';
export * from './searchParamsAsString';
export * from './searchResponse';
export * from './searchRulesParams';
export * from './searchRulesResponse';
export * from './searchSynonymsResponse';
export * from './searchUserIdsObject';
export * from './searchUserIdsResponse';
export * from './searchUserIdsResponseHighlightResult';
export * from './searchUserIdsResponseHits';
export * from './setSettingsResponse';
export * from './snippetResult';
export * from './source';
export * from './standardEntries';
export * from './synonymHit';
export * from './synonymHitHighlightResult';
export * from './timeRange';
export * from './updateApiKeyResponse';
export * from './updatedRuleResponse';
export * from './updatedRuleResponseWithoutObjectID';
export * from './userId';

export interface Authentication {
  /**
   * Apply authentication settings to header and query params.
   */
  applyToRequest: (requestOptions: RequestOptions) => Promise<void> | void;
}

export class ApiKeyAuth implements Authentication {
  apiKey: string = '';

  constructor(private location: string, private paramName: string) {}

  applyToRequest(requestOptions: RequestOptions): void {
    if (this.location === 'query') {
      requestOptions.queryParameters[this.paramName] = this.apiKey;
    } else if (
      this.location === 'header' &&
      requestOptions &&
      requestOptions.headers
    ) {
      requestOptions.headers[this.paramName] = this.apiKey;
    } else if (
      this.location === 'cookie' &&
      requestOptions &&
      requestOptions.headers
    ) {
      if (requestOptions.headers.Cookie) {
        requestOptions.headers.Cookie += `; ${
          this.paramName
        }=${encodeURIComponent(this.apiKey)}`;
      } else {
        requestOptions.headers.Cookie = `${this.paramName}=${encodeURIComponent(
          this.apiKey
        )}`;
      }
    }
  }
}
