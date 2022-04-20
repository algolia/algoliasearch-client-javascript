import type { EchoResponse } from '@experimental-api-clients-automation/client-common';
import { querySuggestionsClient } from '@experimental-api-clients-automation/client-query-suggestions';
import { echoRequester } from '@experimental-api-clients-automation/requester-node-http';

const appId = process.env.ALGOLIA_APPLICATION_ID || 'test_app_id';
const apiKey = process.env.ALGOLIA_SEARCH_KEY || 'test_api_key';

const client = querySuggestionsClient(appId, apiKey, 'us', {
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

describe('del', () => {
  test('allow del method for a custom path with minimal parameters', async () => {
    const req = (await client.del({
      path: '/test/minimal',
    })) as unknown as EchoResponse;

    expect(req.path).toEqual('/1/test/minimal');
    expect(req.method).toEqual('DELETE');
    expect(req.data).toEqual(undefined);
    expect(req.searchParams).toEqual(undefined);
  });

  test('allow del method for a custom path with all parameters', async () => {
    const req = (await client.del({
      path: '/test/all',
      parameters: { query: 'parameters' },
    })) as unknown as EchoResponse;

    expect(req.path).toEqual('/1/test/all');
    expect(req.method).toEqual('DELETE');
    expect(req.data).toEqual(undefined);
    expect(req.searchParams).toEqual({ query: 'parameters' });
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

describe('get', () => {
  test('allow get method for a custom path with minimal parameters', async () => {
    const req = (await client.get({
      path: '/test/minimal',
    })) as unknown as EchoResponse;

    expect(req.path).toEqual('/1/test/minimal');
    expect(req.method).toEqual('GET');
    expect(req.data).toEqual(undefined);
    expect(req.searchParams).toEqual(undefined);
  });

  test('allow get method for a custom path with all parameters', async () => {
    const req = (await client.get({
      path: '/test/all',
      parameters: { query: 'parameters' },
    })) as unknown as EchoResponse;

    expect(req.path).toEqual('/1/test/all');
    expect(req.method).toEqual('GET');
    expect(req.data).toEqual(undefined);
    expect(req.searchParams).toEqual({ query: 'parameters' });
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

describe('post', () => {
  test('allow post method for a custom path with minimal parameters', async () => {
    const req = (await client.post({
      path: '/test/minimal',
    })) as unknown as EchoResponse;

    expect(req.path).toEqual('/1/test/minimal');
    expect(req.method).toEqual('POST');
    expect(req.data).toEqual(undefined);
    expect(req.searchParams).toEqual(undefined);
  });

  test('allow post method for a custom path with all parameters', async () => {
    const req = (await client.post({
      path: '/test/all',
      parameters: { query: 'parameters' },
      body: { body: 'parameters' },
    })) as unknown as EchoResponse;

    expect(req.path).toEqual('/1/test/all');
    expect(req.method).toEqual('POST');
    expect(req.data).toEqual({ body: 'parameters' });
    expect(req.searchParams).toEqual({ query: 'parameters' });
  });
});

describe('put', () => {
  test('allow put method for a custom path with minimal parameters', async () => {
    const req = (await client.put({
      path: '/test/minimal',
    })) as unknown as EchoResponse;

    expect(req.path).toEqual('/1/test/minimal');
    expect(req.method).toEqual('PUT');
    expect(req.data).toEqual(undefined);
    expect(req.searchParams).toEqual(undefined);
  });

  test('allow put method for a custom path with all parameters', async () => {
    const req = (await client.put({
      path: '/test/all',
      parameters: { query: 'parameters' },
      body: { body: 'parameters' },
    })) as unknown as EchoResponse;

    expect(req.path).toEqual('/1/test/all');
    expect(req.method).toEqual('PUT');
    expect(req.data).toEqual({ body: 'parameters' });
    expect(req.searchParams).toEqual({ query: 'parameters' });
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
