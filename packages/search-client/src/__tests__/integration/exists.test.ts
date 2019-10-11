import { TestSuite } from '@algolia/support/src/__tests__/TestSuite';

const testSuite = new TestSuite('exists');

afterAll(() => testSuite.cleanUp());

test(testSuite.testName, async () => {
  const index = testSuite.makeIndex();

  expect(await index.exists()).toBe(false);
  await index.saveObject({ objectID: '1' }).wait();
  expect(await index.exists()).toBe(true);
});
