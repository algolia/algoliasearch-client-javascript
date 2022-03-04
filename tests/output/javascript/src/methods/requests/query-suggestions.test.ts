import type { EchoResponse } from '@experimental-api-clients-automation/client-common';
import { querySuggestionsApi } from '@experimental-api-clients-automation/client-query-suggestions';
import { echoRequester } from '@experimental-api-clients-automation/requester-node-http';

const appId = process.env.ALGOLIA_APPLICATION_ID || 'test_app_id';
const apiKey = process.env.ALGOLIA_SEARCH_KEY || 'test_api_key';

const client = querySuggestionsApi(appId, apiKey, 'us', {
  requester: echoRequester(),
});

describe('createConfig', () => {
  test('createConfig', async () => {
    const req = (await client.createConfig({
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
    })) as unknown as EchoResponse;

    expect(req.path).toEqual('/1/configs');
    expect(req.method).toEqual('POST');
    expect(req.data).toEqual({
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
    expect(req.searchParams).toEqual(undefined);
  });
});

describe('deleteConfig', () => {
  test('deleteConfig', async () => {
    const req = (await client.deleteConfig({
      indexName: 'theIndexName',
    })) as unknown as EchoResponse;

    expect(req.path).toEqual('/1/configs/theIndexName');
    expect(req.method).toEqual('DELETE');
    expect(req.data).toEqual(undefined);
    expect(req.searchParams).toEqual(undefined);
  });
});

describe('getAllConfigs', () => {
  test('getAllConfigs', async () => {
    const req = (await client.getAllConfigs()) as unknown as EchoResponse;

    expect(req.path).toEqual('/1/configs');
    expect(req.method).toEqual('GET');
    expect(req.data).toEqual(undefined);
    expect(req.searchParams).toEqual(undefined);
  });
});

describe('getConfig', () => {
  test('getConfig', async () => {
    const req = (await client.getConfig({
      indexName: 'theIndexName',
    })) as unknown as EchoResponse;

    expect(req.path).toEqual('/1/configs/theIndexName');
    expect(req.method).toEqual('GET');
    expect(req.data).toEqual(undefined);
    expect(req.searchParams).toEqual(undefined);
  });
});

describe('getConfigStatus', () => {
  test('getConfigStatus', async () => {
    const req = (await client.getConfigStatus({
      indexName: 'theIndexName',
    })) as unknown as EchoResponse;

    expect(req.path).toEqual('/1/configs/theIndexName/status');
    expect(req.method).toEqual('GET');
    expect(req.data).toEqual(undefined);
    expect(req.searchParams).toEqual(undefined);
  });
});

describe('getLogFile', () => {
  test('getLogFile', async () => {
    const req = (await client.getLogFile({
      indexName: 'theIndexName',
    })) as unknown as EchoResponse;

    expect(req.path).toEqual('/1/logs/theIndexName');
    expect(req.method).toEqual('GET');
    expect(req.data).toEqual(undefined);
    expect(req.searchParams).toEqual(undefined);
  });
});

describe('updateConfig', () => {
  test('updateConfig', async () => {
    const req = (await client.updateConfig({
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
    })) as unknown as EchoResponse;

    expect(req.path).toEqual('/1/configs/theIndexName');
    expect(req.method).toEqual('PUT');
    expect(req.data).toEqual({
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
    expect(req.searchParams).toEqual(undefined);
  });
});
