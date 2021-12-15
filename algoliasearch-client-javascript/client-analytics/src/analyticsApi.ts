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
   * @param index - The index name to target.
   * @param startDate - The lower bound timestamp (a date, a string like “2006-01-02”) of the period to analyze.
   * @param endDate - The upper bound timestamp (a date, a string like “2006-01-02”) of the period to analyze.
   * @param tags - Filter metrics on the provided tags. Each tag must correspond to an analyticsTags set at search time. Multiple tags can be combined with the operators OR and AND. If a tag contains characters like spaces or parentheses, it should be URL encoded.
   */
  getAverageClickPosition(
    index: string,
    startDate?: Date,
    endDate?: Date,
    tags?: string
  ): Promise<GetAverageClickPositionResponse> {
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
   * @param index - The index name to target.
   * @param startDate - The lower bound timestamp (a date, a string like “2006-01-02”) of the period to analyze.
   * @param endDate - The upper bound timestamp (a date, a string like “2006-01-02”) of the period to analyze.
   * @param tags - Filter metrics on the provided tags. Each tag must correspond to an analyticsTags set at search time. Multiple tags can be combined with the operators OR and AND. If a tag contains characters like spaces or parentheses, it should be URL encoded.
   */
  getClickPositions(
    index: string,
    startDate?: Date,
    endDate?: Date,
    tags?: string
  ): Promise<GetClickPositionsResponse> {
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
   * @param index - The index name to target.
   * @param startDate - The lower bound timestamp (a date, a string like “2006-01-02”) of the period to analyze.
   * @param endDate - The upper bound timestamp (a date, a string like “2006-01-02”) of the period to analyze.
   * @param tags - Filter metrics on the provided tags. Each tag must correspond to an analyticsTags set at search time. Multiple tags can be combined with the operators OR and AND. If a tag contains characters like spaces or parentheses, it should be URL encoded.
   */
  getClickThroughRate(
    index: string,
    startDate?: Date,
    endDate?: Date,
    tags?: string
  ): Promise<GetClickThroughRateResponse> {
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
   * @param index - The index name to target.
   * @param startDate - The lower bound timestamp (a date, a string like “2006-01-02”) of the period to analyze.
   * @param endDate - The upper bound timestamp (a date, a string like “2006-01-02”) of the period to analyze.
   * @param tags - Filter metrics on the provided tags. Each tag must correspond to an analyticsTags set at search time. Multiple tags can be combined with the operators OR and AND. If a tag contains characters like spaces or parentheses, it should be URL encoded.
   */
  getConversationRate(
    index: string,
    startDate?: Date,
    endDate?: Date,
    tags?: string
  ): Promise<GetConversationRateResponse> {
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
   * @param index - The index name to target.
   * @param startDate - The lower bound timestamp (a date, a string like “2006-01-02”) of the period to analyze.
   * @param endDate - The upper bound timestamp (a date, a string like “2006-01-02”) of the period to analyze.
   * @param tags - Filter metrics on the provided tags. Each tag must correspond to an analyticsTags set at search time. Multiple tags can be combined with the operators OR and AND. If a tag contains characters like spaces or parentheses, it should be URL encoded.
   */
  getNoClickRate(
    index: string,
    startDate?: Date,
    endDate?: Date,
    tags?: string
  ): Promise<GetNoClickRateResponse> {
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
   * @param index - The index name to target.
   * @param startDate - The lower bound timestamp (a date, a string like “2006-01-02”) of the period to analyze.
   * @param endDate - The upper bound timestamp (a date, a string like “2006-01-02”) of the period to analyze.
   * @param tags - Filter metrics on the provided tags. Each tag must correspond to an analyticsTags set at search time. Multiple tags can be combined with the operators OR and AND. If a tag contains characters like spaces or parentheses, it should be URL encoded.
   */
  getNoResultsRate(
    index: string,
    startDate?: Date,
    endDate?: Date,
    tags?: string
  ): Promise<GetNoResultsRateResponse> {
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
   * @param index - The index name to target.
   * @param startDate - The lower bound timestamp (a date, a string like “2006-01-02”) of the period to analyze.
   * @param endDate - The upper bound timestamp (a date, a string like “2006-01-02”) of the period to analyze.
   * @param tags - Filter metrics on the provided tags. Each tag must correspond to an analyticsTags set at search time. Multiple tags can be combined with the operators OR and AND. If a tag contains characters like spaces or parentheses, it should be URL encoded.
   */
  getSearchesCount(
    index: string,
    startDate?: Date,
    endDate?: Date,
    tags?: string
  ): Promise<GetSearchesCountResponse> {
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
   * @param index - The index name to target.
   * @param startDate - The lower bound timestamp (a date, a string like “2006-01-02”) of the period to analyze.
   * @param endDate - The upper bound timestamp (a date, a string like “2006-01-02”) of the period to analyze.
   * @param limit - How many items to fetch.
   * @param offset - From which position to start retrieving results.
   * @param tags - Filter metrics on the provided tags. Each tag must correspond to an analyticsTags set at search time. Multiple tags can be combined with the operators OR and AND. If a tag contains characters like spaces or parentheses, it should be URL encoded.
   */
  getSearchesNoClicks(
    index: string,
    startDate?: Date,
    endDate?: Date,
    limit?: number,
    offset?: number,
    tags?: string
  ): Promise<GetSearchesNoClicksResponse> {
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
   * @param index - The index name to target.
   * @param startDate - The lower bound timestamp (a date, a string like “2006-01-02”) of the period to analyze.
   * @param endDate - The upper bound timestamp (a date, a string like “2006-01-02”) of the period to analyze.
   * @param limit - How many items to fetch.
   * @param offset - From which position to start retrieving results.
   * @param tags - Filter metrics on the provided tags. Each tag must correspond to an analyticsTags set at search time. Multiple tags can be combined with the operators OR and AND. If a tag contains characters like spaces or parentheses, it should be URL encoded.
   */
  getSearchesNoResults(
    index: string,
    startDate?: Date,
    endDate?: Date,
    limit?: number,
    offset?: number,
    tags?: string
  ): Promise<GetSearchesNoResultsResponse> {
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
   * @param index - The index name to target.
   */
  getStatus(index: string): Promise<GetStatusResponse> {
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
   * @param index - The index name to target.
   * @param startDate - The lower bound timestamp (a date, a string like “2006-01-02”) of the period to analyze.
   * @param endDate - The upper bound timestamp (a date, a string like “2006-01-02”) of the period to analyze.
   * @param limit - How many items to fetch.
   * @param offset - From which position to start retrieving results.
   * @param tags - Filter metrics on the provided tags. Each tag must correspond to an analyticsTags set at search time. Multiple tags can be combined with the operators OR and AND. If a tag contains characters like spaces or parentheses, it should be URL encoded.
   */
  getTopCountries(
    index: string,
    startDate?: Date,
    endDate?: Date,
    limit?: number,
    offset?: number,
    tags?: string
  ): Promise<GetTopCountriesResponse> {
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
   * @param index - The index name to target.
   * @param startDate - The lower bound timestamp (a date, a string like “2006-01-02”) of the period to analyze.
   * @param endDate - The upper bound timestamp (a date, a string like “2006-01-02”) of the period to analyze.
   * @param limit - How many items to fetch.
   * @param offset - From which position to start retrieving results.
   * @param tags - Filter metrics on the provided tags. Each tag must correspond to an analyticsTags set at search time. Multiple tags can be combined with the operators OR and AND. If a tag contains characters like spaces or parentheses, it should be URL encoded.
   */
  getTopFilterAttributes(
    index: string,
    startDate?: Date,
    endDate?: Date,
    limit?: number,
    offset?: number,
    tags?: string
  ): Promise<GetTopFilterAttributesResponse> {
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
   * @param index - The index name to target.
   * @param search - The query term. Must match the exact user input.
   * @param startDate - The lower bound timestamp (a date, a string like “2006-01-02”) of the period to analyze.
   * @param endDate - The upper bound timestamp (a date, a string like “2006-01-02”) of the period to analyze.
   * @param limit - How many items to fetch.
   * @param offset - From which position to start retrieving results.
   * @param tags - Filter metrics on the provided tags. Each tag must correspond to an analyticsTags set at search time. Multiple tags can be combined with the operators OR and AND. If a tag contains characters like spaces or parentheses, it should be URL encoded.
   */
  getTopFilterAttributesForSearch(
    index: string,
    search: string,
    startDate?: Date,
    endDate?: Date,
    limit?: number,
    offset?: number,
    tags?: string
  ): Promise<GetTopFilterAttributesResponse> {
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
   * @param attribute - The exact name of the attribute.
   * @param index - The index name to target.
   * @param startDate - The lower bound timestamp (a date, a string like “2006-01-02”) of the period to analyze.
   * @param endDate - The upper bound timestamp (a date, a string like “2006-01-02”) of the period to analyze.
   * @param limit - How many items to fetch.
   * @param offset - From which position to start retrieving results.
   * @param tags - Filter metrics on the provided tags. Each tag must correspond to an analyticsTags set at search time. Multiple tags can be combined with the operators OR and AND. If a tag contains characters like spaces or parentheses, it should be URL encoded.
   */
  getTopFilterForAttribute(
    attribute: string,
    index: string,
    startDate?: Date,
    endDate?: Date,
    limit?: number,
    offset?: number,
    tags?: string
  ): Promise<GetTopFilterForAttributeResponse> {
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
   * @param attributes - The exact names of the attributes, separated by commas.
   * @param index - The index name to target.
   * @param search - The query term. Must match the exact user input.
   * @param startDate - The lower bound timestamp (a date, a string like “2006-01-02”) of the period to analyze.
   * @param endDate - The upper bound timestamp (a date, a string like “2006-01-02”) of the period to analyze.
   * @param limit - How many items to fetch.
   * @param offset - From which position to start retrieving results.
   * @param tags - Filter metrics on the provided tags. Each tag must correspond to an analyticsTags set at search time. Multiple tags can be combined with the operators OR and AND. If a tag contains characters like spaces or parentheses, it should be URL encoded.
   */
  getTopFiltersForAttributesSearch(
    attributes: string,
    index: string,
    search: string,
    startDate?: Date,
    endDate?: Date,
    limit?: number,
    offset?: number,
    tags?: string
  ): Promise<GetTopFilterForAttributeResponse> {
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
   * @param index - The index name to target.
   * @param startDate - The lower bound timestamp (a date, a string like “2006-01-02”) of the period to analyze.
   * @param endDate - The upper bound timestamp (a date, a string like “2006-01-02”) of the period to analyze.
   * @param limit - How many items to fetch.
   * @param offset - From which position to start retrieving results.
   * @param tags - Filter metrics on the provided tags. Each tag must correspond to an analyticsTags set at search time. Multiple tags can be combined with the operators OR and AND. If a tag contains characters like spaces or parentheses, it should be URL encoded.
   */
  getTopFiltersNoResults(
    index: string,
    startDate?: Date,
    endDate?: Date,
    limit?: number,
    offset?: number,
    tags?: string
  ): Promise<GetTopFiltersNoResultsResponse> {
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
   * @param index - The index name to target.
   * @param search - The query term. Must match the exact user input.
   * @param startDate - The lower bound timestamp (a date, a string like “2006-01-02”) of the period to analyze.
   * @param endDate - The upper bound timestamp (a date, a string like “2006-01-02”) of the period to analyze.
   * @param limit - How many items to fetch.
   * @param offset - From which position to start retrieving results.
   * @param tags - Filter metrics on the provided tags. Each tag must correspond to an analyticsTags set at search time. Multiple tags can be combined with the operators OR and AND. If a tag contains characters like spaces or parentheses, it should be URL encoded.
   */
  getTopFiltersNoResultsForSearch(
    index: string,
    search: string,
    startDate?: Date,
    endDate?: Date,
    limit?: number,
    offset?: number,
    tags?: string
  ): Promise<GetTopFiltersNoResultsResponse> {
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
   * @param index - The index name to target.
   * @param clickAnalytics - Whether to include the click-through and conversion rates for a search.
   * @param startDate - The lower bound timestamp (a date, a string like “2006-01-02”) of the period to analyze.
   * @param endDate - The upper bound timestamp (a date, a string like “2006-01-02”) of the period to analyze.
   * @param limit - How many items to fetch.
   * @param offset - From which position to start retrieving results.
   * @param tags - Filter metrics on the provided tags. Each tag must correspond to an analyticsTags set at search time. Multiple tags can be combined with the operators OR and AND. If a tag contains characters like spaces or parentheses, it should be URL encoded.
   */
  getTopHits(
    index: string,
    clickAnalytics?: boolean,
    startDate?: Date,
    endDate?: Date,
    limit?: number,
    offset?: number,
    tags?: string
  ): Promise<GetTopHitsResponse | GetTopHitsResponseWithAnalytics> {
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
   * @param index - The index name to target.
   * @param search - The query term. Must match the exact user input.
   * @param clickAnalytics - Whether to include the click-through and conversion rates for a search.
   * @param startDate - The lower bound timestamp (a date, a string like “2006-01-02”) of the period to analyze.
   * @param endDate - The upper bound timestamp (a date, a string like “2006-01-02”) of the period to analyze.
   * @param limit - How many items to fetch.
   * @param offset - From which position to start retrieving results.
   * @param tags - Filter metrics on the provided tags. Each tag must correspond to an analyticsTags set at search time. Multiple tags can be combined with the operators OR and AND. If a tag contains characters like spaces or parentheses, it should be URL encoded.
   */
  getTopHitsForSearch(
    index: string,
    search: string,
    clickAnalytics?: boolean,
    startDate?: Date,
    endDate?: Date,
    limit?: number,
    offset?: number,
    tags?: string
  ): Promise<GetTopHitsResponse | GetTopHitsResponseWithAnalytics> {
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
   * @param index - The index name to target.
   * @param clickAnalytics - Whether to include the click-through and conversion rates for a search.
   * @param startDate - The lower bound timestamp (a date, a string like “2006-01-02”) of the period to analyze.
   * @param endDate - The upper bound timestamp (a date, a string like “2006-01-02”) of the period to analyze.
   * @param orderBy - Reorder the results.
   * @param direction - The sorting of the result.
   * @param limit - How many items to fetch.
   * @param offset - From which position to start retrieving results.
   * @param tags - Filter metrics on the provided tags. Each tag must correspond to an analyticsTags set at search time. Multiple tags can be combined with the operators OR and AND. If a tag contains characters like spaces or parentheses, it should be URL encoded.
   */
  getTopSearches(
    index: string,
    clickAnalytics?: boolean,
    startDate?: Date,
    endDate?: Date,
    orderBy?: Record<string, any>,
    direction?: Record<string, any>,
    limit?: number,
    offset?: number,
    tags?: string
  ): Promise<GetTopSearchesResponse | GetTopSearchesResponseWithAnalytics> {
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
   * @param index - The index name to target.
   * @param startDate - The lower bound timestamp (a date, a string like “2006-01-02”) of the period to analyze.
   * @param endDate - The upper bound timestamp (a date, a string like “2006-01-02”) of the period to analyze.
   * @param tags - Filter metrics on the provided tags. Each tag must correspond to an analyticsTags set at search time. Multiple tags can be combined with the operators OR and AND. If a tag contains characters like spaces or parentheses, it should be URL encoded.
   */
  getUsersCount(
    index: string,
    startDate?: Date,
    endDate?: Date,
    tags?: string
  ): Promise<GetUsersCountResponse> {
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
