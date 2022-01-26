import { Transporter } from '@algolia/client-common';
import type {
  Headers,
  Requester,
  Host,
  Request,
  RequestOptions,
} from '@algolia/client-common';

import type { GetAverageClickPositionResponse } from '../model/getAverageClickPositionResponse';
import type { GetClickPositionsResponse } from '../model/getClickPositionsResponse';
import type { GetClickThroughRateResponse } from '../model/getClickThroughRateResponse';
import type { GetConversationRateResponse } from '../model/getConversationRateResponse';
import type { GetNoClickRateResponse } from '../model/getNoClickRateResponse';
import type { GetNoResultsRateResponse } from '../model/getNoResultsRateResponse';
import type { GetSearchesCountResponse } from '../model/getSearchesCountResponse';
import type { GetSearchesNoClicksResponse } from '../model/getSearchesNoClicksResponse';
import type { GetSearchesNoResultsResponse } from '../model/getSearchesNoResultsResponse';
import type { GetStatusResponse } from '../model/getStatusResponse';
import type { GetTopCountriesResponse } from '../model/getTopCountriesResponse';
import type { GetTopFilterAttributesResponse } from '../model/getTopFilterAttributesResponse';
import type { GetTopFilterForAttributeResponse } from '../model/getTopFilterForAttributeResponse';
import type { GetTopFiltersNoResultsResponse } from '../model/getTopFiltersNoResultsResponse';
import type { GetTopHitsResponse } from '../model/getTopHitsResponse';
import type { GetTopHitsResponseWithAnalytics } from '../model/getTopHitsResponseWithAnalytics';
import type { GetTopSearchesResponse } from '../model/getTopSearchesResponse';
import type { GetTopSearchesResponseWithAnalytics } from '../model/getTopSearchesResponseWithAnalytics';
import type { GetUsersCountResponse } from '../model/getUsersCountResponse';

export const version = '5.0.0';

export class AnalyticsApi {
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
    region: 'de' | 'us',
    options?: { requester?: Requester; hosts?: Host[] }
  ) {
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

  getDefaultHosts(region: 'de' | 'us' = 'us'): Host[] {
    return [
      {
        url: `analytics.${region}.algolia.com`,
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
   * Returns the average click position. The endpoint returns a value for the complete given time range, as well as a value per day.
   *
   * @summary Returns the average click position.
   * @param getAverageClickPosition - The getAverageClickPosition object.
   * @param getAverageClickPosition.index - The index name to target.
   * @param getAverageClickPosition.startDate - The lower bound timestamp (a date, a string like \"2006-01-02\") of the period to analyze.
   * @param getAverageClickPosition.endDate - The upper bound timestamp (a date, a string like \"2006-01-02\") of the period to analyze.
   * @param getAverageClickPosition.tags - Filter metrics on the provided tags. Each tag must correspond to an analyticsTags set at search time. Multiple tags can be combined with the operators OR and AND. If a tag contains characters like spaces or parentheses, it should be URL encoded.
   */
  getAverageClickPosition({
    index,
    startDate,
    endDate,
    tags,
  }: GetAverageClickPositionProps): Promise<GetAverageClickPositionResponse> {
    const path = '/2/clicks/averageClickPosition';
    const headers: Headers = { Accept: 'application/json' };
    const queryParameters: Record<string, string> = {};

    if (!index) {
      throw new Error(
        'Parameter `index` is required when calling `getAverageClickPosition`.'
      );
    }

    if (index !== undefined) {
      queryParameters.index = index.toString();
    }

    if (startDate !== undefined) {
      queryParameters.startDate = startDate.toString();
    }

    if (endDate !== undefined) {
      queryParameters.endDate = endDate.toString();
    }

    if (tags !== undefined) {
      queryParameters.tags = tags.toString();
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
   * Returns the distribution of clicks per range of positions.
   *
   * @summary Returns the distribution of clicks per range of positions.
   * @param getClickPositions - The getClickPositions object.
   * @param getClickPositions.index - The index name to target.
   * @param getClickPositions.startDate - The lower bound timestamp (a date, a string like \"2006-01-02\") of the period to analyze.
   * @param getClickPositions.endDate - The upper bound timestamp (a date, a string like \"2006-01-02\") of the period to analyze.
   * @param getClickPositions.tags - Filter metrics on the provided tags. Each tag must correspond to an analyticsTags set at search time. Multiple tags can be combined with the operators OR and AND. If a tag contains characters like spaces or parentheses, it should be URL encoded.
   */
  getClickPositions({
    index,
    startDate,
    endDate,
    tags,
  }: GetClickPositionsProps): Promise<GetClickPositionsResponse> {
    const path = '/2/clicks/positions';
    const headers: Headers = { Accept: 'application/json' };
    const queryParameters: Record<string, string> = {};

    if (!index) {
      throw new Error(
        'Parameter `index` is required when calling `getClickPositions`.'
      );
    }

    if (index !== undefined) {
      queryParameters.index = index.toString();
    }

    if (startDate !== undefined) {
      queryParameters.startDate = startDate.toString();
    }

    if (endDate !== undefined) {
      queryParameters.endDate = endDate.toString();
    }

    if (tags !== undefined) {
      queryParameters.tags = tags.toString();
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
   * Returns a click-through rate (CTR). The endpoint returns a value for the complete given time range, as well as a value per day. It also returns the count of clicks and searches used to compute the rates.
   *
   * @summary Returns a click-through rate (CTR).
   * @param getClickThroughRate - The getClickThroughRate object.
   * @param getClickThroughRate.index - The index name to target.
   * @param getClickThroughRate.startDate - The lower bound timestamp (a date, a string like \"2006-01-02\") of the period to analyze.
   * @param getClickThroughRate.endDate - The upper bound timestamp (a date, a string like \"2006-01-02\") of the period to analyze.
   * @param getClickThroughRate.tags - Filter metrics on the provided tags. Each tag must correspond to an analyticsTags set at search time. Multiple tags can be combined with the operators OR and AND. If a tag contains characters like spaces or parentheses, it should be URL encoded.
   */
  getClickThroughRate({
    index,
    startDate,
    endDate,
    tags,
  }: GetClickThroughRateProps): Promise<GetClickThroughRateResponse> {
    const path = '/2/clicks/clickThroughRate';
    const headers: Headers = { Accept: 'application/json' };
    const queryParameters: Record<string, string> = {};

    if (!index) {
      throw new Error(
        'Parameter `index` is required when calling `getClickThroughRate`.'
      );
    }

    if (index !== undefined) {
      queryParameters.index = index.toString();
    }

    if (startDate !== undefined) {
      queryParameters.startDate = startDate.toString();
    }

    if (endDate !== undefined) {
      queryParameters.endDate = endDate.toString();
    }

    if (tags !== undefined) {
      queryParameters.tags = tags.toString();
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
   * Returns a conversion rate (CR). The endpoint returns a value for the complete given time range, as well as a value per day. It also returns the count of conversion and searches used to compute the rates.
   *
   * @summary Returns a conversion rate (CR).
   * @param getConversationRate - The getConversationRate object.
   * @param getConversationRate.index - The index name to target.
   * @param getConversationRate.startDate - The lower bound timestamp (a date, a string like \"2006-01-02\") of the period to analyze.
   * @param getConversationRate.endDate - The upper bound timestamp (a date, a string like \"2006-01-02\") of the period to analyze.
   * @param getConversationRate.tags - Filter metrics on the provided tags. Each tag must correspond to an analyticsTags set at search time. Multiple tags can be combined with the operators OR and AND. If a tag contains characters like spaces or parentheses, it should be URL encoded.
   */
  getConversationRate({
    index,
    startDate,
    endDate,
    tags,
  }: GetConversationRateProps): Promise<GetConversationRateResponse> {
    const path = '/2/conversions/conversionRate';
    const headers: Headers = { Accept: 'application/json' };
    const queryParameters: Record<string, string> = {};

    if (!index) {
      throw new Error(
        'Parameter `index` is required when calling `getConversationRate`.'
      );
    }

    if (index !== undefined) {
      queryParameters.index = index.toString();
    }

    if (startDate !== undefined) {
      queryParameters.startDate = startDate.toString();
    }

    if (endDate !== undefined) {
      queryParameters.endDate = endDate.toString();
    }

    if (tags !== undefined) {
      queryParameters.tags = tags.toString();
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
   * Returns the rate at which searches didn\'t lead to any clicks. The endpoint returns a value for the complete given time range, as well as a value per day. It also returns the count of searches and searches without clicks.
   *
   * @summary Returns the rate at which searches didn\'t lead to any clicks.
   * @param getNoClickRate - The getNoClickRate object.
   * @param getNoClickRate.index - The index name to target.
   * @param getNoClickRate.startDate - The lower bound timestamp (a date, a string like \"2006-01-02\") of the period to analyze.
   * @param getNoClickRate.endDate - The upper bound timestamp (a date, a string like \"2006-01-02\") of the period to analyze.
   * @param getNoClickRate.tags - Filter metrics on the provided tags. Each tag must correspond to an analyticsTags set at search time. Multiple tags can be combined with the operators OR and AND. If a tag contains characters like spaces or parentheses, it should be URL encoded.
   */
  getNoClickRate({
    index,
    startDate,
    endDate,
    tags,
  }: GetNoClickRateProps): Promise<GetNoClickRateResponse> {
    const path = '/2/searches/noClickRate';
    const headers: Headers = { Accept: 'application/json' };
    const queryParameters: Record<string, string> = {};

    if (!index) {
      throw new Error(
        'Parameter `index` is required when calling `getNoClickRate`.'
      );
    }

    if (index !== undefined) {
      queryParameters.index = index.toString();
    }

    if (startDate !== undefined) {
      queryParameters.startDate = startDate.toString();
    }

    if (endDate !== undefined) {
      queryParameters.endDate = endDate.toString();
    }

    if (tags !== undefined) {
      queryParameters.tags = tags.toString();
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
   * Returns the rate at which searches didn\'t return any results. The endpoint returns a value for the complete given time range, as well as a value per day. It also returns the count of searches and searches without results used to compute the rates.
   *
   * @summary Returns the rate at which searches didn\'t return any results.
   * @param getNoResultsRate - The getNoResultsRate object.
   * @param getNoResultsRate.index - The index name to target.
   * @param getNoResultsRate.startDate - The lower bound timestamp (a date, a string like \"2006-01-02\") of the period to analyze.
   * @param getNoResultsRate.endDate - The upper bound timestamp (a date, a string like \"2006-01-02\") of the period to analyze.
   * @param getNoResultsRate.tags - Filter metrics on the provided tags. Each tag must correspond to an analyticsTags set at search time. Multiple tags can be combined with the operators OR and AND. If a tag contains characters like spaces or parentheses, it should be URL encoded.
   */
  getNoResultsRate({
    index,
    startDate,
    endDate,
    tags,
  }: GetNoResultsRateProps): Promise<GetNoResultsRateResponse> {
    const path = '/2/searches/noResultRate';
    const headers: Headers = { Accept: 'application/json' };
    const queryParameters: Record<string, string> = {};

    if (!index) {
      throw new Error(
        'Parameter `index` is required when calling `getNoResultsRate`.'
      );
    }

    if (index !== undefined) {
      queryParameters.index = index.toString();
    }

    if (startDate !== undefined) {
      queryParameters.startDate = startDate.toString();
    }

    if (endDate !== undefined) {
      queryParameters.endDate = endDate.toString();
    }

    if (tags !== undefined) {
      queryParameters.tags = tags.toString();
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
   * Returns the number of searches across the given time range. The endpoint returns a value for the complete given time range, as well as a value per day.
   *
   * @summary Returns the number of searches across the given time range.
   * @param getSearchesCount - The getSearchesCount object.
   * @param getSearchesCount.index - The index name to target.
   * @param getSearchesCount.startDate - The lower bound timestamp (a date, a string like \"2006-01-02\") of the period to analyze.
   * @param getSearchesCount.endDate - The upper bound timestamp (a date, a string like \"2006-01-02\") of the period to analyze.
   * @param getSearchesCount.tags - Filter metrics on the provided tags. Each tag must correspond to an analyticsTags set at search time. Multiple tags can be combined with the operators OR and AND. If a tag contains characters like spaces or parentheses, it should be URL encoded.
   */
  getSearchesCount({
    index,
    startDate,
    endDate,
    tags,
  }: GetSearchesCountProps): Promise<GetSearchesCountResponse> {
    const path = '/2/searches/count';
    const headers: Headers = { Accept: 'application/json' };
    const queryParameters: Record<string, string> = {};

    if (!index) {
      throw new Error(
        'Parameter `index` is required when calling `getSearchesCount`.'
      );
    }

    if (index !== undefined) {
      queryParameters.index = index.toString();
    }

    if (startDate !== undefined) {
      queryParameters.startDate = startDate.toString();
    }

    if (endDate !== undefined) {
      queryParameters.endDate = endDate.toString();
    }

    if (tags !== undefined) {
      queryParameters.tags = tags.toString();
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
   * Returns top searches that didn\'t lead to any clicks. Limited to the 1000 most frequent ones. For each search, also returns the average number of found hits.
   *
   * @summary Returns top searches that didn\'t lead to any clicks.
   * @param getSearchesNoClicks - The getSearchesNoClicks object.
   * @param getSearchesNoClicks.index - The index name to target.
   * @param getSearchesNoClicks.startDate - The lower bound timestamp (a date, a string like \"2006-01-02\") of the period to analyze.
   * @param getSearchesNoClicks.endDate - The upper bound timestamp (a date, a string like \"2006-01-02\") of the period to analyze.
   * @param getSearchesNoClicks.limit - Number of records to return. Limit is the size of the page.
   * @param getSearchesNoClicks.offset - Position of the starting record. Used for paging. 0 is the first record.
   * @param getSearchesNoClicks.tags - Filter metrics on the provided tags. Each tag must correspond to an analyticsTags set at search time. Multiple tags can be combined with the operators OR and AND. If a tag contains characters like spaces or parentheses, it should be URL encoded.
   */
  getSearchesNoClicks({
    index,
    startDate,
    endDate,
    limit,
    offset,
    tags,
  }: GetSearchesNoClicksProps): Promise<GetSearchesNoClicksResponse> {
    const path = '/2/searches/noClicks';
    const headers: Headers = { Accept: 'application/json' };
    const queryParameters: Record<string, string> = {};

    if (!index) {
      throw new Error(
        'Parameter `index` is required when calling `getSearchesNoClicks`.'
      );
    }

    if (index !== undefined) {
      queryParameters.index = index.toString();
    }

    if (startDate !== undefined) {
      queryParameters.startDate = startDate.toString();
    }

    if (endDate !== undefined) {
      queryParameters.endDate = endDate.toString();
    }

    if (limit !== undefined) {
      queryParameters.limit = limit.toString();
    }

    if (offset !== undefined) {
      queryParameters.offset = offset.toString();
    }

    if (tags !== undefined) {
      queryParameters.tags = tags.toString();
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
   * Returns top searches that didn\'t return any results. Limited to the 1000 most frequent ones.
   *
   * @summary Returns top searches that didn\'t return any results.
   * @param getSearchesNoResults - The getSearchesNoResults object.
   * @param getSearchesNoResults.index - The index name to target.
   * @param getSearchesNoResults.startDate - The lower bound timestamp (a date, a string like \"2006-01-02\") of the period to analyze.
   * @param getSearchesNoResults.endDate - The upper bound timestamp (a date, a string like \"2006-01-02\") of the period to analyze.
   * @param getSearchesNoResults.limit - Number of records to return. Limit is the size of the page.
   * @param getSearchesNoResults.offset - Position of the starting record. Used for paging. 0 is the first record.
   * @param getSearchesNoResults.tags - Filter metrics on the provided tags. Each tag must correspond to an analyticsTags set at search time. Multiple tags can be combined with the operators OR and AND. If a tag contains characters like spaces or parentheses, it should be URL encoded.
   */
  getSearchesNoResults({
    index,
    startDate,
    endDate,
    limit,
    offset,
    tags,
  }: GetSearchesNoResultsProps): Promise<GetSearchesNoResultsResponse> {
    const path = '/2/searches/noResults';
    const headers: Headers = { Accept: 'application/json' };
    const queryParameters: Record<string, string> = {};

    if (!index) {
      throw new Error(
        'Parameter `index` is required when calling `getSearchesNoResults`.'
      );
    }

    if (index !== undefined) {
      queryParameters.index = index.toString();
    }

    if (startDate !== undefined) {
      queryParameters.startDate = startDate.toString();
    }

    if (endDate !== undefined) {
      queryParameters.endDate = endDate.toString();
    }

    if (limit !== undefined) {
      queryParameters.limit = limit.toString();
    }

    if (offset !== undefined) {
      queryParameters.offset = offset.toString();
    }

    if (tags !== undefined) {
      queryParameters.tags = tags.toString();
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
   * Returns the latest update time of the analytics API for a given index. If the index has been recently created and/or no search has been performed yet the updated time will be null.
   *
   * @summary Get latest update time of the analytics API.
   * @param getStatus - The getStatus object.
   * @param getStatus.index - The index name to target.
   */
  getStatus({ index }: GetStatusProps): Promise<GetStatusResponse> {
    const path = '/2/status';
    const headers: Headers = { Accept: 'application/json' };
    const queryParameters: Record<string, string> = {};

    if (!index) {
      throw new Error(
        'Parameter `index` is required when calling `getStatus`.'
      );
    }

    if (index !== undefined) {
      queryParameters.index = index.toString();
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
   * Returns top countries. Limited to the 1000 most frequent ones.
   *
   * @summary Returns top countries.
   * @param getTopCountries - The getTopCountries object.
   * @param getTopCountries.index - The index name to target.
   * @param getTopCountries.startDate - The lower bound timestamp (a date, a string like \"2006-01-02\") of the period to analyze.
   * @param getTopCountries.endDate - The upper bound timestamp (a date, a string like \"2006-01-02\") of the period to analyze.
   * @param getTopCountries.limit - Number of records to return. Limit is the size of the page.
   * @param getTopCountries.offset - Position of the starting record. Used for paging. 0 is the first record.
   * @param getTopCountries.tags - Filter metrics on the provided tags. Each tag must correspond to an analyticsTags set at search time. Multiple tags can be combined with the operators OR and AND. If a tag contains characters like spaces or parentheses, it should be URL encoded.
   */
  getTopCountries({
    index,
    startDate,
    endDate,
    limit,
    offset,
    tags,
  }: GetTopCountriesProps): Promise<GetTopCountriesResponse> {
    const path = '/2/countries';
    const headers: Headers = { Accept: 'application/json' };
    const queryParameters: Record<string, string> = {};

    if (!index) {
      throw new Error(
        'Parameter `index` is required when calling `getTopCountries`.'
      );
    }

    if (index !== undefined) {
      queryParameters.index = index.toString();
    }

    if (startDate !== undefined) {
      queryParameters.startDate = startDate.toString();
    }

    if (endDate !== undefined) {
      queryParameters.endDate = endDate.toString();
    }

    if (limit !== undefined) {
      queryParameters.limit = limit.toString();
    }

    if (offset !== undefined) {
      queryParameters.offset = offset.toString();
    }

    if (tags !== undefined) {
      queryParameters.tags = tags.toString();
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
   * Returns top filter attributes. Limited to the 1000 most used filters.
   *
   * @summary Returns top filter attributes.
   * @param getTopFilterAttributes - The getTopFilterAttributes object.
   * @param getTopFilterAttributes.index - The index name to target.
   * @param getTopFilterAttributes.search - The query term to search for. Must match the exact user input.
   * @param getTopFilterAttributes.startDate - The lower bound timestamp (a date, a string like \"2006-01-02\") of the period to analyze.
   * @param getTopFilterAttributes.endDate - The upper bound timestamp (a date, a string like \"2006-01-02\") of the period to analyze.
   * @param getTopFilterAttributes.limit - Number of records to return. Limit is the size of the page.
   * @param getTopFilterAttributes.offset - Position of the starting record. Used for paging. 0 is the first record.
   * @param getTopFilterAttributes.tags - Filter metrics on the provided tags. Each tag must correspond to an analyticsTags set at search time. Multiple tags can be combined with the operators OR and AND. If a tag contains characters like spaces or parentheses, it should be URL encoded.
   */
  getTopFilterAttributes({
    index,
    search,
    startDate,
    endDate,
    limit,
    offset,
    tags,
  }: GetTopFilterAttributesProps): Promise<GetTopFilterAttributesResponse> {
    const path = '/2/filters';
    const headers: Headers = { Accept: 'application/json' };
    const queryParameters: Record<string, string> = {};

    if (!index) {
      throw new Error(
        'Parameter `index` is required when calling `getTopFilterAttributes`.'
      );
    }

    if (index !== undefined) {
      queryParameters.index = index.toString();
    }

    if (search !== undefined) {
      queryParameters.search = search.toString();
    }

    if (startDate !== undefined) {
      queryParameters.startDate = startDate.toString();
    }

    if (endDate !== undefined) {
      queryParameters.endDate = endDate.toString();
    }

    if (limit !== undefined) {
      queryParameters.limit = limit.toString();
    }

    if (offset !== undefined) {
      queryParameters.offset = offset.toString();
    }

    if (tags !== undefined) {
      queryParameters.tags = tags.toString();
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
   * Returns top filters for the given attribute. Limited to the 1000 most used filters.
   *
   * @summary Returns top filters for the given attribute.
   * @param getTopFilterForAttribute - The getTopFilterForAttribute object.
   * @param getTopFilterForAttribute.attribute - The exact name of the attribute.
   * @param getTopFilterForAttribute.index - The index name to target.
   * @param getTopFilterForAttribute.search - The query term to search for. Must match the exact user input.
   * @param getTopFilterForAttribute.startDate - The lower bound timestamp (a date, a string like \"2006-01-02\") of the period to analyze.
   * @param getTopFilterForAttribute.endDate - The upper bound timestamp (a date, a string like \"2006-01-02\") of the period to analyze.
   * @param getTopFilterForAttribute.limit - Number of records to return. Limit is the size of the page.
   * @param getTopFilterForAttribute.offset - Position of the starting record. Used for paging. 0 is the first record.
   * @param getTopFilterForAttribute.tags - Filter metrics on the provided tags. Each tag must correspond to an analyticsTags set at search time. Multiple tags can be combined with the operators OR and AND. If a tag contains characters like spaces or parentheses, it should be URL encoded.
   */
  getTopFilterForAttribute({
    attribute,
    index,
    search,
    startDate,
    endDate,
    limit,
    offset,
    tags,
  }: GetTopFilterForAttributeProps): Promise<GetTopFilterForAttributeResponse> {
    const path = '/2/filters/{attribute}'.replace(
      '{attribute}',
      encodeURIComponent(String(attribute))
    );
    const headers: Headers = { Accept: 'application/json' };
    const queryParameters: Record<string, string> = {};

    if (!attribute) {
      throw new Error(
        'Parameter `attribute` is required when calling `getTopFilterForAttribute`.'
      );
    }

    if (!index) {
      throw new Error(
        'Parameter `index` is required when calling `getTopFilterForAttribute`.'
      );
    }

    if (index !== undefined) {
      queryParameters.index = index.toString();
    }

    if (search !== undefined) {
      queryParameters.search = search.toString();
    }

    if (startDate !== undefined) {
      queryParameters.startDate = startDate.toString();
    }

    if (endDate !== undefined) {
      queryParameters.endDate = endDate.toString();
    }

    if (limit !== undefined) {
      queryParameters.limit = limit.toString();
    }

    if (offset !== undefined) {
      queryParameters.offset = offset.toString();
    }

    if (tags !== undefined) {
      queryParameters.tags = tags.toString();
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
   * Returns top filters with no results. Limited to the 1000 most used filters.
   *
   * @summary Returns top filters with no results.
   * @param getTopFiltersNoResults - The getTopFiltersNoResults object.
   * @param getTopFiltersNoResults.index - The index name to target.
   * @param getTopFiltersNoResults.search - The query term to search for. Must match the exact user input.
   * @param getTopFiltersNoResults.startDate - The lower bound timestamp (a date, a string like \"2006-01-02\") of the period to analyze.
   * @param getTopFiltersNoResults.endDate - The upper bound timestamp (a date, a string like \"2006-01-02\") of the period to analyze.
   * @param getTopFiltersNoResults.limit - Number of records to return. Limit is the size of the page.
   * @param getTopFiltersNoResults.offset - Position of the starting record. Used for paging. 0 is the first record.
   * @param getTopFiltersNoResults.tags - Filter metrics on the provided tags. Each tag must correspond to an analyticsTags set at search time. Multiple tags can be combined with the operators OR and AND. If a tag contains characters like spaces or parentheses, it should be URL encoded.
   */
  getTopFiltersNoResults({
    index,
    search,
    startDate,
    endDate,
    limit,
    offset,
    tags,
  }: GetTopFiltersNoResultsProps): Promise<GetTopFiltersNoResultsResponse> {
    const path = '/2/filters/noResults';
    const headers: Headers = { Accept: 'application/json' };
    const queryParameters: Record<string, string> = {};

    if (!index) {
      throw new Error(
        'Parameter `index` is required when calling `getTopFiltersNoResults`.'
      );
    }

    if (index !== undefined) {
      queryParameters.index = index.toString();
    }

    if (search !== undefined) {
      queryParameters.search = search.toString();
    }

    if (startDate !== undefined) {
      queryParameters.startDate = startDate.toString();
    }

    if (endDate !== undefined) {
      queryParameters.endDate = endDate.toString();
    }

    if (limit !== undefined) {
      queryParameters.limit = limit.toString();
    }

    if (offset !== undefined) {
      queryParameters.offset = offset.toString();
    }

    if (tags !== undefined) {
      queryParameters.tags = tags.toString();
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
   * Returns top hits. Limited to the 1000 most frequent ones.
   *
   * @summary Returns top hits.
   * @param getTopHits - The getTopHits object.
   * @param getTopHits.index - The index name to target.
   * @param getTopHits.search - The query term to search for. Must match the exact user input.
   * @param getTopHits.clickAnalytics - Whether to include the click-through and conversion rates for a search.
   * @param getTopHits.startDate - The lower bound timestamp (a date, a string like \"2006-01-02\") of the period to analyze.
   * @param getTopHits.endDate - The upper bound timestamp (a date, a string like \"2006-01-02\") of the period to analyze.
   * @param getTopHits.limit - Number of records to return. Limit is the size of the page.
   * @param getTopHits.offset - Position of the starting record. Used for paging. 0 is the first record.
   * @param getTopHits.tags - Filter metrics on the provided tags. Each tag must correspond to an analyticsTags set at search time. Multiple tags can be combined with the operators OR and AND. If a tag contains characters like spaces or parentheses, it should be URL encoded.
   */
  getTopHits({
    index,
    search,
    clickAnalytics,
    startDate,
    endDate,
    limit,
    offset,
    tags,
  }: GetTopHitsProps): Promise<
    GetTopHitsResponse | GetTopHitsResponseWithAnalytics
  > {
    const path = '/2/hits';
    const headers: Headers = { Accept: 'application/json' };
    const queryParameters: Record<string, string> = {};

    if (!index) {
      throw new Error(
        'Parameter `index` is required when calling `getTopHits`.'
      );
    }

    if (index !== undefined) {
      queryParameters.index = index.toString();
    }

    if (search !== undefined) {
      queryParameters.search = search.toString();
    }

    if (clickAnalytics !== undefined) {
      queryParameters.clickAnalytics = clickAnalytics.toString();
    }

    if (startDate !== undefined) {
      queryParameters.startDate = startDate.toString();
    }

    if (endDate !== undefined) {
      queryParameters.endDate = endDate.toString();
    }

    if (limit !== undefined) {
      queryParameters.limit = limit.toString();
    }

    if (offset !== undefined) {
      queryParameters.offset = offset.toString();
    }

    if (tags !== undefined) {
      queryParameters.tags = tags.toString();
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
   * Returns top searches. Limited to the 1000 most frequent ones. For each search, also returns the average number of hits returned.
   *
   * @summary Returns top searches.
   * @param getTopSearches - The getTopSearches object.
   * @param getTopSearches.index - The index name to target.
   * @param getTopSearches.clickAnalytics - Whether to include the click-through and conversion rates for a search.
   * @param getTopSearches.startDate - The lower bound timestamp (a date, a string like \"2006-01-02\") of the period to analyze.
   * @param getTopSearches.endDate - The upper bound timestamp (a date, a string like \"2006-01-02\") of the period to analyze.
   * @param getTopSearches.orderBy - Reorder the results.
   * @param getTopSearches.direction - The sorting of the result.
   * @param getTopSearches.limit - Number of records to return. Limit is the size of the page.
   * @param getTopSearches.offset - Position of the starting record. Used for paging. 0 is the first record.
   * @param getTopSearches.tags - Filter metrics on the provided tags. Each tag must correspond to an analyticsTags set at search time. Multiple tags can be combined with the operators OR and AND. If a tag contains characters like spaces or parentheses, it should be URL encoded.
   */
  getTopSearches({
    index,
    clickAnalytics,
    startDate,
    endDate,
    orderBy,
    direction,
    limit,
    offset,
    tags,
  }: GetTopSearchesProps): Promise<
    GetTopSearchesResponse | GetTopSearchesResponseWithAnalytics
  > {
    const path = '/2/searches';
    const headers: Headers = { Accept: 'application/json' };
    const queryParameters: Record<string, string> = {};

    if (!index) {
      throw new Error(
        'Parameter `index` is required when calling `getTopSearches`.'
      );
    }

    if (index !== undefined) {
      queryParameters.index = index.toString();
    }

    if (clickAnalytics !== undefined) {
      queryParameters.clickAnalytics = clickAnalytics.toString();
    }

    if (startDate !== undefined) {
      queryParameters.startDate = startDate.toString();
    }

    if (endDate !== undefined) {
      queryParameters.endDate = endDate.toString();
    }

    if (orderBy !== undefined) {
      queryParameters.orderBy = orderBy.toString();
    }

    if (direction !== undefined) {
      queryParameters.direction = direction.toString();
    }

    if (limit !== undefined) {
      queryParameters.limit = limit.toString();
    }

    if (offset !== undefined) {
      queryParameters.offset = offset.toString();
    }

    if (tags !== undefined) {
      queryParameters.tags = tags.toString();
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
   * Returns the distinct count of users across the given time range. The endpoint returns a value for the complete given time range, as well as a value per day.
   *
   * @summary Returns the distinct count of users across the given time range.
   * @param getUsersCount - The getUsersCount object.
   * @param getUsersCount.index - The index name to target.
   * @param getUsersCount.startDate - The lower bound timestamp (a date, a string like \"2006-01-02\") of the period to analyze.
   * @param getUsersCount.endDate - The upper bound timestamp (a date, a string like \"2006-01-02\") of the period to analyze.
   * @param getUsersCount.tags - Filter metrics on the provided tags. Each tag must correspond to an analyticsTags set at search time. Multiple tags can be combined with the operators OR and AND. If a tag contains characters like spaces or parentheses, it should be URL encoded.
   */
  getUsersCount({
    index,
    startDate,
    endDate,
    tags,
  }: GetUsersCountProps): Promise<GetUsersCountResponse> {
    const path = '/2/users/count';
    const headers: Headers = { Accept: 'application/json' };
    const queryParameters: Record<string, string> = {};

    if (!index) {
      throw new Error(
        'Parameter `index` is required when calling `getUsersCount`.'
      );
    }

    if (index !== undefined) {
      queryParameters.index = index.toString();
    }

    if (startDate !== undefined) {
      queryParameters.startDate = startDate.toString();
    }

    if (endDate !== undefined) {
      queryParameters.endDate = endDate.toString();
    }

    if (tags !== undefined) {
      queryParameters.tags = tags.toString();
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
}

export type GetAverageClickPositionProps = {
  /**
   * The index name to target.
   */
  index: string;
  /**
   * The lower bound timestamp (a date, a string like \"2006-01-02\") of the period to analyze.
   */
  startDate?: string;
  /**
   * The upper bound timestamp (a date, a string like \"2006-01-02\") of the period to analyze.
   */
  endDate?: string;
  /**
   * Filter metrics on the provided tags. Each tag must correspond to an analyticsTags set at search time. Multiple tags can be combined with the operators OR and AND. If a tag contains characters like spaces or parentheses, it should be URL encoded.
   */
  tags?: string;
};

export type GetClickPositionsProps = {
  /**
   * The index name to target.
   */
  index: string;
  /**
   * The lower bound timestamp (a date, a string like \"2006-01-02\") of the period to analyze.
   */
  startDate?: string;
  /**
   * The upper bound timestamp (a date, a string like \"2006-01-02\") of the period to analyze.
   */
  endDate?: string;
  /**
   * Filter metrics on the provided tags. Each tag must correspond to an analyticsTags set at search time. Multiple tags can be combined with the operators OR and AND. If a tag contains characters like spaces or parentheses, it should be URL encoded.
   */
  tags?: string;
};

export type GetClickThroughRateProps = {
  /**
   * The index name to target.
   */
  index: string;
  /**
   * The lower bound timestamp (a date, a string like \"2006-01-02\") of the period to analyze.
   */
  startDate?: string;
  /**
   * The upper bound timestamp (a date, a string like \"2006-01-02\") of the period to analyze.
   */
  endDate?: string;
  /**
   * Filter metrics on the provided tags. Each tag must correspond to an analyticsTags set at search time. Multiple tags can be combined with the operators OR and AND. If a tag contains characters like spaces or parentheses, it should be URL encoded.
   */
  tags?: string;
};

export type GetConversationRateProps = {
  /**
   * The index name to target.
   */
  index: string;
  /**
   * The lower bound timestamp (a date, a string like \"2006-01-02\") of the period to analyze.
   */
  startDate?: string;
  /**
   * The upper bound timestamp (a date, a string like \"2006-01-02\") of the period to analyze.
   */
  endDate?: string;
  /**
   * Filter metrics on the provided tags. Each tag must correspond to an analyticsTags set at search time. Multiple tags can be combined with the operators OR and AND. If a tag contains characters like spaces or parentheses, it should be URL encoded.
   */
  tags?: string;
};

export type GetNoClickRateProps = {
  /**
   * The index name to target.
   */
  index: string;
  /**
   * The lower bound timestamp (a date, a string like \"2006-01-02\") of the period to analyze.
   */
  startDate?: string;
  /**
   * The upper bound timestamp (a date, a string like \"2006-01-02\") of the period to analyze.
   */
  endDate?: string;
  /**
   * Filter metrics on the provided tags. Each tag must correspond to an analyticsTags set at search time. Multiple tags can be combined with the operators OR and AND. If a tag contains characters like spaces or parentheses, it should be URL encoded.
   */
  tags?: string;
};

export type GetNoResultsRateProps = {
  /**
   * The index name to target.
   */
  index: string;
  /**
   * The lower bound timestamp (a date, a string like \"2006-01-02\") of the period to analyze.
   */
  startDate?: string;
  /**
   * The upper bound timestamp (a date, a string like \"2006-01-02\") of the period to analyze.
   */
  endDate?: string;
  /**
   * Filter metrics on the provided tags. Each tag must correspond to an analyticsTags set at search time. Multiple tags can be combined with the operators OR and AND. If a tag contains characters like spaces or parentheses, it should be URL encoded.
   */
  tags?: string;
};

export type GetSearchesCountProps = {
  /**
   * The index name to target.
   */
  index: string;
  /**
   * The lower bound timestamp (a date, a string like \"2006-01-02\") of the period to analyze.
   */
  startDate?: string;
  /**
   * The upper bound timestamp (a date, a string like \"2006-01-02\") of the period to analyze.
   */
  endDate?: string;
  /**
   * Filter metrics on the provided tags. Each tag must correspond to an analyticsTags set at search time. Multiple tags can be combined with the operators OR and AND. If a tag contains characters like spaces or parentheses, it should be URL encoded.
   */
  tags?: string;
};

export type GetSearchesNoClicksProps = {
  /**
   * The index name to target.
   */
  index: string;
  /**
   * The lower bound timestamp (a date, a string like \"2006-01-02\") of the period to analyze.
   */
  startDate?: string;
  /**
   * The upper bound timestamp (a date, a string like \"2006-01-02\") of the period to analyze.
   */
  endDate?: string;
  /**
   * Number of records to return. Limit is the size of the page.
   */
  limit?: number;
  /**
   * Position of the starting record. Used for paging. 0 is the first record.
   */
  offset?: number;
  /**
   * Filter metrics on the provided tags. Each tag must correspond to an analyticsTags set at search time. Multiple tags can be combined with the operators OR and AND. If a tag contains characters like spaces or parentheses, it should be URL encoded.
   */
  tags?: string;
};

export type GetSearchesNoResultsProps = {
  /**
   * The index name to target.
   */
  index: string;
  /**
   * The lower bound timestamp (a date, a string like \"2006-01-02\") of the period to analyze.
   */
  startDate?: string;
  /**
   * The upper bound timestamp (a date, a string like \"2006-01-02\") of the period to analyze.
   */
  endDate?: string;
  /**
   * Number of records to return. Limit is the size of the page.
   */
  limit?: number;
  /**
   * Position of the starting record. Used for paging. 0 is the first record.
   */
  offset?: number;
  /**
   * Filter metrics on the provided tags. Each tag must correspond to an analyticsTags set at search time. Multiple tags can be combined with the operators OR and AND. If a tag contains characters like spaces or parentheses, it should be URL encoded.
   */
  tags?: string;
};

export type GetStatusProps = {
  /**
   * The index name to target.
   */
  index: string;
};

export type GetTopCountriesProps = {
  /**
   * The index name to target.
   */
  index: string;
  /**
   * The lower bound timestamp (a date, a string like \"2006-01-02\") of the period to analyze.
   */
  startDate?: string;
  /**
   * The upper bound timestamp (a date, a string like \"2006-01-02\") of the period to analyze.
   */
  endDate?: string;
  /**
   * Number of records to return. Limit is the size of the page.
   */
  limit?: number;
  /**
   * Position of the starting record. Used for paging. 0 is the first record.
   */
  offset?: number;
  /**
   * Filter metrics on the provided tags. Each tag must correspond to an analyticsTags set at search time. Multiple tags can be combined with the operators OR and AND. If a tag contains characters like spaces or parentheses, it should be URL encoded.
   */
  tags?: string;
};

export type GetTopFilterAttributesProps = {
  /**
   * The index name to target.
   */
  index: string;
  /**
   * The query term to search for. Must match the exact user input.
   */
  search?: string;
  /**
   * The lower bound timestamp (a date, a string like \"2006-01-02\") of the period to analyze.
   */
  startDate?: string;
  /**
   * The upper bound timestamp (a date, a string like \"2006-01-02\") of the period to analyze.
   */
  endDate?: string;
  /**
   * Number of records to return. Limit is the size of the page.
   */
  limit?: number;
  /**
   * Position of the starting record. Used for paging. 0 is the first record.
   */
  offset?: number;
  /**
   * Filter metrics on the provided tags. Each tag must correspond to an analyticsTags set at search time. Multiple tags can be combined with the operators OR and AND. If a tag contains characters like spaces or parentheses, it should be URL encoded.
   */
  tags?: string;
};

export type GetTopFilterForAttributeProps = {
  /**
   * The exact name of the attribute.
   */
  attribute: string;
  /**
   * The index name to target.
   */
  index: string;
  /**
   * The query term to search for. Must match the exact user input.
   */
  search?: string;
  /**
   * The lower bound timestamp (a date, a string like \"2006-01-02\") of the period to analyze.
   */
  startDate?: string;
  /**
   * The upper bound timestamp (a date, a string like \"2006-01-02\") of the period to analyze.
   */
  endDate?: string;
  /**
   * Number of records to return. Limit is the size of the page.
   */
  limit?: number;
  /**
   * Position of the starting record. Used for paging. 0 is the first record.
   */
  offset?: number;
  /**
   * Filter metrics on the provided tags. Each tag must correspond to an analyticsTags set at search time. Multiple tags can be combined with the operators OR and AND. If a tag contains characters like spaces or parentheses, it should be URL encoded.
   */
  tags?: string;
};

export type GetTopFiltersNoResultsProps = {
  /**
   * The index name to target.
   */
  index: string;
  /**
   * The query term to search for. Must match the exact user input.
   */
  search?: string;
  /**
   * The lower bound timestamp (a date, a string like \"2006-01-02\") of the period to analyze.
   */
  startDate?: string;
  /**
   * The upper bound timestamp (a date, a string like \"2006-01-02\") of the period to analyze.
   */
  endDate?: string;
  /**
   * Number of records to return. Limit is the size of the page.
   */
  limit?: number;
  /**
   * Position of the starting record. Used for paging. 0 is the first record.
   */
  offset?: number;
  /**
   * Filter metrics on the provided tags. Each tag must correspond to an analyticsTags set at search time. Multiple tags can be combined with the operators OR and AND. If a tag contains characters like spaces or parentheses, it should be URL encoded.
   */
  tags?: string;
};

export type GetTopHitsProps = {
  /**
   * The index name to target.
   */
  index: string;
  /**
   * The query term to search for. Must match the exact user input.
   */
  search?: string;
  /**
   * Whether to include the click-through and conversion rates for a search.
   */
  clickAnalytics?: boolean;
  /**
   * The lower bound timestamp (a date, a string like \"2006-01-02\") of the period to analyze.
   */
  startDate?: string;
  /**
   * The upper bound timestamp (a date, a string like \"2006-01-02\") of the period to analyze.
   */
  endDate?: string;
  /**
   * Number of records to return. Limit is the size of the page.
   */
  limit?: number;
  /**
   * Position of the starting record. Used for paging. 0 is the first record.
   */
  offset?: number;
  /**
   * Filter metrics on the provided tags. Each tag must correspond to an analyticsTags set at search time. Multiple tags can be combined with the operators OR and AND. If a tag contains characters like spaces or parentheses, it should be URL encoded.
   */
  tags?: string;
};

export type GetTopSearchesProps = {
  /**
   * The index name to target.
   */
  index: string;
  /**
   * Whether to include the click-through and conversion rates for a search.
   */
  clickAnalytics?: boolean;
  /**
   * The lower bound timestamp (a date, a string like \"2006-01-02\") of the period to analyze.
   */
  startDate?: string;
  /**
   * The upper bound timestamp (a date, a string like \"2006-01-02\") of the period to analyze.
   */
  endDate?: string;
  /**
   * Reorder the results.
   */
  orderBy?:
    | 'averageClickPosition'
    | 'clickThroughRate'
    | 'conversionRate'
    | 'searchCount';
  /**
   * The sorting of the result.
   */
  direction?: 'asc' | 'desc';
  /**
   * Number of records to return. Limit is the size of the page.
   */
  limit?: number;
  /**
   * Position of the starting record. Used for paging. 0 is the first record.
   */
  offset?: number;
  /**
   * Filter metrics on the provided tags. Each tag must correspond to an analyticsTags set at search time. Multiple tags can be combined with the operators OR and AND. If a tag contains characters like spaces or parentheses, it should be URL encoded.
   */
  tags?: string;
};

export type GetUsersCountProps = {
  /**
   * The index name to target.
   */
  index: string;
  /**
   * The lower bound timestamp (a date, a string like \"2006-01-02\") of the period to analyze.
   */
  startDate?: string;
  /**
   * The upper bound timestamp (a date, a string like \"2006-01-02\") of the period to analyze.
   */
  endDate?: string;
  /**
   * Filter metrics on the provided tags. Each tag must correspond to an analyticsTags set at search time. Multiple tags can be combined with the operators OR and AND. If a tag contains characters like spaces or parentheses, it should be URL encoded.
   */
  tags?: string;
};
