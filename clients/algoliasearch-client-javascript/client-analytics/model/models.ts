/* eslint-disable no-param-reassign */
import type { RequestOptions } from '../utils/types';

export * from './errorBase';
export * from './getAverageClickPositionResponse';
export * from './getAverageClickPositionResponseDates';
export * from './getClickPositionsResponse';
export * from './getClickPositionsResponsePositions';
export * from './getClickThroughRateResponse';
export * from './getClickThroughRateResponseDates';
export * from './getConversationRateResponse';
export * from './getConversationRateResponseDates';
export * from './getNoClickRateResponse';
export * from './getNoClickRateResponseDates';
export * from './getNoResultsRateResponse';
export * from './getNoResultsRateResponseDates';
export * from './getSearchesCountResponse';
export * from './getSearchesCountResponseDates';
export * from './getSearchesNoClicksResponse';
export * from './getSearchesNoClicksResponseSearches';
export * from './getSearchesNoResultsResponse';
export * from './getSearchesNoResultsResponseSearches';
export * from './getStatusResponse';
export * from './getTopCountriesResponse';
export * from './getTopCountriesResponseCountries';
export * from './getTopFilterAttribute';
export * from './getTopFilterAttributesResponse';
export * from './getTopFilterForAttribute';
export * from './getTopFilterForAttributeResponse';
export * from './getTopFiltersNoResultsResponse';
export * from './getTopFiltersNoResultsValue';
export * from './getTopFiltersNoResultsValues';
export * from './getTopHitsResponse';
export * from './getTopHitsResponseHits';
export * from './getTopHitsResponseWithAnalytics';
export * from './getTopHitsResponseWithAnalyticsHits';
export * from './getTopSearchesResponse';
export * from './getTopSearchesResponseWithAnalytics';
export * from './getTopSearchesResponseWithAnalyticsSearches';
export * from './getUsersCountResponse';

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
