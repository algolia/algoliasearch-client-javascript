// @ts-nocheck
import { SearchApi, EchoRequester } from '@algolia/client-search';

describe('Common Test Suite', () => {
  const client = new SearchApi(
    process.env.ALGOLIA_APPLICATION_ID,
    process.env.ALGOLIA_SEARCH_KEY,
    { requester: new EchoRequester() }
  );

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

  test('getRule', async () => {
    const req = await client.getRule('indexName', 'id1');
    expect(req).toMatchObject({
      path: '/1/indexes/indexName/rules/id1',
      method: 'GET',
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
