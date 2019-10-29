import { TestSuite } from '@algolia/client-common/src/__tests__/TestSuite';

const testSuite = new TestSuite('personalization_strategy');

afterAll(() => testSuite.cleanUp());

test(testSuite.testName, async () => {
  const client = testSuite.makeSearchClient();
  const response = await client.getPersonalizationStrategy();
  expect(response.taskID).toBeGreaterThan(0);
});
