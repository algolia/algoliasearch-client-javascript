import { SearchApi, EchoRequester } from '@algolia/client-search';

const appId = process.env.ALGOLIA_APPLICATION_ID || 'test_app_id';
const apiKey = process.env.ALGOLIA_SEARCH_KEY || 'test_api_key';

const client = new SearchApi(appId, apiKey, { requester: new EchoRequester() });

describe('addApiKey', () => {
  test('addApiKey', async () => {
    const req = await client.addApiKey({
      apiKey: {
        acl: ['search', 'addObject'],
        description: 'my new api key',
        validity: 300,
        maxQueriesPerIPPerHour: 100,
        maxHitsPerQuery: 20,
      },
    });

    expect((req as any).path).toEqual('/1/keys');
    expect((req as any).method).toEqual('POST');
    expect((req as any).data).toEqual({
      acl: ['search', 'addObject'],
      description: 'my new api key',
      validity: 300,
      maxQueriesPerIPPerHour: 100,
      maxHitsPerQuery: 20,
    });
    expect((req as any).searchParams).toEqual(undefined);
  });
});

describe('batchDictionaryEntries', () => {
  test('get batchDictionaryEntries results with minimal parameters', async () => {
    const req = await client.batchDictionaryEntries({
      dictionaryName: 'compounds',
      batchDictionaryEntries: {
        requests: [
          { action: 'addEntry', body: { objectID: '1', language: 'en' } },
          { action: 'deleteEntry', body: { objectID: '2', language: 'fr' } },
        ],
      },
    });

    expect((req as any).path).toEqual('/1/dictionaries/compounds/batch');
    expect((req as any).method).toEqual('POST');
    expect((req as any).data).toEqual({
      requests: [
        { action: 'addEntry', body: { objectID: '1', language: 'en' } },
        { action: 'deleteEntry', body: { objectID: '2', language: 'fr' } },
      ],
    });
    expect((req as any).searchParams).toEqual(undefined);
  });

  test('get batchDictionaryEntries results with all parameters', async () => {
    const req = await client.batchDictionaryEntries({
      dictionaryName: 'compounds',
      batchDictionaryEntries: {
        clearExistingDictionaryEntries: false,
        requests: [
          {
            action: 'addEntry',
            body: {
              objectID: '1',
              language: 'en',
              word: 'yo',
              words: ['yo', 'algolia'],
              decomposition: ['yo', 'algolia'],
              state: 'enabled',
            },
          },
          {
            action: 'deleteEntry',
            body: {
              objectID: '2',
              language: 'fr',
              word: 'salut',
              words: ['salut', 'algolia'],
              decomposition: ['salut', 'algolia'],
              state: 'enabled',
            },
          },
        ],
      },
    });

    expect((req as any).path).toEqual('/1/dictionaries/compounds/batch');
    expect((req as any).method).toEqual('POST');
    expect((req as any).data).toEqual({
      clearExistingDictionaryEntries: false,
      requests: [
        {
          action: 'addEntry',
          body: {
            objectID: '1',
            language: 'en',
            word: 'yo',
            words: ['yo', 'algolia'],
            decomposition: ['yo', 'algolia'],
            state: 'enabled',
          },
        },
        {
          action: 'deleteEntry',
          body: {
            objectID: '2',
            language: 'fr',
            word: 'salut',
            words: ['salut', 'algolia'],
            decomposition: ['salut', 'algolia'],
            state: 'enabled',
          },
        },
      ],
    });
    expect((req as any).searchParams).toEqual(undefined);
  });
});

describe('batchRules', () => {
  test('batchRules', async () => {
    const req = await client.batchRules({
      indexName: 'indexName',
      rule: [
        {
          objectID: 'a-rule-id',
          conditions: [{ pattern: 'smartphone', anchoring: 'contains' }],
          consequence: { params: { filters: 'category:smartphone' } },
        },
        {
          objectID: 'a-second-rule-id',
          conditions: [{ pattern: 'apple', anchoring: 'contains' }],
          consequence: { params: { filters: 'brand:apple' } },
        },
      ],
      forwardToReplicas: true,
      clearExistingRules: true,
    });

    expect((req as any).path).toEqual('/1/indexes/indexName/rules/batch');
    expect((req as any).method).toEqual('POST');
    expect((req as any).data).toEqual([
      {
        objectID: 'a-rule-id',
        conditions: [{ pattern: 'smartphone', anchoring: 'contains' }],
        consequence: { params: { filters: 'category:smartphone' } },
      },
      {
        objectID: 'a-second-rule-id',
        conditions: [{ pattern: 'apple', anchoring: 'contains' }],
        consequence: { params: { filters: 'brand:apple' } },
      },
    ]);
    expect((req as any).searchParams).toEqual({
      forwardToReplicas: 'true',
      clearExistingRules: 'true',
    });
  });
});

describe('browse', () => {
  test('get browse results with minimal parameters', async () => {
    const req = await client.browse({ indexName: 'indexName' });

    expect((req as any).path).toEqual('/1/indexes/indexName/browse');
    expect((req as any).method).toEqual('POST');
    expect((req as any).data).toEqual(undefined);
    expect((req as any).searchParams).toEqual(undefined);
  });

  test('get browse results with all parameters', async () => {
    const req = await client.browse({
      indexName: 'indexName',
      browseRequest: {
        params: "query=foo&facetFilters=['bar']",
        cursor: 'cts',
      },
    });

    expect((req as any).path).toEqual('/1/indexes/indexName/browse');
    expect((req as any).method).toEqual('POST');
    expect((req as any).data).toEqual({
      params: "query=foo&facetFilters=['bar']",
      cursor: 'cts',
    });
    expect((req as any).searchParams).toEqual(undefined);
  });
});

describe('clearAllSynonyms', () => {
  test('clearAllSynonyms', async () => {
    const req = await client.clearAllSynonyms({ indexName: 'indexName' });

    expect((req as any).path).toEqual('/1/indexes/indexName/synonyms/clear');
    expect((req as any).method).toEqual('POST');
    expect((req as any).data).toEqual(undefined);
    expect((req as any).searchParams).toEqual(undefined);
  });
});

describe('clearRules', () => {
  test('clearRules', async () => {
    const req = await client.clearRules({ indexName: 'indexName' });

    expect((req as any).path).toEqual('/1/indexes/indexName/rules/clear');
    expect((req as any).method).toEqual('POST');
    expect((req as any).data).toEqual(undefined);
    expect((req as any).searchParams).toEqual(undefined);
  });
});

describe('deleteApiKey', () => {
  test('deleteApiKey', async () => {
    const req = await client.deleteApiKey({ key: 'myTestApiKey' });

    expect((req as any).path).toEqual('/1/keys/myTestApiKey');
    expect((req as any).method).toEqual('DELETE');
    expect((req as any).data).toEqual(undefined);
    expect((req as any).searchParams).toEqual(undefined);
  });
});

describe('deleteRule', () => {
  test('deleteRule', async () => {
    const req = await client.deleteRule({
      indexName: 'indexName',
      objectID: 'id1',
    });

    expect((req as any).path).toEqual('/1/indexes/indexName/rules/id1');
    expect((req as any).method).toEqual('DELETE');
    expect((req as any).data).toEqual(undefined);
    expect((req as any).searchParams).toEqual(undefined);
  });
});

describe('deleteSynonym', () => {
  test('deleteSynonym', async () => {
    const req = await client.deleteSynonym({
      indexName: 'indexName',
      objectID: 'id1',
    });

    expect((req as any).path).toEqual('/1/indexes/indexName/synonyms/id1');
    expect((req as any).method).toEqual('DELETE');
    expect((req as any).data).toEqual(undefined);
    expect((req as any).searchParams).toEqual(undefined);
  });
});

describe('getApiKey', () => {
  test('getApiKey', async () => {
    const req = await client.getApiKey({ key: 'myTestApiKey' });

    expect((req as any).path).toEqual('/1/keys/myTestApiKey');
    expect((req as any).method).toEqual('GET');
    expect((req as any).data).toEqual(undefined);
    expect((req as any).searchParams).toEqual(undefined);
  });
});

describe('getDictionaryLanguages', () => {
  test('get getDictionaryLanguages', async () => {
    const req = await client.getDictionaryLanguages();

    expect((req as any).path).toEqual('/1/dictionaries/*/languages');
    expect((req as any).method).toEqual('GET');
    expect((req as any).data).toEqual(undefined);
    expect((req as any).searchParams).toEqual(undefined);
  });
});

describe('getDictionarySettings', () => {
  test('get getDictionarySettings results', async () => {
    const req = await client.getDictionarySettings();

    expect((req as any).path).toEqual('/1/dictionaries/*/settings');
    expect((req as any).method).toEqual('GET');
    expect((req as any).data).toEqual(undefined);
    expect((req as any).searchParams).toEqual(undefined);
  });
});

describe('getRule', () => {
  test('getRule', async () => {
    const req = await client.getRule({
      indexName: 'indexName',
      objectID: 'id1',
    });

    expect((req as any).path).toEqual('/1/indexes/indexName/rules/id1');
    expect((req as any).method).toEqual('GET');
    expect((req as any).data).toEqual(undefined);
    expect((req as any).searchParams).toEqual(undefined);
  });
});

describe('getSynonym', () => {
  test('getSynonym', async () => {
    const req = await client.getSynonym({
      indexName: 'indexName',
      objectID: 'id1',
    });

    expect((req as any).path).toEqual('/1/indexes/indexName/synonyms/id1');
    expect((req as any).method).toEqual('GET');
    expect((req as any).data).toEqual(undefined);
    expect((req as any).searchParams).toEqual(undefined);
  });
});

describe('listApiKeys', () => {
  test('listApiKeys', async () => {
    const req = await client.listApiKeys();

    expect((req as any).path).toEqual('/1/keys');
    expect((req as any).method).toEqual('GET');
    expect((req as any).data).toEqual(undefined);
    expect((req as any).searchParams).toEqual(undefined);
  });
});

describe('restoreApiKey', () => {
  test('restoreApiKey', async () => {
    const req = await client.restoreApiKey({ key: 'myApiKey' });

    expect((req as any).path).toEqual('/1/keys/myApiKey/restore');
    expect((req as any).method).toEqual('POST');
    expect((req as any).data).toEqual(undefined);
    expect((req as any).searchParams).toEqual(undefined);
  });
});

describe('saveRule', () => {
  test('saveRule', async () => {
    const req = await client.saveRule({
      indexName: 'indexName',
      objectID: 'id1',
      rule: {
        objectID: 'id1',
        conditions: [{ pattern: 'apple', anchoring: 'contains' }],
        consequence: { params: { filters: 'brand:apple' } },
      },
      forwardToReplicas: true,
    });

    expect((req as any).path).toEqual('/1/indexes/indexName/rules/id1');
    expect((req as any).method).toEqual('PUT');
    expect((req as any).data).toEqual({
      objectID: 'id1',
      conditions: [{ pattern: 'apple', anchoring: 'contains' }],
      consequence: { params: { filters: 'brand:apple' } },
    });
    expect((req as any).searchParams).toEqual({ forwardToReplicas: 'true' });
  });
});

describe('saveSynonym', () => {
  test('saveSynonym', async () => {
    const req = await client.saveSynonym({
      indexName: 'indexName',
      objectID: 'id1',
      synonymHit: {
        objectID: 'id1',
        type: 'synonym',
        synonyms: ['car', 'vehicule', 'auto'],
      },
      forwardToReplicas: true,
    });

    expect((req as any).path).toEqual('/1/indexes/indexName/synonyms/id1');
    expect((req as any).method).toEqual('PUT');
    expect((req as any).data).toEqual({
      objectID: 'id1',
      type: 'synonym',
      synonyms: ['car', 'vehicule', 'auto'],
    });
    expect((req as any).searchParams).toEqual({ forwardToReplicas: 'true' });
  });
});

describe('saveSynonyms', () => {
  test('saveSynonyms', async () => {
    const req = await client.saveSynonyms({
      indexName: 'indexName',
      synonymHit: [
        {
          objectID: 'id1',
          type: 'synonym',
          synonyms: ['car', 'vehicule', 'auto'],
        },
        {
          objectID: 'id2',
          type: 'onewaysynonym',
          input: 'iphone',
          synonyms: ['ephone', 'aphone', 'yphone'],
        },
      ],
      forwardToReplicas: true,
      replaceExistingSynonyms: false,
    });

    expect((req as any).path).toEqual('/1/indexes/indexName/synonyms/batch');
    expect((req as any).method).toEqual('POST');
    expect((req as any).data).toEqual([
      {
        objectID: 'id1',
        type: 'synonym',
        synonyms: ['car', 'vehicule', 'auto'],
      },
      {
        objectID: 'id2',
        type: 'onewaysynonym',
        input: 'iphone',
        synonyms: ['ephone', 'aphone', 'yphone'],
      },
    ]);
    expect((req as any).searchParams).toEqual({
      forwardToReplicas: 'true',
      replaceExistingSynonyms: 'false',
    });
  });
});

describe('search', () => {
  test('search', async () => {
    const req = await client.search({
      indexName: 'indexName',
      searchParams: { query: 'myQuery' },
    });

    expect((req as any).path).toEqual('/1/indexes/indexName/query');
    expect((req as any).method).toEqual('POST');
    expect((req as any).data).toEqual({ query: 'myQuery' });
    expect((req as any).searchParams).toEqual(undefined);
  });
});

describe('searchDictionaryEntries', () => {
  test('get searchDictionaryEntries results with minimal parameters', async () => {
    const req = await client.searchDictionaryEntries({
      dictionaryName: 'compounds',
      searchDictionaryEntries: { query: 'foo' },
    });

    expect((req as any).path).toEqual('/1/dictionaries/compounds/search');
    expect((req as any).method).toEqual('POST');
    expect((req as any).data).toEqual({ query: 'foo' });
    expect((req as any).searchParams).toEqual(undefined);
  });

  test('get searchDictionaryEntries results with all parameters', async () => {
    const req = await client.searchDictionaryEntries({
      dictionaryName: 'compounds',
      searchDictionaryEntries: {
        query: 'foo',
        page: 4,
        hitsPerPage: 2,
        language: 'fr',
      },
    });

    expect((req as any).path).toEqual('/1/dictionaries/compounds/search');
    expect((req as any).method).toEqual('POST');
    expect((req as any).data).toEqual({
      query: 'foo',
      page: 4,
      hitsPerPage: 2,
      language: 'fr',
    });
    expect((req as any).searchParams).toEqual(undefined);
  });
});

describe('searchForFacetValues', () => {
  test('get searchForFacetValues results with minimal parameters', async () => {
    const req = await client.searchForFacetValues({
      indexName: 'indexName',
      facetName: 'facetName',
    });

    expect((req as any).path).toEqual(
      '/1/indexes/indexName/facets/facetName/query'
    );
    expect((req as any).method).toEqual('POST');
    expect((req as any).data).toEqual(undefined);
    expect((req as any).searchParams).toEqual(undefined);
  });

  test('get searchForFacetValues results with all parameters', async () => {
    const req = await client.searchForFacetValues({
      indexName: 'indexName',
      facetName: 'facetName',
      searchForFacetValuesRequest: {
        params: "query=foo&facetFilters=['bar']",
        facetQuery: 'foo',
        maxFacetHits: 42,
      },
    });

    expect((req as any).path).toEqual(
      '/1/indexes/indexName/facets/facetName/query'
    );
    expect((req as any).method).toEqual('POST');
    expect((req as any).data).toEqual({
      params: "query=foo&facetFilters=['bar']",
      facetQuery: 'foo',
      maxFacetHits: 42,
    });
    expect((req as any).searchParams).toEqual(undefined);
  });
});

describe('searchRules', () => {
  test('searchRules', async () => {
    const req = await client.searchRules({
      indexName: 'indexName',
      searchRulesParams: { query: 'something' },
    });

    expect((req as any).path).toEqual('/1/indexes/indexName/rules/search');
    expect((req as any).method).toEqual('POST');
    expect((req as any).data).toEqual({ query: 'something' });
    expect((req as any).searchParams).toEqual(undefined);
  });
});

describe('searchSynonyms', () => {
  test('searchSynonyms', async () => {
    const req = await client.searchSynonyms({
      indexName: 'indexName',
      query: 'queryString',
      type: 'onewaysynonym',
    });

    expect((req as any).path).toEqual('/1/indexes/indexName/synonyms/search');
    expect((req as any).method).toEqual('POST');
    expect((req as any).data).toEqual(undefined);
    expect((req as any).searchParams).toEqual({
      query: 'queryString',
      type: 'onewaysynonym',
    });
  });
});

describe('setDictionarySettings', () => {
  test('get setDictionarySettings results with minimal parameters', async () => {
    const req = await client.setDictionarySettings({
      dictionarySettingsRequest: {
        disableStandardEntries: { plurals: { fr: false, en: false, ru: true } },
      },
    });

    expect((req as any).path).toEqual('/1/dictionaries/*/settings');
    expect((req as any).method).toEqual('PUT');
    expect((req as any).data).toEqual({
      disableStandardEntries: { plurals: { fr: false, en: false, ru: true } },
    });
    expect((req as any).searchParams).toEqual(undefined);
  });

  test('get setDictionarySettings results with all parameters', async () => {
    const req = await client.setDictionarySettings({
      dictionarySettingsRequest: {
        disableStandardEntries: {
          plurals: { fr: false, en: false, ru: true },
          stopwords: { fr: false },
          compounds: { ru: true },
        },
      },
    });

    expect((req as any).path).toEqual('/1/dictionaries/*/settings');
    expect((req as any).method).toEqual('PUT');
    expect((req as any).data).toEqual({
      disableStandardEntries: {
        plurals: { fr: false, en: false, ru: true },
        stopwords: { fr: false },
        compounds: { ru: true },
      },
    });
    expect((req as any).searchParams).toEqual(undefined);
  });
});

describe('updateApiKey', () => {
  test('updateApiKey', async () => {
    const req = await client.updateApiKey({
      key: 'myApiKey',
      apiKey: {
        acl: ['search', 'addObject'],
        validity: 300,
        maxQueriesPerIPPerHour: 100,
        maxHitsPerQuery: 20,
      },
    });

    expect((req as any).path).toEqual('/1/keys/myApiKey');
    expect((req as any).method).toEqual('PUT');
    expect((req as any).data).toEqual({
      acl: ['search', 'addObject'],
      validity: 300,
      maxQueriesPerIPPerHour: 100,
      maxHitsPerQuery: 20,
    });
    expect((req as any).searchParams).toEqual(undefined);
  });
});
