import { TestSuite } from '@algolia/support/src/__tests__/TestSuite';

const testSuite = new TestSuite('mcm');

afterAll(() => testSuite.cleanUp());

test(testSuite.testName, async () => {
  const client = testSuite.makeSearchClient('ALGOLIA_APPLICATION_ID_MCM', 'ALGOLIA_ADMIN_KEY_MCM');

  const response = await client.listClusters();
  expect(response.clusters).toHaveLength(2);
});
