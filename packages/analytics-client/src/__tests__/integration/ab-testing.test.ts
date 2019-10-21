import { TestSuite } from '@algolia/support/src/__tests__/TestSuite';

const testSuite = new TestSuite('ab testing');

afterAll(() => testSuite.cleanUp());

test(testSuite.testName, () => {
  expect(true).toBe(true);
});
