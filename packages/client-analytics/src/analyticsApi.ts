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

export const apiClientVersion = '5.0.0';

export type Region = 'de' | 'us';

function getDefaultHosts(region?: Region): Host[] {
  const regionHost = region ? `.${region}.` : '.';

  return [
    {
      url: `analytics${regionHost}algolia.com`,
      accept: 'readWrite',
      protocol: 'https',
    },
  ];
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function createAnalyticsApi(
  options: CreateClientOptions & { region?: Region }
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
      client: 'Analytics',
      version: apiClientVersion,
    }),
    timeouts: options.timeouts,
    requester: options.requester,
  });

  function addUserAgent(segment: string, version?: string): void {
    transporter.userAgent.add({ segment, version });
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
   * Returns the average click position. The endpoint returns a value for the complete given time range, as well as a value per day.
   *
   * @summary Returns the average click position.
   * @param getAverageClickPosition - The getAverageClickPosition object.
   * @param getAverageClickPosition.index - The index name to target.
   * @param getAverageClickPosition.startDate - The lower bound timestamp (a date, a string like \"2006-01-02\") of the period to analyze.
   * @param getAverageClickPosition.endDate - The upper bound timestamp (a date, a string like \"2006-01-02\") of the period to analyze.
   * @param getAverageClickPosition.tags - Filter metrics on the provided tags. Each tag must correspond to an analyticsTags set at search time. Multiple tags can be combined with the operators OR and AND. If a tag contains characters like spaces or parentheses, it should be URL encoded.
   */
  function getAverageClickPosition({
    index,
    startDate,
    endDate,
    tags,
  }: GetAverageClickPositionProps): Promise<GetAverageClickPositionResponse> {
    const requestPath = '/2/clicks/averageClickPosition';
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
      path: requestPath,
    };

    return transporter.request(request, {
      queryParameters,
      headers,
    });
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
  function getClickPositions({
    index,
    startDate,
    endDate,
    tags,
  }: GetClickPositionsProps): Promise<GetClickPositionsResponse> {
    const requestPath = '/2/clicks/positions';
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
      path: requestPath,
    };

    return transporter.request(request, {
      queryParameters,
      headers,
    });
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
  function getClickThroughRate({
    index,
    startDate,
    endDate,
    tags,
  }: GetClickThroughRateProps): Promise<GetClickThroughRateResponse> {
    const requestPath = '/2/clicks/clickThroughRate';
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
      path: requestPath,
    };

    return transporter.request(request, {
      queryParameters,
      headers,
    });
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
  function getConversationRate({
    index,
    startDate,
    endDate,
    tags,
  }: GetConversationRateProps): Promise<GetConversationRateResponse> {
    const requestPath = '/2/conversions/conversionRate';
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
      path: requestPath,
    };

    return transporter.request(request, {
      queryParameters,
      headers,
    });
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
  function getNoClickRate({
    index,
    startDate,
    endDate,
    tags,
  }: GetNoClickRateProps): Promise<GetNoClickRateResponse> {
    const requestPath = '/2/searches/noClickRate';
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
      path: requestPath,
    };

    return transporter.request(request, {
      queryParameters,
      headers,
    });
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
  function getNoResultsRate({
    index,
    startDate,
    endDate,
    tags,
  }: GetNoResultsRateProps): Promise<GetNoResultsRateResponse> {
    const requestPath = '/2/searches/noResultRate';
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
      path: requestPath,
    };

    return transporter.request(request, {
      queryParameters,
      headers,
    });
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
  function getSearchesCount({
    index,
    startDate,
    endDate,
    tags,
  }: GetSearchesCountProps): Promise<GetSearchesCountResponse> {
    const requestPath = '/2/searches/count';
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
      path: requestPath,
    };

    return transporter.request(request, {
      queryParameters,
      headers,
    });
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
  function getSearchesNoClicks({
    index,
    startDate,
    endDate,
    limit,
    offset,
    tags,
  }: GetSearchesNoClicksProps): Promise<GetSearchesNoClicksResponse> {
    const requestPath = '/2/searches/noClicks';
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
      path: requestPath,
    };

    return transporter.request(request, {
      queryParameters,
      headers,
    });
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
  function getSearchesNoResults({
    index,
    startDate,
    endDate,
    limit,
    offset,
    tags,
  }: GetSearchesNoResultsProps): Promise<GetSearchesNoResultsResponse> {
    const requestPath = '/2/searches/noResults';
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
      path: requestPath,
    };

    return transporter.request(request, {
      queryParameters,
      headers,
    });
  }

  /**
   * Returns the latest update time of the analytics API for a given index. If the index has been recently created and/or no search has been performed yet the updated time will be null.
   *
   * @summary Get latest update time of the analytics API.
   * @param getStatus - The getStatus object.
   * @param getStatus.index - The index name to target.
   */
  function getStatus({ index }: GetStatusProps): Promise<GetStatusResponse> {
    const requestPath = '/2/status';
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
      path: requestPath,
    };

    return transporter.request(request, {
      queryParameters,
      headers,
    });
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
  function getTopCountries({
    index,
    startDate,
    endDate,
    limit,
    offset,
    tags,
  }: GetTopCountriesProps): Promise<GetTopCountriesResponse> {
    const requestPath = '/2/countries';
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
      path: requestPath,
    };

    return transporter.request(request, {
      queryParameters,
      headers,
    });
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
  function getTopFilterAttributes({
    index,
    search,
    startDate,
    endDate,
    limit,
    offset,
    tags,
  }: GetTopFilterAttributesProps): Promise<GetTopFilterAttributesResponse> {
    const requestPath = '/2/filters';
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
      path: requestPath,
    };

    return transporter.request(request, {
      queryParameters,
      headers,
    });
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
  function getTopFilterForAttribute({
    attribute,
    index,
    search,
    startDate,
    endDate,
    limit,
    offset,
    tags,
  }: GetTopFilterForAttributeProps): Promise<GetTopFilterForAttributeResponse> {
    const requestPath = '/2/filters/{attribute}'.replace(
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
      path: requestPath,
    };

    return transporter.request(request, {
      queryParameters,
      headers,
    });
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
  function getTopFiltersNoResults({
    index,
    search,
    startDate,
    endDate,
    limit,
    offset,
    tags,
  }: GetTopFiltersNoResultsProps): Promise<GetTopFiltersNoResultsResponse> {
    const requestPath = '/2/filters/noResults';
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
      path: requestPath,
    };

    return transporter.request(request, {
      queryParameters,
      headers,
    });
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
  function getTopHits({
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
    const requestPath = '/2/hits';
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
      path: requestPath,
    };

    return transporter.request(request, {
      queryParameters,
      headers,
    });
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
  function getTopSearches({
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
    const requestPath = '/2/searches';
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
      path: requestPath,
    };

    return transporter.request(request, {
      queryParameters,
      headers,
    });
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
  function getUsersCount({
    index,
    startDate,
    endDate,
    tags,
  }: GetUsersCountProps): Promise<GetUsersCountResponse> {
    const requestPath = '/2/users/count';
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

  return {
    addUserAgent,
    del,
    get,
    getAverageClickPosition,
    getClickPositions,
    getClickThroughRate,
    getConversationRate,
    getNoClickRate,
    getNoResultsRate,
    getSearchesCount,
    getSearchesNoClicks,
    getSearchesNoResults,
    getStatus,
    getTopCountries,
    getTopFilterAttributes,
    getTopFilterForAttribute,
    getTopFiltersNoResults,
    getTopHits,
    getTopSearches,
    getUsersCount,
    post,
    put,
  };
}

export type AnalyticsApi = ReturnType<typeof createAnalyticsApi>;

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
