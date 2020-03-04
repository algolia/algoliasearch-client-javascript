/* eslint sonarjs/cognitive-complexity: 0 */ // --> OFF

import { TestSuite } from '../../../../client-common/src/__tests__/TestSuite';

const testSuite = new TestSuite('secured_api_keys');

test(testSuite.testName, async () => {
  const client = testSuite.makeSearchClient();
  const index1 = client.initIndex(testSuite.makeIndexName());
  const index2 = client.initIndex(testSuite.makeIndexName());

  await index1.saveObject({ objectID: 'one' }).wait();
  await index2.saveObject({ objectID: 'one' }).wait();

  const securedApiKey = await client.generateSecuredApiKey(process.env.ALGOLIA_SEARCH_KEY_1 || '', {
    validUntil: Math.round(new Date().getTime() / 1000) + 60,
    restrictIndices: index1.indexName,
  });

  await expect(
    testSuite
      .algoliasearch(index1.appId, securedApiKey, {
        hosts: client.transporter.hosts,
      })
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

  expect(client.getSecuredApiKeyRemainingValidity(securedApiKey)).toBeGreaterThan(0);

  const expiredSecuredApiKey = await client.generateSecuredApiKey(
    process.env.ALGOLIA_SEARCH_KEY_1 || '',
    {
      validUntil: Math.round(new Date().getTime() / 1000) - 60,
      restrictIndices: index1.indexName,
    }
  );

  expect(client.getSecuredApiKeyRemainingValidity(expiredSecuredApiKey)).toBeLessThan(0);

  expect(() => client.getSecuredApiKeyRemainingValidity('azdza')).toThrow(
    'ValidUntil not found in given secured api key.'
  );
});
