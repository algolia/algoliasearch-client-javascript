import { SearchApi, EchoRequester } from '@algolia/client-search';

const appId = process.env.ALGOLIA_APPLICATION_ID || 'test_app_id';
const apiKey = process.env.ALGOLIA_SEARCH_KEY || 'test_api_key';

const client = new SearchApi(appId, apiKey, { requester: new EchoRequester() });

describe('addApiKey', () => {
  test('addApiKey', async () => {
    const req = await client.addApiKey({
      acl: ['search', 'addObject'],
      description: 'my new api key',
      validity: 300,
      maxQueriesPerIPPerHour: 100,
      maxHitsPerQuery: 20,
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

describe('addOrUpdateObject', () => {
  test('addOrUpdateObject', async () => {
    const req = await client.addOrUpdateObject({
      indexName: 'indexName',
      objectID: 'uniqueID',
      body: { key: 'value' },
    });

    expect((req as any).path).toEqual('/1/indexes/indexName/uniqueID');
    expect((req as any).method).toEqual('PUT');
    expect((req as any).data).toEqual({ key: 'value' });
    expect((req as any).searchParams).toEqual(undefined);
  });
});

describe('appendSource', () => {
  test('appendSource', async () => {
    const req = await client.appendSource({
      source: 'theSource',
      description: 'theDescription',
    });

    expect((req as any).path).toEqual('/1/security/sources/append');
    expect((req as any).method).toEqual('POST');
    expect((req as any).data).toEqual({
      source: 'theSource',
      description: 'theDescription',
    });
    expect((req as any).searchParams).toEqual(undefined);
  });
});

describe('assignUserId', () => {
  test('assignUserId', async () => {
    const req = await client.assignUserId({
      xAlgoliaUserID: 'userID',
      assignUserIdObject: { cluster: 'theCluster' },
    });

    expect((req as any).path).toEqual('/1/clusters/mapping');
    expect((req as any).method).toEqual('POST');
    expect((req as any).data).toEqual({ cluster: 'theCluster' });
    expect((req as any).searchParams).toEqual({
      'X-Algolia-User-ID': 'userID',
    });
  });
});

describe('batch', () => {
  test('batch', async () => {
    const req = await client.batch({
      indexName: 'theIndexName',
      batchWriteObject: {
        requests: [
          {
            action: 'delete',
            body: { key: 'value' },
            indexName: 'otherIndexName',
          },
        ],
      },
    });

    expect((req as any).path).toEqual('/1/indexes/theIndexName/batch');
    expect((req as any).method).toEqual('POST');
    expect((req as any).data).toEqual({
      requests: [
        {
          action: 'delete',
          body: { key: 'value' },
          indexName: 'otherIndexName',
        },
      ],
    });
    expect((req as any).searchParams).toEqual(undefined);
  });
});

describe('batchAssignUserIds', () => {
  test('batchAssignUserIds', async () => {
    const req = await client.batchAssignUserIds({
      xAlgoliaUserID: 'userID',
      batchAssignUserIdsObject: {
        cluster: 'theCluster',
        users: ['user1', 'user2'],
      },
    });

    expect((req as any).path).toEqual('/1/clusters/mapping/batch');
    expect((req as any).method).toEqual('POST');
    expect((req as any).data).toEqual({
      cluster: 'theCluster',
      users: ['user1', 'user2'],
    });
    expect((req as any).searchParams).toEqual({
      'X-Algolia-User-ID': 'userID',
    });
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
    const req = await client.browse({
      indexName: 'indexName',
    });

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
    const req = await client.clearAllSynonyms({
      indexName: 'indexName',
    });

    expect((req as any).path).toEqual('/1/indexes/indexName/synonyms/clear');
    expect((req as any).method).toEqual('POST');
    expect((req as any).data).toEqual(undefined);
    expect((req as any).searchParams).toEqual(undefined);
  });
});

describe('clearObjects', () => {
  test('clearObjects', async () => {
    const req = await client.clearObjects({
      indexName: 'theIndexName',
    });

    expect((req as any).path).toEqual('/1/indexes/theIndexName/clear');
    expect((req as any).method).toEqual('POST');
    expect((req as any).data).toEqual(undefined);
    expect((req as any).searchParams).toEqual(undefined);
  });
});

describe('clearRules', () => {
  test('clearRules', async () => {
    const req = await client.clearRules({
      indexName: 'indexName',
    });

    expect((req as any).path).toEqual('/1/indexes/indexName/rules/clear');
    expect((req as any).method).toEqual('POST');
    expect((req as any).data).toEqual(undefined);
    expect((req as any).searchParams).toEqual(undefined);
  });
});

describe('deleteApiKey', () => {
  test('deleteApiKey', async () => {
    const req = await client.deleteApiKey({
      key: 'myTestApiKey',
    });

    expect((req as any).path).toEqual('/1/keys/myTestApiKey');
    expect((req as any).method).toEqual('DELETE');
    expect((req as any).data).toEqual(undefined);
    expect((req as any).searchParams).toEqual(undefined);
  });
});

describe('deleteBy', () => {
  test('deleteBy', async () => {
    const req = await client.deleteBy({
      indexName: 'theIndexName',
      searchParams: { query: 'testQuery' },
    });

    expect((req as any).path).toEqual('/1/indexes/theIndexName/deleteByQuery');
    expect((req as any).method).toEqual('POST');
    expect((req as any).data).toEqual({ query: 'testQuery' });
    expect((req as any).searchParams).toEqual(undefined);
  });
});

describe('deleteIndex', () => {
  test('deleteIndex', async () => {
    const req = await client.deleteIndex({
      indexName: 'theIndexName',
    });

    expect((req as any).path).toEqual('/1/indexes/theIndexName');
    expect((req as any).method).toEqual('DELETE');
    expect((req as any).data).toEqual(undefined);
    expect((req as any).searchParams).toEqual(undefined);
  });
});

describe('deleteObject', () => {
  test('deleteObject', async () => {
    const req = await client.deleteObject({
      indexName: 'theIndexName',
      objectID: 'uniqueID',
    });

    expect((req as any).path).toEqual('/1/indexes/theIndexName/uniqueID');
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

describe('deleteSource', () => {
  test('deleteSource', async () => {
    const req = await client.deleteSource({
      source: 'theSource',
    });

    expect((req as any).path).toEqual('/1/security/sources/theSource');
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
    const req = await client.getApiKey({
      key: 'myTestApiKey',
    });

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

describe('getLogs', () => {
  test('getLogs', async () => {
    const req = await client.getLogs({
      offset: 5,
      length: 10,
      indexName: 'theIndexName',
      type: 'all',
    });

    expect((req as any).path).toEqual('/1/logs');
    expect((req as any).method).toEqual('GET');
    expect((req as any).data).toEqual(undefined);
    expect((req as any).searchParams).toEqual({
      offset: '5',
      length: '10',
      indexName: 'theIndexName',
      type: 'all',
    });
  });
});

describe('getObject', () => {
  test('getObject', async () => {
    const req = await client.getObject({
      indexName: 'theIndexName',
      objectID: 'uniqueID',
      attributesToRetrieve: ['attr1', 'attr2'],
    });

    expect((req as any).path).toEqual('/1/indexes/theIndexName/uniqueID');
    expect((req as any).method).toEqual('GET');
    expect((req as any).data).toEqual(undefined);
    expect((req as any).searchParams).toEqual({
      attributesToRetrieve: 'attr1,attr2',
    });
  });
});

describe('getObjects', () => {
  test('getObjects', async () => {
    const req = await client.getObjects({
      requests: [
        {
          attributesToRetrieve: ['attr1', 'attr2'],
          objectID: 'uniqueID',
          indexName: 'theIndexName',
        },
      ],
    });

    expect((req as any).path).toEqual('/1/indexes/*/objects');
    expect((req as any).method).toEqual('POST');
    expect((req as any).data).toEqual({
      requests: [
        {
          attributesToRetrieve: ['attr1', 'attr2'],
          objectID: 'uniqueID',
          indexName: 'theIndexName',
        },
      ],
    });
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

describe('getSettings', () => {
  test('getSettings', async () => {
    const req = await client.getSettings({
      indexName: 'theIndexName',
    });

    expect((req as any).path).toEqual('/1/indexes/theIndexName/settings');
    expect((req as any).method).toEqual('GET');
    expect((req as any).data).toEqual(undefined);
    expect((req as any).searchParams).toEqual(undefined);
  });
});

describe('getSources', () => {
  test('getSources', async () => {
    const req = await client.getSources();

    expect((req as any).path).toEqual('/1/security/sources');
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

describe('getTask', () => {
  test('getTask', async () => {
    const req = await client.getTask({
      indexName: 'theIndexName',
      taskID: 123,
    });

    expect((req as any).path).toEqual('/1/indexes/theIndexName/task/123');
    expect((req as any).method).toEqual('GET');
    expect((req as any).data).toEqual(undefined);
    expect((req as any).searchParams).toEqual(undefined);
  });
});

describe('getTopUserIds', () => {
  test('getTopUserIds', async () => {
    const req = await client.getTopUserIds();

    expect((req as any).path).toEqual('/1/clusters/mapping/top');
    expect((req as any).method).toEqual('GET');
    expect((req as any).data).toEqual(undefined);
    expect((req as any).searchParams).toEqual(undefined);
  });
});

describe('getUserId', () => {
  test('getUserId', async () => {
    const req = await client.getUserId({
      userID: 'uniqueID',
    });

    expect((req as any).path).toEqual('/1/clusters/mapping/uniqueID');
    expect((req as any).method).toEqual('GET');
    expect((req as any).data).toEqual(undefined);
    expect((req as any).searchParams).toEqual(undefined);
  });
});

describe('hasPendingMappings', () => {
  test('hasPendingMappings', async () => {
    const req = await client.hasPendingMappings({
      getClusters: true,
    });

    expect((req as any).path).toEqual('/1/clusters/mapping/pending');
    expect((req as any).method).toEqual('GET');
    expect((req as any).data).toEqual(undefined);
    expect((req as any).searchParams).toEqual({ getClusters: 'true' });
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

describe('listClusters', () => {
  test('listClusters', async () => {
    const req = await client.listClusters();

    expect((req as any).path).toEqual('/1/clusters');
    expect((req as any).method).toEqual('GET');
    expect((req as any).data).toEqual(undefined);
    expect((req as any).searchParams).toEqual(undefined);
  });
});

describe('listIndices', () => {
  test('listIndices', async () => {
    const req = await client.listIndices({
      page: 8,
    });

    expect((req as any).path).toEqual('/1/indexes');
    expect((req as any).method).toEqual('GET');
    expect((req as any).data).toEqual(undefined);
    expect((req as any).searchParams).toEqual({ page: '8' });
  });
});

describe('listUserIds', () => {
  test('listUserIds', async () => {
    const req = await client.listUserIds({
      page: 8,
      hitsPerPage: 100,
    });

    expect((req as any).path).toEqual('/1/clusters/mapping');
    expect((req as any).method).toEqual('GET');
    expect((req as any).data).toEqual(undefined);
    expect((req as any).searchParams).toEqual({
      page: '8',
      hitsPerPage: '100',
    });
  });
});

describe('multipleBatch', () => {
  test('multipleBatch', async () => {
    const req = await client.multipleBatch({
      requests: [
        {
          action: 'addObject',
          body: { key: 'value' },
          indexName: 'theIndexName',
        },
      ],
    });

    expect((req as any).path).toEqual('/1/indexes/*/batch');
    expect((req as any).method).toEqual('POST');
    expect((req as any).data).toEqual({
      requests: [
        {
          action: 'addObject',
          body: { key: 'value' },
          indexName: 'theIndexName',
        },
      ],
    });
    expect((req as any).searchParams).toEqual(undefined);
  });
});

describe('multipleQueries', () => {
  test('multipleQueries', async () => {
    const req = await client.multipleQueries({
      requests: [
        {
          indexName: 'theIndexName',
          query: 'test',
          type: 'facet',
          facet: 'theFacet',
          params: 'testParam',
        },
      ],
      strategy: 'stopIfEnoughMatches',
    });

    expect((req as any).path).toEqual('/1/indexes/*/queries');
    expect((req as any).method).toEqual('POST');
    expect((req as any).data).toEqual({
      requests: [
        {
          indexName: 'theIndexName',
          query: 'test',
          type: 'facet',
          facet: 'theFacet',
          params: 'testParam',
        },
      ],
      strategy: 'stopIfEnoughMatches',
    });
    expect((req as any).searchParams).toEqual(undefined);
  });
});

describe('operationIndex', () => {
  test('operationIndex', async () => {
    const req = await client.operationIndex({
      indexName: 'theIndexName',
      operationIndexObject: {
        operation: 'copy',
        destination: 'dest',
        scope: ['rules', 'settings'],
      },
    });

    expect((req as any).path).toEqual('/1/indexes/theIndexName/operation');
    expect((req as any).method).toEqual('POST');
    expect((req as any).data).toEqual({
      operation: 'copy',
      destination: 'dest',
      scope: ['rules', 'settings'],
    });
    expect((req as any).searchParams).toEqual(undefined);
  });
});

describe('partialUpdateObject', () => {
  test('partialUpdateObject', async () => {
    const req = await client.partialUpdateObject({
      indexName: 'theIndexName',
      objectID: 'uniqueID',
      stringBuildInOperation: [
        { id1: 'test', id2: { _operation: 'AddUnique', value: 'test2' } },
      ],
      createIfNotExists: true,
    });

    expect((req as any).path).toEqual(
      '/1/indexes/theIndexName/uniqueID/partial'
    );
    expect((req as any).method).toEqual('POST');
    expect((req as any).data).toEqual([
      { id1: 'test', id2: { _operation: 'AddUnique', value: 'test2' } },
    ]);
    expect((req as any).searchParams).toEqual({ createIfNotExists: 'true' });
  });
});

describe('removeUserId', () => {
  test('removeUserId', async () => {
    const req = await client.removeUserId({
      userID: 'uniqueID',
    });

    expect((req as any).path).toEqual('/1/clusters/mapping/uniqueID');
    expect((req as any).method).toEqual('DELETE');
    expect((req as any).data).toEqual(undefined);
    expect((req as any).searchParams).toEqual(undefined);
  });
});

describe('replaceSources', () => {
  test('replaceSources', async () => {
    const req = await client.replaceSources({
      source: [{ source: 'theSource', description: 'theDescription' }],
    });

    expect((req as any).path).toEqual('/1/security/sources');
    expect((req as any).method).toEqual('PUT');
    expect((req as any).data).toEqual([
      { source: 'theSource', description: 'theDescription' },
    ]);
    expect((req as any).searchParams).toEqual(undefined);
  });
});

describe('restoreApiKey', () => {
  test('restoreApiKey', async () => {
    const req = await client.restoreApiKey({
      key: 'myApiKey',
    });

    expect((req as any).path).toEqual('/1/keys/myApiKey/restore');
    expect((req as any).method).toEqual('POST');
    expect((req as any).data).toEqual(undefined);
    expect((req as any).searchParams).toEqual(undefined);
  });
});

describe('saveObject', () => {
  test('saveObject', async () => {
    const req = await client.saveObject({
      indexName: 'theIndexName',
      body: { objectID: 'id', test: 'val' },
    });

    expect((req as any).path).toEqual('/1/indexes/theIndexName');
    expect((req as any).method).toEqual('POST');
    expect((req as any).data).toEqual({ objectID: 'id', test: 'val' });
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

describe('searchUserIds', () => {
  test('searchUserIds', async () => {
    const req = await client.searchUserIds({
      query: 'test',
      clusterName: 'theClusterName',
      page: 5,
      hitsPerPage: 10,
    });

    expect((req as any).path).toEqual('/1/clusters/mapping/search');
    expect((req as any).method).toEqual('POST');
    expect((req as any).data).toEqual({
      query: 'test',
      clusterName: 'theClusterName',
      page: 5,
      hitsPerPage: 10,
    });
    expect((req as any).searchParams).toEqual(undefined);
  });
});

describe('setDictionarySettings', () => {
  test('get setDictionarySettings results with minimal parameters', async () => {
    const req = await client.setDictionarySettings({
      disableStandardEntries: { plurals: { fr: false, en: false, ru: true } },
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
      disableStandardEntries: {
        plurals: { fr: false, en: false, ru: true },
        stopwords: { fr: false },
        compounds: { ru: true },
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

describe('setSettings', () => {
  test('setSettings', async () => {
    const req = await client.setSettings({
      indexName: 'theIndexName',
      indexSettings: { paginationLimitedTo: 10 },
      forwardToReplicas: true,
    });

    expect((req as any).path).toEqual('/1/indexes/theIndexName/settings');
    expect((req as any).method).toEqual('PUT');
    expect((req as any).data).toEqual({ paginationLimitedTo: 10 });
    expect((req as any).searchParams).toEqual({ forwardToReplicas: 'true' });
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
