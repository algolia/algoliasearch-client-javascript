import { AnalyticsApi, EchoRequester } from '@algolia/client-analytics';

const appId = process.env.ALGOLIA_APPLICATION_ID || 'test_app_id';
const apiKey = process.env.ALGOLIA_SEARCH_KEY || 'test_api_key';

const client = new AnalyticsApi(appId, apiKey, 'de', {
  requester: new EchoRequester(),
});

describe('getAverageClickPosition', () => {
  test('get getAverageClickPosition with minimal parameters', async () => {
    const req = await client.getAverageClickPosition({
      index: 'index',
    });

    expect(req).toMatchObject({
      path: '/2/clicks/averageClickPosition',
      method: 'GET',
    });
  });

  test('get getAverageClickPosition with all parameters', async () => {
    const req = await client.getAverageClickPosition({
      index: 'index',
      startDate: new Date('1999-09-19'),
      endDate: new Date('2001-01-01'),
      tags: 'tag',
    });

    expect(req).toMatchObject({
      path: '/2/clicks/averageClickPosition',
      method: 'GET',
    });
  });
});

describe('getClickPositions', () => {
  test('get getClickPositions with minimal parameters', async () => {
    const req = await client.getClickPositions({
      index: 'index',
    });

    expect(req).toMatchObject({
      path: '/2/clicks/positions',
      method: 'GET',
    });
  });

  test('get getClickPositions with all parameters', async () => {
    const req = await client.getClickPositions({
      index: 'index',
      startDate: new Date('1999-09-19'),
      endDate: new Date('2001-01-01'),
      tags: 'tag',
    });

    expect(req).toMatchObject({
      path: '/2/clicks/positions',
      method: 'GET',
    });
  });
});

describe('getClickThroughRate', () => {
  test('get getClickThroughRate with minimal parameters', async () => {
    const req = await client.getClickThroughRate({
      index: 'index',
    });

    expect(req).toMatchObject({
      path: '/2/clicks/clickThroughRate',
      method: 'GET',
    });
  });

  test('get getClickThroughRate with all parameters', async () => {
    const req = await client.getClickThroughRate({
      index: 'index',
      startDate: new Date('1999-09-19'),
      endDate: new Date('2001-01-01'),
      tags: 'tag',
    });

    expect(req).toMatchObject({
      path: '/2/clicks/clickThroughRate',
      method: 'GET',
    });
  });
});

describe('getConversationRate', () => {
  test('get getConversationRate with minimal parameters', async () => {
    const req = await client.getConversationRate({
      index: 'index',
    });

    expect(req).toMatchObject({
      path: '/2/conversions/conversionRate',
      method: 'GET',
    });
  });

  test('get getConversationRate with all parameters', async () => {
    const req = await client.getConversationRate({
      index: 'index',
      startDate: new Date('1999-09-19'),
      endDate: new Date('2001-01-01'),
      tags: 'tag',
    });

    expect(req).toMatchObject({
      path: '/2/conversions/conversionRate',
      method: 'GET',
    });
  });
});

describe('getNoClickRate', () => {
  test('get getNoClickRate with minimal parameters', async () => {
    const req = await client.getNoClickRate({
      index: 'index',
    });

    expect(req).toMatchObject({
      path: '/2/searches/noClickRate',
      method: 'GET',
    });
  });

  test('get getNoClickRate with all parameters', async () => {
    const req = await client.getNoClickRate({
      index: 'index',
      startDate: new Date('1999-09-19'),
      endDate: new Date('2001-01-01'),
      tags: 'tag',
    });

    expect(req).toMatchObject({
      path: '/2/searches/noClickRate',
      method: 'GET',
    });
  });
});

describe('getNoResultsRate', () => {
  test('get getNoResultsRate with minimal parameters', async () => {
    const req = await client.getNoResultsRate({
      index: 'index',
    });

    expect(req).toMatchObject({
      path: '/2/searches/noResultRate',
      method: 'GET',
    });
  });

  test('get getNoResultsRate with all parameters', async () => {
    const req = await client.getNoResultsRate({
      index: 'index',
      startDate: new Date('1999-09-19'),
      endDate: new Date('2001-01-01'),
      tags: 'tag',
    });

    expect(req).toMatchObject({
      path: '/2/searches/noResultRate',
      method: 'GET',
    });
  });
});

describe('getSearchesCount', () => {
  test('get getSearchesCount with minimal parameters', async () => {
    const req = await client.getSearchesCount({
      index: 'index',
    });

    expect(req).toMatchObject({
      path: '/2/searches/count',
      method: 'GET',
    });
  });

  test('get getSearchesCount with all parameters', async () => {
    const req = await client.getSearchesCount({
      index: 'index',
      startDate: new Date('1999-09-19'),
      endDate: new Date('2001-01-01'),
      tags: 'tag',
    });

    expect(req).toMatchObject({
      path: '/2/searches/count',
      method: 'GET',
    });
  });
});

describe('getSearchesNoClicks', () => {
  test('get getSearchesNoClicks with minimal parameters', async () => {
    const req = await client.getSearchesNoClicks({
      index: 'index',
    });

    expect(req).toMatchObject({
      path: '/2/searches/noClicks',
      method: 'GET',
    });
  });

  test('get getSearchesNoClicks with all parameters', async () => {
    const req = await client.getSearchesNoClicks({
      index: 'index',
      startDate: new Date('1999-09-19'),
      endDate: new Date('2001-01-01'),
      limit: 21,
      offset: 42,
      tags: 'tag',
    });

    expect(req).toMatchObject({
      path: '/2/searches/noClicks',
      method: 'GET',
    });
  });
});

describe('getSearchesNoResults', () => {
  test('get getSearchesNoResults with minimal parameters', async () => {
    const req = await client.getSearchesNoResults({
      index: 'index',
    });

    expect(req).toMatchObject({
      path: '/2/searches/noResults',
      method: 'GET',
    });
  });

  test('get getSearchesNoResults with all parameters', async () => {
    const req = await client.getSearchesNoResults({
      index: 'index',
      startDate: new Date('1999-09-19'),
      endDate: new Date('2001-01-01'),
      limit: 21,
      offset: 42,
      tags: 'tag',
    });

    expect(req).toMatchObject({
      path: '/2/searches/noResults',
      method: 'GET',
    });
  });
});

describe('getStatus', () => {
  test('get getStatus with minimal parameters', async () => {
    const req = await client.getStatus({
      index: 'index',
    });

    expect(req).toMatchObject({
      path: '/2/status',
      method: 'GET',
    });
  });
});

describe('getTopCountries', () => {
  test('get getTopCountries with minimal parameters', async () => {
    const req = await client.getTopCountries({
      index: 'index',
    });

    expect(req).toMatchObject({
      path: '/2/countries',
      method: 'GET',
    });
  });

  test('get getTopCountries with all parameters', async () => {
    const req = await client.getTopCountries({
      index: 'index',
      startDate: new Date('1999-09-19'),
      endDate: new Date('2001-01-01'),
      limit: 21,
      offset: 42,
      tags: 'tag',
    });

    expect(req).toMatchObject({
      path: '/2/countries',
      method: 'GET',
    });
  });
});

describe('getTopFilterAttributes', () => {
  test('get getTopFilterAttributes with minimal parameters', async () => {
    const req = await client.getTopFilterAttributes({
      index: 'index',
    });

    expect(req).toMatchObject({
      path: '/2/filters',
      method: 'GET',
    });
  });

  test('get getTopFilterAttributes with all parameters', async () => {
    const req = await client.getTopFilterAttributes({
      index: 'index',
      startDate: new Date('1999-09-19'),
      endDate: new Date('2001-01-01'),
      limit: 21,
      offset: 42,
      tags: 'tag',
    });

    expect(req).toMatchObject({
      path: '/2/filters',
      method: 'GET',
    });
  });
});

describe('getTopFilterAttributesForSearch', () => {
  test('get getTopFilterAttributesForSearch with minimal parameters', async () => {
    const req = await client.getTopFilterAttributesForSearch({
      index: 'index',
      search: 'mySearch',
    });

    expect(req).toMatchObject({
      path: '/2/filters?search=mySearch',
      method: 'GET',
    });
  });

  test('get getTopFilterAttributesForSearch with all parameters', async () => {
    const req = await client.getTopFilterAttributesForSearch({
      index: 'index',
      search: 'mySearch',
      startDate: new Date('1999-09-19'),
      endDate: new Date('2001-01-01'),
      limit: 21,
      offset: 42,
      tags: 'tag',
    });

    expect(req).toMatchObject({
      path: '/2/filters?search=mySearch',
      method: 'GET',
    });
  });
});

describe('getTopFilterForAttribute', () => {
  test('get getTopFilterForAttribute with minimal parameters', async () => {
    const req = await client.getTopFilterForAttribute({
      attribute: 'myAttribute',
      index: 'index',
    });

    expect(req).toMatchObject({
      path: '/2/filters/myAttribute',
      method: 'GET',
    });
  });

  test('get getTopFilterForAttribute with minimal parameters and multiple attributes', async () => {
    const req = await client.getTopFilterForAttribute({
      attribute: 'myAttribute1,myAttribute2',
      index: 'index',
    });

    expect(req).toMatchObject({
      path: '/2/filters/myAttribute1%2CmyAttribute2',
      method: 'GET',
    });
  });

  test('get getTopFilterForAttribute with all parameters', async () => {
    const req = await client.getTopFilterForAttribute({
      attribute: 'myAttribute',
      index: 'index',
      startDate: new Date('1999-09-19'),
      endDate: new Date('2001-01-01'),
      limit: 21,
      offset: 42,
      tags: 'tag',
    });

    expect(req).toMatchObject({
      path: '/2/filters/myAttribute',
      method: 'GET',
    });
  });

  test('get getTopFilterForAttribute with all parameters and multiple attributes', async () => {
    const req = await client.getTopFilterForAttribute({
      attribute: 'myAttribute1,myAttribute2',
      index: 'index',
      startDate: new Date('1999-09-19'),
      endDate: new Date('2001-01-01'),
      limit: 21,
      offset: 42,
      tags: 'tag',
    });

    expect(req).toMatchObject({
      path: '/2/filters/myAttribute1%2CmyAttribute2',
      method: 'GET',
    });
  });
});

describe('getTopFiltersForAttributesSearch', () => {
  test('get getTopFiltersForAttributesSearch with minimal parameters', async () => {
    const req = await client.getTopFiltersForAttributesSearch({
      attributes: 'myAttribute',
      index: 'index',
      search: 'mySearch',
    });

    expect(req).toMatchObject({
      path: '/2/filters/myAttribute?search=mySearch',
      method: 'GET',
    });
  });

  test('get getTopFiltersForAttributesSearch with minimal parameters and multiple attributes', async () => {
    const req = await client.getTopFiltersForAttributesSearch({
      attributes: 'myAttribute1,myAttribute2',
      index: 'index',
      search: 'mySearch',
    });

    expect(req).toMatchObject({
      path: '/2/filters/myAttribute1%2CmyAttribute2?search=mySearch',
      method: 'GET',
    });
  });

  test('get getTopFiltersForAttributesSearch with all parameters', async () => {
    const req = await client.getTopFiltersForAttributesSearch({
      attributes: 'myAttribute',
      index: 'index',
      search: 'mySearch',
      startDate: new Date('1999-09-19'),
      endDate: new Date('2001-01-01'),
      limit: 21,
      offset: 42,
      tags: 'tag',
    });

    expect(req).toMatchObject({
      path: '/2/filters/myAttribute?search=mySearch',
      method: 'GET',
    });
  });

  test('get getTopFiltersForAttributesSearch with all parameters and multiple attributes', async () => {
    const req = await client.getTopFiltersForAttributesSearch({
      attributes: 'myAttribute1,myAttribute2',
      index: 'index',
      search: 'mySearch',
      startDate: new Date('1999-09-19'),
      endDate: new Date('2001-01-01'),
      limit: 21,
      offset: 42,
      tags: 'tag',
    });

    expect(req).toMatchObject({
      path: '/2/filters/myAttribute1%2CmyAttribute2?search=mySearch',
      method: 'GET',
    });
  });
});

describe('getTopFiltersNoResults', () => {
  test('get getTopFiltersNoResults with minimal parameters', async () => {
    const req = await client.getTopFiltersNoResults({
      index: 'index',
    });

    expect(req).toMatchObject({
      path: '/2/filters/noResults',
      method: 'GET',
    });
  });

  test('get getTopFiltersNoResults with all parameters', async () => {
    const req = await client.getTopFiltersNoResults({
      index: 'index',
      startDate: new Date('1999-09-19'),
      endDate: new Date('2001-01-01'),
      limit: 21,
      offset: 42,
      tags: 'tag',
    });

    expect(req).toMatchObject({
      path: '/2/filters/noResults',
      method: 'GET',
    });
  });
});

describe('getTopFiltersNoResultsForSearch', () => {
  test('get getTopFiltersNoResultsForSearch with minimal parameters', async () => {
    const req = await client.getTopFiltersNoResultsForSearch({
      index: 'index',
      search: 'mySearch',
    });

    expect(req).toMatchObject({
      path: '/2/filters/noResults?search=mySearch',
      method: 'GET',
    });
  });

  test('get getTopFiltersNoResultsForSearch with all parameters', async () => {
    const req = await client.getTopFiltersNoResultsForSearch({
      index: 'index',
      search: 'mySearch',
      startDate: new Date('1999-09-19'),
      endDate: new Date('2001-01-01'),
      limit: 21,
      offset: 42,
      tags: 'tag',
    });

    expect(req).toMatchObject({
      path: '/2/filters/noResults?search=mySearch',
      method: 'GET',
    });
  });
});

describe('getTopHits', () => {
  test('get getTopHits with minimal parameters', async () => {
    const req = await client.getTopHits({
      index: 'index',
    });

    expect(req).toMatchObject({
      path: '/2/hits',
      method: 'GET',
    });
  });

  test('get getTopHits with all parameters', async () => {
    const req = await client.getTopHits({
      index: 'index',
      clickAnalytics: true,
      startDate: new Date('1999-09-19'),
      endDate: new Date('2001-01-01'),
      limit: 21,
      offset: 42,
      tags: 'tag',
    });

    expect(req).toMatchObject({
      path: '/2/hits',
      method: 'GET',
    });
  });
});

describe('getTopHitsForSearch', () => {
  test('get getTopHitsForSearch with minimal parameters', async () => {
    const req = await client.getTopHitsForSearch({
      index: 'index',
      search: 'mySearch',
    });

    expect(req).toMatchObject({
      path: '/2/hits?search=mySearch',
      method: 'GET',
    });
  });

  test('get getTopHitsForSearch with all parameters', async () => {
    const req = await client.getTopHitsForSearch({
      index: 'index',
      search: 'mySearch',
      clickAnalytics: true,
      startDate: new Date('1999-09-19'),
      endDate: new Date('2001-01-01'),
      limit: 21,
      offset: 42,
      tags: 'tag',
    });

    expect(req).toMatchObject({
      path: '/2/hits?search=mySearch',
      method: 'GET',
    });
  });
});

describe('getTopSearches', () => {
  test('get getTopSearches with minimal parameters', async () => {
    const req = await client.getTopSearches({
      index: 'index',
    });

    expect(req).toMatchObject({
      path: '/2/searches',
      method: 'GET',
    });
  });

  test('get getTopSearches with all parameters', async () => {
    const req = await client.getTopSearches({
      index: 'index',
      clickAnalytics: true,
      startDate: new Date('1999-09-19'),
      endDate: new Date('2001-01-01'),
      orderBy: 'searchCount',
      direction: 'asc',
      limit: 21,
      offset: 42,
      tags: 'tag',
    });

    expect(req).toMatchObject({
      path: '/2/searches',
      method: 'GET',
    });
  });
});

describe('getUsersCount', () => {
  test('get getUsersCount with minimal parameters', async () => {
    const req = await client.getUsersCount({
      index: 'index',
    });

    expect(req).toMatchObject({
      path: '/2/users/count',
      method: 'GET',
    });
  });

  test('get getUsersCount with all parameters', async () => {
    const req = await client.getUsersCount({
      index: 'index',
      startDate: new Date('1999-09-19'),
      endDate: new Date('2001-01-01'),
      tags: 'tag',
    });

    expect(req).toMatchObject({
      path: '/2/users/count',
      method: 'GET',
    });
  });
});
