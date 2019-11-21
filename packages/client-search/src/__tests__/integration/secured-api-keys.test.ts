/* eslint sonarjs/cognitive-complexity: 0 */ // --> OFF

import { TestSuite } from '@algolia/client-common/src/__tests__/TestSuite';

const testSuite = new TestSuite('secured_api_keys');

afterAll(() => testSuite.cleanUp());

test(testSuite.testName, async () => {
  const client = testSuite.makeSearchClient();
  const index1 = testSuite.makeIndex();
  const index2 = testSuite.makeIndex();

  await index1.saveObject({ objectID: 'one' }).wait();
  const securedApiKey = await client.generateSecuredApiKey(process.env.ALGOLIA_SEARCH_KEY_1, {
    validUntil: Math.round(new Date().getTime() / 1000) + 60,
    restrictIndices: index1.indexName,
  });

  await expect(
    testSuite
      .algoliasearch(index1.appId, securedApiKey)
      .initIndex(index1.indexName)
      .search('')
  ).resolves.toMatchObject({
    hits: [{ objectID: 'one' }],
    nbHits: 1,
  });

  await expect(
    testSuite
      .algoliasearch(index2.appId, securedApiKey)
      .initIndex(index2.indexName)
      .search('')
  ).rejects.toMatchObject({
    message: 'Index not allowed with this API key',
    name: 'ApiError',
    status: 403,
  });
});
