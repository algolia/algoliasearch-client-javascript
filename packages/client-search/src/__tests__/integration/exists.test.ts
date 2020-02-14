import { TestSuite } from '../../../../client-common/src/__tests__/TestSuite';

const testSuite = new TestSuite('exists');

test(testSuite.testName, async () => {
  const index = testSuite.makeIndex();

  expect(await index.exists()).toBe(false);
  await index.saveObject({ objectID: '1' }).wait();
  expect(await index.exists()).toBe(true);
});
