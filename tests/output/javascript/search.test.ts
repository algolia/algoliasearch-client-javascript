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
      data: {
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
        ForwardToReplicas: true,
        ReplaceExistingSynonyms: false,
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

  test('clearAllSynonyms', async () => {
    const req = await client.clearAllSynonyms('indexName');
    expect(req).toMatchObject({
      path: '/1/indexes/indexName/synonyms/clear',
      method: 'POST',
    });
  });

  test('deleteSynonym', async () => {
    const req = await client.deleteSynonym('indexName', 'id1');
    expect(req).toMatchObject({
      path: '/1/indexes/indexName/synonyms/id1',
      method: 'DELETE',
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
        synonymHit: {
          objectID: 'id1',
          type: 'synonym',
          synonyms: ['car', 'vehicule', 'auto'],
        },
        ForwardToReplicas: true,
      },
    });
  });
});
