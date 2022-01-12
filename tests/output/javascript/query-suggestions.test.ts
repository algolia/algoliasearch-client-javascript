import {
  QuerySuggestionsApi,
  EchoRequester,
} from '@algolia/client-query-suggestions';

const appId = process.env.ALGOLIA_APPLICATION_ID || 'test_app_id';
const apiKey = process.env.ALGOLIA_SEARCH_KEY || 'test_api_key';

const client = new QuerySuggestionsApi(appId, apiKey, 'us', {
  requester: new EchoRequester(),
});

describe('createConfig', () => {
  test('createConfig', async () => {
    const req = await client.createConfig({
      querySuggestionsIndexWithIndexParam: {
        indexName: 'theIndexName',
        sourceIndices: [
          {
            indexName: 'testIndex',
            facets: [{ attributes: 'test' }],
            generate: [['facetA', 'facetB'], ['facetC']],
          },
        ],
        languages: ['french'],
        exclude: ['test'],
      },
    });

    expect((req as any).path).toEqual('/1/configs');
    expect((req as any).method).toEqual('POST');
    expect((req as any).data).toEqual({
      indexName: 'theIndexName',
      sourceIndices: [
        {
          indexName: 'testIndex',
          facets: [{ attributes: 'test' }],
          generate: [['facetA', 'facetB'], ['facetC']],
        },
      ],
      languages: ['french'],
      exclude: ['test'],
    });
    expect((req as any).searchParams).toEqual(undefined);
  });
});

describe('deleteConfig', () => {
  test('deleteConfig', async () => {
    const req = await client.deleteConfig({ indexName: 'theIndexName' });

    expect((req as any).path).toEqual('/1/configs/theIndexName');
    expect((req as any).method).toEqual('DELETE');
    expect((req as any).data).toEqual(undefined);
    expect((req as any).searchParams).toEqual(undefined);
  });
});

describe('getAllConfigs', () => {
  test('getAllConfigs', async () => {
    const req = await client.getAllConfigs();

    expect((req as any).path).toEqual('/1/configs');
    expect((req as any).method).toEqual('GET');
    expect((req as any).data).toEqual(undefined);
    expect((req as any).searchParams).toEqual(undefined);
  });
});

describe('getConfig', () => {
  test('getConfig', async () => {
    const req = await client.getConfig({ indexName: 'theIndexName' });

    expect((req as any).path).toEqual('/1/configs/theIndexName');
    expect((req as any).method).toEqual('GET');
    expect((req as any).data).toEqual(undefined);
    expect((req as any).searchParams).toEqual(undefined);
  });
});

describe('getConfigStatus', () => {
  test('getConfigStatus', async () => {
    const req = await client.getConfigStatus({ indexName: 'theIndexName' });

    expect((req as any).path).toEqual('/1/configs/theIndexName/status');
    expect((req as any).method).toEqual('GET');
    expect((req as any).data).toEqual(undefined);
    expect((req as any).searchParams).toEqual(undefined);
  });
});

describe('getLogFile', () => {
  test('getLogFile', async () => {
    const req = await client.getLogFile({ indexName: 'theIndexName' });

    expect((req as any).path).toEqual('/1/logs/theIndexName');
    expect((req as any).method).toEqual('GET');
    expect((req as any).data).toEqual(undefined);
    expect((req as any).searchParams).toEqual(undefined);
  });
});

describe('updateConfig', () => {
  test('updateConfig', async () => {
    const req = await client.updateConfig({
      indexName: 'theIndexName',
      querySuggestionsIndexParam: {
        sourceIndices: [
          {
            indexName: 'testIndex',
            facets: [{ attributes: 'test' }],
            generate: [['facetA', 'facetB'], ['facetC']],
          },
        ],
        languages: ['french'],
        exclude: ['test'],
      },
    });

    expect((req as any).path).toEqual('/1/configs/theIndexName');
    expect((req as any).method).toEqual('PUT');
    expect((req as any).data).toEqual({
      sourceIndices: [
        {
          indexName: 'testIndex',
          facets: [{ attributes: 'test' }],
          generate: [['facetA', 'facetB'], ['facetC']],
        },
      ],
      languages: ['french'],
      exclude: ['test'],
    });
    expect((req as any).searchParams).toEqual(undefined);
  });
});
