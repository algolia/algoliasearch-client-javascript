// @ts-nocheck
import { SearchApi, EchoRequester } from '@algolia/client-search';

describe('Common Test Suite', () => {
  const client = new SearchApi(
    process.env.ALGOLIA_APPLICATION_ID,
    process.env.ALGOLIA_SEARCH_KEY,
    { requester: new EchoRequester() }
  );

  test('get getDictionarySettings results', async () => {
    const req = await client.getDictionarySettings();
    expect(req).toMatchObject({
      path: '/1/dictionaries/*/settings',
      method: 'GET',
    });
  });

  test('searchSynonyms', async () => {
    const req = await client.searchSynonyms(
      'indexName',
      'queryString',
      'onewaysynonym'
    );
    expect(req).toMatchObject({
      path: '/1/indexes/indexName/synonyms/search',
      method: 'POST',
    });
  });

  test('saveSynonyms', async () => {
    const req = await client.saveSynonyms(
      'indexName',
      [
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
      true,
      false
    );
    expect(req).toMatchObject({
      path: '/1/indexes/indexName/synonyms/batch',
      method: 'POST',
      data: [
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
    });
  });

  test('deleteRule', async () => {
    const req = await client.deleteRule('indexName', 'id1');
    expect(req).toMatchObject({
      path: '/1/indexes/indexName/rules/id1',
      method: 'DELETE',
    });
  });

  test('get searchForFacetValues results with minimal parameters', async () => {
    const req = await client.searchForFacetValues('indexName', 'facetName');
    expect(req).toMatchObject({
      path: '/1/indexes/indexName/facets/facetName/query',
      method: 'POST',
    });
  });

  test('get searchForFacetValues results with all parameters', async () => {
    const req = await client.searchForFacetValues('indexName', 'facetName', {
      params: "query=foo&facetFilters=['bar']",
      facetQuery: 'foo',
      maxFacetHits: 42,
    });
    expect(req).toMatchObject({
      path: '/1/indexes/indexName/facets/facetName/query',
      method: 'POST',
      data: {
        params: "query=foo&facetFilters=['bar']",
        facetQuery: 'foo',
        maxFacetHits: 42,
      },
    });
  });

  test('getSynonym', async () => {
    const req = await client.getSynonym('indexName', 'id1');
    expect(req).toMatchObject({
      path: '/1/indexes/indexName/synonyms/id1',
      method: 'GET',
    });
  });

  test('search', async () => {
    const req = await client.search('indexName', { query: 'queryString' });
    expect(req).toMatchObject({
      path: '/1/indexes/indexName/query',
      method: 'POST',
      data: { query: 'queryString' },
    });
  });

  test('get setDictionarySettings results with minimal parameters', async () => {
    const req = await client.setDictionarySettings({
      disableStandardEntries: { plurals: { fr: false, en: false, ru: true } },
    });
    expect(req).toMatchObject({
      path: '/1/dictionaries/*/settings',
      method: 'PUT',
      data: {
        disableStandardEntries: { plurals: { fr: false, en: false, ru: true } },
      },
    });
  });

  test('get setDictionarySettings results with all parameters', async () => {
    const req = await client.setDictionarySettings({
      disableStandardEntries: {
        plurals: { fr: false, en: false, ru: true },
        stopwords: { fr: false },
        compounds: { ru: true },
      },
    });
    expect(req).toMatchObject({
      path: '/1/dictionaries/*/settings',
      method: 'PUT',
      data: {
        disableStandardEntries: {
          plurals: { fr: false, en: false, ru: true },
          stopwords: { fr: false },
          compounds: { ru: true },
        },
      },
    });
  });

  test('getRule', async () => {
    const req = await client.getRule('indexName', 'id1');
    expect(req).toMatchObject({
      path: '/1/indexes/indexName/rules/id1',
      method: 'GET',
    });
  });

  test('get searchDictionaryEntries results with minimal parameters', async () => {
    const req = await client.searchDictionaryEntries('dictionaryName', {
      query: 'foo',
    });
    expect(req).toMatchObject({
      path: '/1/dictionaries/dictionaryName/search',
      method: 'POST',
      data: { query: 'foo' },
    });
  });

  test('get searchDictionaryEntries results with all parameters', async () => {
    const req = await client.searchDictionaryEntries('dictionaryName', {
      query: 'foo',
      page: 4,
      hitsPerPage: 2,
      language: 'fr',
    });
    expect(req).toMatchObject({
      path: '/1/dictionaries/dictionaryName/search',
      method: 'POST',
      data: { query: 'foo', page: 4, hitsPerPage: 2, language: 'fr' },
    });
  });

  test('batchRules', async () => {
    const req = await client.batchRules(
      'indexName',
      [
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
      true,
      true
    );
    expect(req).toMatchObject({
      path: '/1/indexes/indexName/rules/batch',
      method: 'POST',
      data: [
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
    });
  });

  test('updateApiKey', async () => {
    const req = await client.updateApiKey('myApiKey', {
      acl: ['search', 'addObject'],
      validity: 300,
      maxQueriesPerIPPerHour: 100,
      maxHitsPerQuery: 20,
    });
    expect(req).toMatchObject({
      path: '/1/keys/myApiKey',
      method: 'PUT',
      data: {
        acl: ['search', 'addObject'],
        validity: 300,
        maxQueriesPerIPPerHour: 100,
        maxHitsPerQuery: 20,
      },
    });
  });

  test('get getDictionaryLanguages', async () => {
    const req = await client.getDictionaryLanguages();
    expect(req).toMatchObject({
      path: '/1/dictionaries/*/languages',
      method: 'GET',
    });
  });

  test('deleteApiKey', async () => {
    const req = await client.deleteApiKey('myTestApiKey');
    expect(req).toMatchObject({
      path: '/1/keys/myTestApiKey',
      method: 'DELETE',
    });
  });

  test('searchRules', async () => {
    const req = await client.searchRules('indexName', { query: 'something' });
    expect(req).toMatchObject({
      path: '/1/indexes/indexName/rules/search',
      method: 'POST',
      data: { query: 'something' },
    });
  });

  test('clearAllSynonyms', async () => {
    const req = await client.clearAllSynonyms('indexName');
    expect(req).toMatchObject({
      path: '/1/indexes/indexName/synonyms/clear',
      method: 'POST',
    });
  });

  test('saveRule', async () => {
    const req = await client.saveRule(
      'indexName',
      'id1',
      {
        objectID: 'id1',
        conditions: [{ pattern: 'apple', anchoring: 'contains' }],
        consequence: { params: { filters: 'brand:apple' } },
      },
      true
    );
    expect(req).toMatchObject({
      path: '/1/indexes/indexName/rules/id1',
      method: 'PUT',
      data: {
        objectID: 'id1',
        conditions: [{ pattern: 'apple', anchoring: 'contains' }],
        consequence: { params: { filters: 'brand:apple' } },
      },
    });
  });

  test('addApiKey', async () => {
    const req = await client.addApiKey({
      acl: ['search', 'addObject'],
      description: 'my new api key',
      validity: 300,
      maxQueriesPerIPPerHour: 100,
      maxHitsPerQuery: 20,
    });
    expect(req).toMatchObject({
      path: '/1/keys',
      method: 'POST',
      data: {
        acl: ['search', 'addObject'],
        description: 'my new api key',
        validity: 300,
        maxQueriesPerIPPerHour: 100,
        maxHitsPerQuery: 20,
      },
    });
  });

  test('restoreApiKey', async () => {
    const req = await client.restoreApiKey('myApiKey');
    expect(req).toMatchObject({
      path: '/1/keys/myApiKey/restore',
      method: 'POST',
    });
  });

  test('getApiKey', async () => {
    const req = await client.getApiKey('myTestApiKey');
    expect(req).toMatchObject({
      path: '/1/keys/myTestApiKey',
      method: 'GET',
    });
  });

  test('get browse results with minimal parameters', async () => {
    const req = await client.browse('indexName');
    expect(req).toMatchObject({
      path: '/1/indexes/indexName/browse',
      method: 'POST',
    });
  });

  test('get browse results with all parameters', async () => {
    const req = await client.browse('indexName', {
      params: "query=foo&facetFilters=['bar']",
      cursor: 'cts',
    });
    expect(req).toMatchObject({
      path: '/1/indexes/indexName/browse',
      method: 'POST',
      data: { params: "query=foo&facetFilters=['bar']", cursor: 'cts' },
    });
  });

  test('deleteSynonym', async () => {
    const req = await client.deleteSynonym('indexName', 'id1');
    expect(req).toMatchObject({
      path: '/1/indexes/indexName/synonyms/id1',
      method: 'DELETE',
    });
  });

  test('clearRules', async () => {
    const req = await client.clearRules('indexName');
    expect(req).toMatchObject({
      path: '/1/indexes/indexName/rules/clear',
      method: 'POST',
    });
  });

  test('get batchDictionaryEntries results with minimal parameters', async () => {
    const req = await client.batchDictionaryEntries('dictionaryName', {
      requests: [
        { action: 'addEntry', body: { objectID: '1', language: 'en' } },
        { action: 'deleteEntry', body: { objectID: '2', language: 'fr' } },
      ],
    });
    expect(req).toMatchObject({
      path: '/1/dictionaries/dictionaryName/batch',
      method: 'POST',
      data: {
        requests: [
          { action: 'addEntry', body: { objectID: '1', language: 'en' } },
          { action: 'deleteEntry', body: { objectID: '2', language: 'fr' } },
        ],
      },
    });
  });

  test('get batchDictionaryEntries results with all parameters', async () => {
    const req = await client.batchDictionaryEntries('dictionaryName', {
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
    expect(req).toMatchObject({
      path: '/1/dictionaries/dictionaryName/batch',
      method: 'POST',
      data: {
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
  });

  test('listApiKeys', async () => {
    const req = await client.listApiKeys();
    expect(req).toMatchObject({
      path: '/1/keys',
      method: 'GET',
    });
  });

  test('saveSynonym', async () => {
    const req = await client.saveSynonym(
      'indexName',
      'id1',
      {
        objectID: 'id1',
        type: 'synonym',
        synonyms: ['car', 'vehicule', 'auto'],
      },
      true
    );
    expect(req).toMatchObject({
      path: '/1/indexes/indexName/synonyms/id1',
      method: 'PUT',
      data: {
        objectID: 'id1',
        type: 'synonym',
        synonyms: ['car', 'vehicule', 'auto'],
      },
    });
  });
});
