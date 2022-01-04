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
import { ApiKeyAuth } from '../model/models';
import { Transporter } from '../utils/Transporter';
import type { Requester } from '../utils/requester/Requester';
import type { Headers, Host, Request, RequestOptions } from '../utils/types';

export enum AnalyticsApiKeys {
  apiKey,
  appId,
}

export class AnalyticsApi {
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
    region: 'de' | 'us',
    options?: { requester?: Requester; hosts?: Host[] }
  ) {
    this.setApiKey(AnalyticsApiKeys.appId, appId);
    this.setApiKey(AnalyticsApiKeys.apiKey, apiKey);

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

  getDefaultHosts(region: 'de' | 'us'): Host[] {
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

  setApiKey(key: AnalyticsApiKeys, value: string): void {
    this.authentications[AnalyticsApiKeys[key]].apiKey = value;
  }

  /**
   * Returns the average click position. The endpoint returns a value for the complete given time range, as well as a value per day.
   *
   * @summary Returns the average click position.
   * @param getAverageClickPosition - The getAverageClickPosition parameters.
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

    if (index === null || index === undefined) {
      throw new Error(
        'Required parameter index was null or undefined when calling getAverageClickPosition.'
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
   * @param getClickPositions - The getClickPositions parameters.
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

    if (index === null || index === undefined) {
      throw new Error(
        'Required parameter index was null or undefined when calling getClickPositions.'
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
   * @param getClickThroughRate - The getClickThroughRate parameters.
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

    if (index === null || index === undefined) {
      throw new Error(
        'Required parameter index was null or undefined when calling getClickThroughRate.'
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
   * @param getConversationRate - The getConversationRate parameters.
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

    if (index === null || index === undefined) {
      throw new Error(
        'Required parameter index was null or undefined when calling getConversationRate.'
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
   * @param getNoClickRate - The getNoClickRate parameters.
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

    if (index === null || index === undefined) {
      throw new Error(
        'Required parameter index was null or undefined when calling getNoClickRate.'
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
   * @param getNoResultsRate - The getNoResultsRate parameters.
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

    if (index === null || index === undefined) {
      throw new Error(
        'Required parameter index was null or undefined when calling getNoResultsRate.'
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
   * @param getSearchesCount - The getSearchesCount parameters.
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

    if (index === null || index === undefined) {
      throw new Error(
        'Required parameter index was null or undefined when calling getSearchesCount.'
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
   * @param getSearchesNoClicks - The getSearchesNoClicks parameters.
   * @param getSearchesNoClicks.index - The index name to target.
   * @param getSearchesNoClicks.startDate - The lower bound timestamp (a date, a string like \"2006-01-02\") of the period to analyze.
   * @param getSearchesNoClicks.endDate - The upper bound timestamp (a date, a string like \"2006-01-02\") of the period to analyze.
   * @param getSearchesNoClicks.limit - How many items to fetch.
   * @param getSearchesNoClicks.offset - From which position to start retrieving results.
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

    if (index === null || index === undefined) {
      throw new Error(
        'Required parameter index was null or undefined when calling getSearchesNoClicks.'
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
   * @param getSearchesNoResults - The getSearchesNoResults parameters.
   * @param getSearchesNoResults.index - The index name to target.
   * @param getSearchesNoResults.startDate - The lower bound timestamp (a date, a string like \"2006-01-02\") of the period to analyze.
   * @param getSearchesNoResults.endDate - The upper bound timestamp (a date, a string like \"2006-01-02\") of the period to analyze.
   * @param getSearchesNoResults.limit - How many items to fetch.
   * @param getSearchesNoResults.offset - From which position to start retrieving results.
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

    if (index === null || index === undefined) {
      throw new Error(
        'Required parameter index was null or undefined when calling getSearchesNoResults.'
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
   * @param getStatus - The getStatus parameters.
   * @param getStatus.index - The index name to target.
   */
  getStatus({ index }: GetStatusProps): Promise<GetStatusResponse> {
    const path = '/2/status';
    const headers: Headers = { Accept: 'application/json' };
    const queryParameters: Record<string, string> = {};

    if (index === null || index === undefined) {
      throw new Error(
        'Required parameter index was null or undefined when calling getStatus.'
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
   * @param getTopCountries - The getTopCountries parameters.
   * @param getTopCountries.index - The index name to target.
   * @param getTopCountries.startDate - The lower bound timestamp (a date, a string like \"2006-01-02\") of the period to analyze.
   * @param getTopCountries.endDate - The upper bound timestamp (a date, a string like \"2006-01-02\") of the period to analyze.
   * @param getTopCountries.limit - How many items to fetch.
   * @param getTopCountries.offset - From which position to start retrieving results.
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

    if (index === null || index === undefined) {
      throw new Error(
        'Required parameter index was null or undefined when calling getTopCountries.'
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
   * @param getTopFilterAttributes - The getTopFilterAttributes parameters.
   * @param getTopFilterAttributes.index - The index name to target.
   * @param getTopFilterAttributes.startDate - The lower bound timestamp (a date, a string like \"2006-01-02\") of the period to analyze.
   * @param getTopFilterAttributes.endDate - The upper bound timestamp (a date, a string like \"2006-01-02\") of the period to analyze.
   * @param getTopFilterAttributes.limit - How many items to fetch.
   * @param getTopFilterAttributes.offset - From which position to start retrieving results.
   * @param getTopFilterAttributes.tags - Filter metrics on the provided tags. Each tag must correspond to an analyticsTags set at search time. Multiple tags can be combined with the operators OR and AND. If a tag contains characters like spaces or parentheses, it should be URL encoded.
   */
  getTopFilterAttributes({
    index,
    startDate,
    endDate,
    limit,
    offset,
    tags,
  }: GetTopFilterAttributesProps): Promise<GetTopFilterAttributesResponse> {
    const path = '/2/filters';
    const headers: Headers = { Accept: 'application/json' };
    const queryParameters: Record<string, string> = {};

    if (index === null || index === undefined) {
      throw new Error(
        'Required parameter index was null or undefined when calling getTopFilterAttributes.'
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
   * Returns top filter attributes for a given search. Limited to the 1000 most used filters.
   *
   * @summary Returns top filter attributes for a given search.
   * @param getTopFilterAttributesForSearch - The getTopFilterAttributesForSearch parameters.
   * @param getTopFilterAttributesForSearch.index - The index name to target.
   * @param getTopFilterAttributesForSearch.search - The query term. Must match the exact user input.
   * @param getTopFilterAttributesForSearch.startDate - The lower bound timestamp (a date, a string like \"2006-01-02\") of the period to analyze.
   * @param getTopFilterAttributesForSearch.endDate - The upper bound timestamp (a date, a string like \"2006-01-02\") of the period to analyze.
   * @param getTopFilterAttributesForSearch.limit - How many items to fetch.
   * @param getTopFilterAttributesForSearch.offset - From which position to start retrieving results.
   * @param getTopFilterAttributesForSearch.tags - Filter metrics on the provided tags. Each tag must correspond to an analyticsTags set at search time. Multiple tags can be combined with the operators OR and AND. If a tag contains characters like spaces or parentheses, it should be URL encoded.
   */
  getTopFilterAttributesForSearch({
    index,
    search,
    startDate,
    endDate,
    limit,
    offset,
    tags,
  }: GetTopFilterAttributesForSearchProps): Promise<GetTopFilterAttributesResponse> {
    const path = '/2/filters?search={search}'.replace(
      '{search}',
      encodeURIComponent(String(search))
    );
    const headers: Headers = { Accept: 'application/json' };
    const queryParameters: Record<string, string> = {};

    if (index === null || index === undefined) {
      throw new Error(
        'Required parameter index was null or undefined when calling getTopFilterAttributesForSearch.'
      );
    }

    if (search === null || search === undefined) {
      throw new Error(
        'Required parameter search was null or undefined when calling getTopFilterAttributesForSearch.'
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
   * Returns top filters for the given attribute. Limited to the 1000 most used filters.
   *
   * @summary Returns top filters for the given attribute.
   * @param getTopFilterForAttribute - The getTopFilterForAttribute parameters.
   * @param getTopFilterForAttribute.attribute - The exact name of the attribute.
   * @param getTopFilterForAttribute.index - The index name to target.
   * @param getTopFilterForAttribute.startDate - The lower bound timestamp (a date, a string like \"2006-01-02\") of the period to analyze.
   * @param getTopFilterForAttribute.endDate - The upper bound timestamp (a date, a string like \"2006-01-02\") of the period to analyze.
   * @param getTopFilterForAttribute.limit - How many items to fetch.
   * @param getTopFilterForAttribute.offset - From which position to start retrieving results.
   * @param getTopFilterForAttribute.tags - Filter metrics on the provided tags. Each tag must correspond to an analyticsTags set at search time. Multiple tags can be combined with the operators OR and AND. If a tag contains characters like spaces or parentheses, it should be URL encoded.
   */
  getTopFilterForAttribute({
    attribute,
    index,
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

    if (attribute === null || attribute === undefined) {
      throw new Error(
        'Required parameter attribute was null or undefined when calling getTopFilterForAttribute.'
      );
    }

    if (index === null || index === undefined) {
      throw new Error(
        'Required parameter index was null or undefined when calling getTopFilterForAttribute.'
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
   * Returns top filters for the given attributes and search. Several attributes can be given by separating them with a comma. Several attributes can be given by separating them with a comma.
   *
   * @summary Returns top filters for the given attributes and search.
   * @param getTopFiltersForAttributesSearch - The getTopFiltersForAttributesSearch parameters.
   * @param getTopFiltersForAttributesSearch.attributes - The exact names of the attributes, separated by commas.
   * @param getTopFiltersForAttributesSearch.index - The index name to target.
   * @param getTopFiltersForAttributesSearch.search - The query term. Must match the exact user input.
   * @param getTopFiltersForAttributesSearch.startDate - The lower bound timestamp (a date, a string like \"2006-01-02\") of the period to analyze.
   * @param getTopFiltersForAttributesSearch.endDate - The upper bound timestamp (a date, a string like \"2006-01-02\") of the period to analyze.
   * @param getTopFiltersForAttributesSearch.limit - How many items to fetch.
   * @param getTopFiltersForAttributesSearch.offset - From which position to start retrieving results.
   * @param getTopFiltersForAttributesSearch.tags - Filter metrics on the provided tags. Each tag must correspond to an analyticsTags set at search time. Multiple tags can be combined with the operators OR and AND. If a tag contains characters like spaces or parentheses, it should be URL encoded.
   */
  getTopFiltersForAttributesSearch({
    attributes,
    index,
    search,
    startDate,
    endDate,
    limit,
    offset,
    tags,
  }: GetTopFiltersForAttributesSearchProps): Promise<GetTopFilterForAttributeResponse> {
    const path = '/2/filters/{attributes}?search={search}'
      .replace('{attributes}', encodeURIComponent(String(attributes)))
      .replace('{search}', encodeURIComponent(String(search)));
    const headers: Headers = { Accept: 'application/json' };
    const queryParameters: Record<string, string> = {};

    if (attributes === null || attributes === undefined) {
      throw new Error(
        'Required parameter attributes was null or undefined when calling getTopFiltersForAttributesSearch.'
      );
    }

    if (index === null || index === undefined) {
      throw new Error(
        'Required parameter index was null or undefined when calling getTopFiltersForAttributesSearch.'
      );
    }

    if (search === null || search === undefined) {
      throw new Error(
        'Required parameter search was null or undefined when calling getTopFiltersForAttributesSearch.'
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
   * Returns top filters with no results. Limited to the 1000 most used filters.
   *
   * @summary Returns top filters with no results.
   * @param getTopFiltersNoResults - The getTopFiltersNoResults parameters.
   * @param getTopFiltersNoResults.index - The index name to target.
   * @param getTopFiltersNoResults.startDate - The lower bound timestamp (a date, a string like \"2006-01-02\") of the period to analyze.
   * @param getTopFiltersNoResults.endDate - The upper bound timestamp (a date, a string like \"2006-01-02\") of the period to analyze.
   * @param getTopFiltersNoResults.limit - How many items to fetch.
   * @param getTopFiltersNoResults.offset - From which position to start retrieving results.
   * @param getTopFiltersNoResults.tags - Filter metrics on the provided tags. Each tag must correspond to an analyticsTags set at search time. Multiple tags can be combined with the operators OR and AND. If a tag contains characters like spaces or parentheses, it should be URL encoded.
   */
  getTopFiltersNoResults({
    index,
    startDate,
    endDate,
    limit,
    offset,
    tags,
  }: GetTopFiltersNoResultsProps): Promise<GetTopFiltersNoResultsResponse> {
    const path = '/2/filters/noResults';
    const headers: Headers = { Accept: 'application/json' };
    const queryParameters: Record<string, string> = {};

    if (index === null || index === undefined) {
      throw new Error(
        'Required parameter index was null or undefined when calling getTopFiltersNoResults.'
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
   * Returns top filters for the given no result search. Limited to the 1000 most used filters.
   *
   * @summary Returns top filters for the given no result search.
   * @param getTopFiltersNoResultsForSearch - The getTopFiltersNoResultsForSearch parameters.
   * @param getTopFiltersNoResultsForSearch.index - The index name to target.
   * @param getTopFiltersNoResultsForSearch.search - The query term. Must match the exact user input.
   * @param getTopFiltersNoResultsForSearch.startDate - The lower bound timestamp (a date, a string like \"2006-01-02\") of the period to analyze.
   * @param getTopFiltersNoResultsForSearch.endDate - The upper bound timestamp (a date, a string like \"2006-01-02\") of the period to analyze.
   * @param getTopFiltersNoResultsForSearch.limit - How many items to fetch.
   * @param getTopFiltersNoResultsForSearch.offset - From which position to start retrieving results.
   * @param getTopFiltersNoResultsForSearch.tags - Filter metrics on the provided tags. Each tag must correspond to an analyticsTags set at search time. Multiple tags can be combined with the operators OR and AND. If a tag contains characters like spaces or parentheses, it should be URL encoded.
   */
  getTopFiltersNoResultsForSearch({
    index,
    search,
    startDate,
    endDate,
    limit,
    offset,
    tags,
  }: GetTopFiltersNoResultsForSearchProps): Promise<GetTopFiltersNoResultsResponse> {
    const path = '/2/filters/noResults?search={search}'.replace(
      '{search}',
      encodeURIComponent(String(search))
    );
    const headers: Headers = { Accept: 'application/json' };
    const queryParameters: Record<string, string> = {};

    if (index === null || index === undefined) {
      throw new Error(
        'Required parameter index was null or undefined when calling getTopFiltersNoResultsForSearch.'
      );
    }

    if (search === null || search === undefined) {
      throw new Error(
        'Required parameter search was null or undefined when calling getTopFiltersNoResultsForSearch.'
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
   * Returns top hits. Limited to the 1000 most frequent ones.
   *
   * @summary Returns top hits.
   * @param getTopHits - The getTopHits parameters.
   * @param getTopHits.index - The index name to target.
   * @param getTopHits.clickAnalytics - Whether to include the click-through and conversion rates for a search.
   * @param getTopHits.startDate - The lower bound timestamp (a date, a string like \"2006-01-02\") of the period to analyze.
   * @param getTopHits.endDate - The upper bound timestamp (a date, a string like \"2006-01-02\") of the period to analyze.
   * @param getTopHits.limit - How many items to fetch.
   * @param getTopHits.offset - From which position to start retrieving results.
   * @param getTopHits.tags - Filter metrics on the provided tags. Each tag must correspond to an analyticsTags set at search time. Multiple tags can be combined with the operators OR and AND. If a tag contains characters like spaces or parentheses, it should be URL encoded.
   */
  getTopHits({
    index,
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

    if (index === null || index === undefined) {
      throw new Error(
        'Required parameter index was null or undefined when calling getTopHits.'
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
   * Returns top hits for the given search. Limited to the 1000 most frequent ones.
   *
   * @summary Returns top hits for the given search.
   * @param getTopHitsForSearch - The getTopHitsForSearch parameters.
   * @param getTopHitsForSearch.index - The index name to target.
   * @param getTopHitsForSearch.search - The query term. Must match the exact user input.
   * @param getTopHitsForSearch.clickAnalytics - Whether to include the click-through and conversion rates for a search.
   * @param getTopHitsForSearch.startDate - The lower bound timestamp (a date, a string like \"2006-01-02\") of the period to analyze.
   * @param getTopHitsForSearch.endDate - The upper bound timestamp (a date, a string like \"2006-01-02\") of the period to analyze.
   * @param getTopHitsForSearch.limit - How many items to fetch.
   * @param getTopHitsForSearch.offset - From which position to start retrieving results.
   * @param getTopHitsForSearch.tags - Filter metrics on the provided tags. Each tag must correspond to an analyticsTags set at search time. Multiple tags can be combined with the operators OR and AND. If a tag contains characters like spaces or parentheses, it should be URL encoded.
   */
  getTopHitsForSearch({
    index,
    search,
    clickAnalytics,
    startDate,
    endDate,
    limit,
    offset,
    tags,
  }: GetTopHitsForSearchProps): Promise<
    GetTopHitsResponse | GetTopHitsResponseWithAnalytics
  > {
    const path = '/2/hits?search={search}'.replace(
      '{search}',
      encodeURIComponent(String(search))
    );
    const headers: Headers = { Accept: 'application/json' };
    const queryParameters: Record<string, string> = {};

    if (index === null || index === undefined) {
      throw new Error(
        'Required parameter index was null or undefined when calling getTopHitsForSearch.'
      );
    }

    if (search === null || search === undefined) {
      throw new Error(
        'Required parameter search was null or undefined when calling getTopHitsForSearch.'
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
   * @param getTopSearches - The getTopSearches parameters.
   * @param getTopSearches.index - The index name to target.
   * @param getTopSearches.clickAnalytics - Whether to include the click-through and conversion rates for a search.
   * @param getTopSearches.startDate - The lower bound timestamp (a date, a string like \"2006-01-02\") of the period to analyze.
   * @param getTopSearches.endDate - The upper bound timestamp (a date, a string like \"2006-01-02\") of the period to analyze.
   * @param getTopSearches.orderBy - Reorder the results.
   * @param getTopSearches.direction - The sorting of the result.
   * @param getTopSearches.limit - How many items to fetch.
   * @param getTopSearches.offset - From which position to start retrieving results.
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

    if (index === null || index === undefined) {
      throw new Error(
        'Required parameter index was null or undefined when calling getTopSearches.'
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
   * @param getUsersCount - The getUsersCount parameters.
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

    if (index === null || index === undefined) {
      throw new Error(
        'Required parameter index was null or undefined when calling getUsersCount.'
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
  index: string;
  startDate?: Date;
  endDate?: Date;
  tags?: string;
};

export type GetClickPositionsProps = {
  index: string;
  startDate?: Date;
  endDate?: Date;
  tags?: string;
};

export type GetClickThroughRateProps = {
  index: string;
  startDate?: Date;
  endDate?: Date;
  tags?: string;
};

export type GetConversationRateProps = {
  index: string;
  startDate?: Date;
  endDate?: Date;
  tags?: string;
};

export type GetNoClickRateProps = {
  index: string;
  startDate?: Date;
  endDate?: Date;
  tags?: string;
};

export type GetNoResultsRateProps = {
  index: string;
  startDate?: Date;
  endDate?: Date;
  tags?: string;
};

export type GetSearchesCountProps = {
  index: string;
  startDate?: Date;
  endDate?: Date;
  tags?: string;
};

export type GetSearchesNoClicksProps = {
  index: string;
  startDate?: Date;
  endDate?: Date;
  limit?: number;
  offset?: number;
  tags?: string;
};

export type GetSearchesNoResultsProps = {
  index: string;
  startDate?: Date;
  endDate?: Date;
  limit?: number;
  offset?: number;
  tags?: string;
};

export type GetStatusProps = {
  index: string;
};

export type GetTopCountriesProps = {
  index: string;
  startDate?: Date;
  endDate?: Date;
  limit?: number;
  offset?: number;
  tags?: string;
};

export type GetTopFilterAttributesProps = {
  index: string;
  startDate?: Date;
  endDate?: Date;
  limit?: number;
  offset?: number;
  tags?: string;
};

export type GetTopFilterAttributesForSearchProps = {
  index: string;
  search: string;
  startDate?: Date;
  endDate?: Date;
  limit?: number;
  offset?: number;
  tags?: string;
};

export type GetTopFilterForAttributeProps = {
  attribute: string;
  index: string;
  startDate?: Date;
  endDate?: Date;
  limit?: number;
  offset?: number;
  tags?: string;
};

export type GetTopFiltersForAttributesSearchProps = {
  attributes: string;
  index: string;
  search: string;
  startDate?: Date;
  endDate?: Date;
  limit?: number;
  offset?: number;
  tags?: string;
};

export type GetTopFiltersNoResultsProps = {
  index: string;
  startDate?: Date;
  endDate?: Date;
  limit?: number;
  offset?: number;
  tags?: string;
};

export type GetTopFiltersNoResultsForSearchProps = {
  index: string;
  search: string;
  startDate?: Date;
  endDate?: Date;
  limit?: number;
  offset?: number;
  tags?: string;
};

export type GetTopHitsProps = {
  index: string;
  clickAnalytics?: boolean;
  startDate?: Date;
  endDate?: Date;
  limit?: number;
  offset?: number;
  tags?: string;
};

export type GetTopHitsForSearchProps = {
  index: string;
  search: string;
  clickAnalytics?: boolean;
  startDate?: Date;
  endDate?: Date;
  limit?: number;
  offset?: number;
  tags?: string;
};

export type GetTopSearchesProps = {
  index: string;
  clickAnalytics?: boolean;
  startDate?: Date;
  endDate?: Date;
  orderBy?: Record<string, any>;
  direction?: Record<string, any>;
  limit?: number;
  offset?: number;
  tags?: string;
};

export type GetUsersCountProps = {
  index: string;
  startDate?: Date;
  endDate?: Date;
  tags?: string;
};