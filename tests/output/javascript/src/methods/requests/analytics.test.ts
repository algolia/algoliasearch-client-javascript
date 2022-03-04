import { analyticsApi } from '@experimental-api-clients-automation/client-analytics';
import type { EchoResponse } from '@experimental-api-clients-automation/client-common';
import { echoRequester } from '@experimental-api-clients-automation/requester-node-http';

const appId = process.env.ALGOLIA_APPLICATION_ID || 'test_app_id';
const apiKey = process.env.ALGOLIA_SEARCH_KEY || 'test_api_key';

const client = analyticsApi(appId, apiKey, 'us', {
  requester: echoRequester(),
});

describe('getAverageClickPosition', () => {
  test('get getAverageClickPosition with minimal parameters', async () => {
    const req = (await client.getAverageClickPosition({
      index: 'index',
    })) as unknown as EchoResponse;

    expect(req.path).toEqual('/2/clicks/averageClickPosition');
    expect(req.method).toEqual('GET');
    expect(req.data).toEqual(undefined);
    expect(req.searchParams).toEqual({ index: 'index' });
  });

  test('get getAverageClickPosition with all parameters', async () => {
    const req = (await client.getAverageClickPosition({
      index: 'index',
      startDate: '1999-09-19',
      endDate: '2001-01-01',
      tags: 'tag',
    })) as unknown as EchoResponse;

    expect(req.path).toEqual('/2/clicks/averageClickPosition');
    expect(req.method).toEqual('GET');
    expect(req.data).toEqual(undefined);
    expect(req.searchParams).toEqual({
      index: 'index',
      startDate: '1999-09-19',
      endDate: '2001-01-01',
      tags: 'tag',
    });
  });
});

describe('getClickPositions', () => {
  test('get getClickPositions with minimal parameters', async () => {
    const req = (await client.getClickPositions({
      index: 'index',
    })) as unknown as EchoResponse;

    expect(req.path).toEqual('/2/clicks/positions');
    expect(req.method).toEqual('GET');
    expect(req.data).toEqual(undefined);
    expect(req.searchParams).toEqual({ index: 'index' });
  });

  test('get getClickPositions with all parameters', async () => {
    const req = (await client.getClickPositions({
      index: 'index',
      startDate: '1999-09-19',
      endDate: '2001-01-01',
      tags: 'tag',
    })) as unknown as EchoResponse;

    expect(req.path).toEqual('/2/clicks/positions');
    expect(req.method).toEqual('GET');
    expect(req.data).toEqual(undefined);
    expect(req.searchParams).toEqual({
      index: 'index',
      startDate: '1999-09-19',
      endDate: '2001-01-01',
      tags: 'tag',
    });
  });
});

describe('getClickThroughRate', () => {
  test('get getClickThroughRate with minimal parameters', async () => {
    const req = (await client.getClickThroughRate({
      index: 'index',
    })) as unknown as EchoResponse;

    expect(req.path).toEqual('/2/clicks/clickThroughRate');
    expect(req.method).toEqual('GET');
    expect(req.data).toEqual(undefined);
    expect(req.searchParams).toEqual({ index: 'index' });
  });

  test('get getClickThroughRate with all parameters', async () => {
    const req = (await client.getClickThroughRate({
      index: 'index',
      startDate: '1999-09-19',
      endDate: '2001-01-01',
      tags: 'tag',
    })) as unknown as EchoResponse;

    expect(req.path).toEqual('/2/clicks/clickThroughRate');
    expect(req.method).toEqual('GET');
    expect(req.data).toEqual(undefined);
    expect(req.searchParams).toEqual({
      index: 'index',
      startDate: '1999-09-19',
      endDate: '2001-01-01',
      tags: 'tag',
    });
  });
});

describe('getConversationRate', () => {
  test('get getConversationRate with minimal parameters', async () => {
    const req = (await client.getConversationRate({
      index: 'index',
    })) as unknown as EchoResponse;

    expect(req.path).toEqual('/2/conversions/conversionRate');
    expect(req.method).toEqual('GET');
    expect(req.data).toEqual(undefined);
    expect(req.searchParams).toEqual({ index: 'index' });
  });

  test('get getConversationRate with all parameters', async () => {
    const req = (await client.getConversationRate({
      index: 'index',
      startDate: '1999-09-19',
      endDate: '2001-01-01',
      tags: 'tag',
    })) as unknown as EchoResponse;

    expect(req.path).toEqual('/2/conversions/conversionRate');
    expect(req.method).toEqual('GET');
    expect(req.data).toEqual(undefined);
    expect(req.searchParams).toEqual({
      index: 'index',
      startDate: '1999-09-19',
      endDate: '2001-01-01',
      tags: 'tag',
    });
  });
});

describe('getNoClickRate', () => {
  test('get getNoClickRate with minimal parameters', async () => {
    const req = (await client.getNoClickRate({
      index: 'index',
    })) as unknown as EchoResponse;

    expect(req.path).toEqual('/2/searches/noClickRate');
    expect(req.method).toEqual('GET');
    expect(req.data).toEqual(undefined);
    expect(req.searchParams).toEqual({ index: 'index' });
  });

  test('get getNoClickRate with all parameters', async () => {
    const req = (await client.getNoClickRate({
      index: 'index',
      startDate: '1999-09-19',
      endDate: '2001-01-01',
      tags: 'tag',
    })) as unknown as EchoResponse;

    expect(req.path).toEqual('/2/searches/noClickRate');
    expect(req.method).toEqual('GET');
    expect(req.data).toEqual(undefined);
    expect(req.searchParams).toEqual({
      index: 'index',
      startDate: '1999-09-19',
      endDate: '2001-01-01',
      tags: 'tag',
    });
  });
});

describe('getNoResultsRate', () => {
  test('get getNoResultsRate with minimal parameters', async () => {
    const req = (await client.getNoResultsRate({
      index: 'index',
    })) as unknown as EchoResponse;

    expect(req.path).toEqual('/2/searches/noResultRate');
    expect(req.method).toEqual('GET');
    expect(req.data).toEqual(undefined);
    expect(req.searchParams).toEqual({ index: 'index' });
  });

  test('get getNoResultsRate with all parameters', async () => {
    const req = (await client.getNoResultsRate({
      index: 'index',
      startDate: '1999-09-19',
      endDate: '2001-01-01',
      tags: 'tag',
    })) as unknown as EchoResponse;

    expect(req.path).toEqual('/2/searches/noResultRate');
    expect(req.method).toEqual('GET');
    expect(req.data).toEqual(undefined);
    expect(req.searchParams).toEqual({
      index: 'index',
      startDate: '1999-09-19',
      endDate: '2001-01-01',
      tags: 'tag',
    });
  });
});

describe('getSearchesCount', () => {
  test('get getSearchesCount with minimal parameters', async () => {
    const req = (await client.getSearchesCount({
      index: 'index',
    })) as unknown as EchoResponse;

    expect(req.path).toEqual('/2/searches/count');
    expect(req.method).toEqual('GET');
    expect(req.data).toEqual(undefined);
    expect(req.searchParams).toEqual({ index: 'index' });
  });

  test('get getSearchesCount with all parameters', async () => {
    const req = (await client.getSearchesCount({
      index: 'index',
      startDate: '1999-09-19',
      endDate: '2001-01-01',
      tags: 'tag',
    })) as unknown as EchoResponse;

    expect(req.path).toEqual('/2/searches/count');
    expect(req.method).toEqual('GET');
    expect(req.data).toEqual(undefined);
    expect(req.searchParams).toEqual({
      index: 'index',
      startDate: '1999-09-19',
      endDate: '2001-01-01',
      tags: 'tag',
    });
  });
});

describe('getSearchesNoClicks', () => {
  test('get getSearchesNoClicks with minimal parameters', async () => {
    const req = (await client.getSearchesNoClicks({
      index: 'index',
    })) as unknown as EchoResponse;

    expect(req.path).toEqual('/2/searches/noClicks');
    expect(req.method).toEqual('GET');
    expect(req.data).toEqual(undefined);
    expect(req.searchParams).toEqual({ index: 'index' });
  });

  test('get getSearchesNoClicks with all parameters', async () => {
    const req = (await client.getSearchesNoClicks({
      index: 'index',
      startDate: '1999-09-19',
      endDate: '2001-01-01',
      limit: 21,
      offset: 42,
      tags: 'tag',
    })) as unknown as EchoResponse;

    expect(req.path).toEqual('/2/searches/noClicks');
    expect(req.method).toEqual('GET');
    expect(req.data).toEqual(undefined);
    expect(req.searchParams).toEqual({
      index: 'index',
      startDate: '1999-09-19',
      endDate: '2001-01-01',
      limit: '21',
      offset: '42',
      tags: 'tag',
    });
  });
});

describe('getSearchesNoResults', () => {
  test('get getSearchesNoResults with minimal parameters', async () => {
    const req = (await client.getSearchesNoResults({
      index: 'index',
    })) as unknown as EchoResponse;

    expect(req.path).toEqual('/2/searches/noResults');
    expect(req.method).toEqual('GET');
    expect(req.data).toEqual(undefined);
    expect(req.searchParams).toEqual({ index: 'index' });
  });

  test('get getSearchesNoResults with all parameters', async () => {
    const req = (await client.getSearchesNoResults({
      index: 'index',
      startDate: '1999-09-19',
      endDate: '2001-01-01',
      limit: 21,
      offset: 42,
      tags: 'tag',
    })) as unknown as EchoResponse;

    expect(req.path).toEqual('/2/searches/noResults');
    expect(req.method).toEqual('GET');
    expect(req.data).toEqual(undefined);
    expect(req.searchParams).toEqual({
      index: 'index',
      startDate: '1999-09-19',
      endDate: '2001-01-01',
      limit: '21',
      offset: '42',
      tags: 'tag',
    });
  });
});

describe('getStatus', () => {
  test('get getStatus with minimal parameters', async () => {
    const req = (await client.getStatus({
      index: 'index',
    })) as unknown as EchoResponse;

    expect(req.path).toEqual('/2/status');
    expect(req.method).toEqual('GET');
    expect(req.data).toEqual(undefined);
    expect(req.searchParams).toEqual({ index: 'index' });
  });
});

describe('getTopCountries', () => {
  test('get getTopCountries with minimal parameters', async () => {
    const req = (await client.getTopCountries({
      index: 'index',
    })) as unknown as EchoResponse;

    expect(req.path).toEqual('/2/countries');
    expect(req.method).toEqual('GET');
    expect(req.data).toEqual(undefined);
    expect(req.searchParams).toEqual({ index: 'index' });
  });

  test('get getTopCountries with all parameters', async () => {
    const req = (await client.getTopCountries({
      index: 'index',
      startDate: '1999-09-19',
      endDate: '2001-01-01',
      limit: 21,
      offset: 42,
      tags: 'tag',
    })) as unknown as EchoResponse;

    expect(req.path).toEqual('/2/countries');
    expect(req.method).toEqual('GET');
    expect(req.data).toEqual(undefined);
    expect(req.searchParams).toEqual({
      index: 'index',
      startDate: '1999-09-19',
      endDate: '2001-01-01',
      limit: '21',
      offset: '42',
      tags: 'tag',
    });
  });
});

describe('getTopFilterAttributes', () => {
  test('get getTopFilterAttributes with minimal parameters', async () => {
    const req = (await client.getTopFilterAttributes({
      index: 'index',
    })) as unknown as EchoResponse;

    expect(req.path).toEqual('/2/filters');
    expect(req.method).toEqual('GET');
    expect(req.data).toEqual(undefined);
    expect(req.searchParams).toEqual({ index: 'index' });
  });

  test('get getTopFilterAttributes with all parameters', async () => {
    const req = (await client.getTopFilterAttributes({
      index: 'index',
      search: 'mySearch',
      startDate: '1999-09-19',
      endDate: '2001-01-01',
      limit: 21,
      offset: 42,
      tags: 'tag',
    })) as unknown as EchoResponse;

    expect(req.path).toEqual('/2/filters');
    expect(req.method).toEqual('GET');
    expect(req.data).toEqual(undefined);
    expect(req.searchParams).toEqual({
      index: 'index',
      search: 'mySearch',
      startDate: '1999-09-19',
      endDate: '2001-01-01',
      limit: '21',
      offset: '42',
      tags: 'tag',
    });
  });
});

describe('getTopFilterForAttribute', () => {
  test('get getTopFilterForAttribute with minimal parameters', async () => {
    const req = (await client.getTopFilterForAttribute({
      attribute: 'myAttribute',
      index: 'index',
    })) as unknown as EchoResponse;

    expect(req.path).toEqual('/2/filters/myAttribute');
    expect(req.method).toEqual('GET');
    expect(req.data).toEqual(undefined);
    expect(req.searchParams).toEqual({ index: 'index' });
  });

  test('get getTopFilterForAttribute with minimal parameters and multiple attributes', async () => {
    const req = (await client.getTopFilterForAttribute({
      attribute: 'myAttribute1,myAttribute2',
      index: 'index',
    })) as unknown as EchoResponse;

    expect(req.path).toEqual('/2/filters/myAttribute1%2CmyAttribute2');
    expect(req.method).toEqual('GET');
    expect(req.data).toEqual(undefined);
    expect(req.searchParams).toEqual({ index: 'index' });
  });

  test('get getTopFilterForAttribute with all parameters', async () => {
    const req = (await client.getTopFilterForAttribute({
      attribute: 'myAttribute',
      index: 'index',
      search: 'mySearch',
      startDate: '1999-09-19',
      endDate: '2001-01-01',
      limit: 21,
      offset: 42,
      tags: 'tag',
    })) as unknown as EchoResponse;

    expect(req.path).toEqual('/2/filters/myAttribute');
    expect(req.method).toEqual('GET');
    expect(req.data).toEqual(undefined);
    expect(req.searchParams).toEqual({
      index: 'index',
      search: 'mySearch',
      startDate: '1999-09-19',
      endDate: '2001-01-01',
      limit: '21',
      offset: '42',
      tags: 'tag',
    });
  });

  test('get getTopFilterForAttribute with all parameters and multiple attributes', async () => {
    const req = (await client.getTopFilterForAttribute({
      attribute: 'myAttribute1,myAttribute2',
      index: 'index',
      search: 'mySearch',
      startDate: '1999-09-19',
      endDate: '2001-01-01',
      limit: 21,
      offset: 42,
      tags: 'tag',
    })) as unknown as EchoResponse;

    expect(req.path).toEqual('/2/filters/myAttribute1%2CmyAttribute2');
    expect(req.method).toEqual('GET');
    expect(req.data).toEqual(undefined);
    expect(req.searchParams).toEqual({
      index: 'index',
      search: 'mySearch',
      startDate: '1999-09-19',
      endDate: '2001-01-01',
      limit: '21',
      offset: '42',
      tags: 'tag',
    });
  });
});

describe('getTopFiltersNoResults', () => {
  test('get getTopFiltersNoResults with minimal parameters', async () => {
    const req = (await client.getTopFiltersNoResults({
      index: 'index',
    })) as unknown as EchoResponse;

    expect(req.path).toEqual('/2/filters/noResults');
    expect(req.method).toEqual('GET');
    expect(req.data).toEqual(undefined);
    expect(req.searchParams).toEqual({ index: 'index' });
  });

  test('get getTopFiltersNoResults with all parameters', async () => {
    const req = (await client.getTopFiltersNoResults({
      index: 'index',
      search: 'mySearch',
      startDate: '1999-09-19',
      endDate: '2001-01-01',
      limit: 21,
      offset: 42,
      tags: 'tag',
    })) as unknown as EchoResponse;

    expect(req.path).toEqual('/2/filters/noResults');
    expect(req.method).toEqual('GET');
    expect(req.data).toEqual(undefined);
    expect(req.searchParams).toEqual({
      index: 'index',
      search: 'mySearch',
      startDate: '1999-09-19',
      endDate: '2001-01-01',
      limit: '21',
      offset: '42',
      tags: 'tag',
    });
  });
});

describe('getTopHits', () => {
  test('get getTopHits with minimal parameters', async () => {
    const req = (await client.getTopHits({
      index: 'index',
    })) as unknown as EchoResponse;

    expect(req.path).toEqual('/2/hits');
    expect(req.method).toEqual('GET');
    expect(req.data).toEqual(undefined);
    expect(req.searchParams).toEqual({ index: 'index' });
  });

  test('get getTopHits with all parameters', async () => {
    const req = (await client.getTopHits({
      index: 'index',
      search: 'mySearch',
      clickAnalytics: true,
      startDate: '1999-09-19',
      endDate: '2001-01-01',
      limit: 21,
      offset: 42,
      tags: 'tag',
    })) as unknown as EchoResponse;

    expect(req.path).toEqual('/2/hits');
    expect(req.method).toEqual('GET');
    expect(req.data).toEqual(undefined);
    expect(req.searchParams).toEqual({
      index: 'index',
      search: 'mySearch',
      clickAnalytics: 'true',
      startDate: '1999-09-19',
      endDate: '2001-01-01',
      limit: '21',
      offset: '42',
      tags: 'tag',
    });
  });
});

describe('getTopSearches', () => {
  test('get getTopSearches with minimal parameters', async () => {
    const req = (await client.getTopSearches({
      index: 'index',
    })) as unknown as EchoResponse;

    expect(req.path).toEqual('/2/searches');
    expect(req.method).toEqual('GET');
    expect(req.data).toEqual(undefined);
    expect(req.searchParams).toEqual({ index: 'index' });
  });

  test('get getTopSearches with all parameters', async () => {
    const req = (await client.getTopSearches({
      index: 'index',
      clickAnalytics: true,
      startDate: '1999-09-19',
      endDate: '2001-01-01',
      orderBy: 'searchCount',
      direction: 'asc',
      limit: 21,
      offset: 42,
      tags: 'tag',
    })) as unknown as EchoResponse;

    expect(req.path).toEqual('/2/searches');
    expect(req.method).toEqual('GET');
    expect(req.data).toEqual(undefined);
    expect(req.searchParams).toEqual({
      index: 'index',
      clickAnalytics: 'true',
      startDate: '1999-09-19',
      endDate: '2001-01-01',
      orderBy: 'searchCount',
      direction: 'asc',
      limit: '21',
      offset: '42',
      tags: 'tag',
    });
  });
});

describe('getUsersCount', () => {
  test('get getUsersCount with minimal parameters', async () => {
    const req = (await client.getUsersCount({
      index: 'index',
    })) as unknown as EchoResponse;

    expect(req.path).toEqual('/2/users/count');
    expect(req.method).toEqual('GET');
    expect(req.data).toEqual(undefined);
    expect(req.searchParams).toEqual({ index: 'index' });
  });

  test('get getUsersCount with all parameters', async () => {
    const req = (await client.getUsersCount({
      index: 'index',
      startDate: '1999-09-19',
      endDate: '2001-01-01',
      tags: 'tag',
    })) as unknown as EchoResponse;

    expect(req.path).toEqual('/2/users/count');
    expect(req.method).toEqual('GET');
    expect(req.data).toEqual(undefined);
    expect(req.searchParams).toEqual({
      index: 'index',
      startDate: '1999-09-19',
      endDate: '2001-01-01',
      tags: 'tag',
    });
  });
});
