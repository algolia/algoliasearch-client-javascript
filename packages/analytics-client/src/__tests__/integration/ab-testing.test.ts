import { TestSuite } from '@algolia/support/src/__tests__/TestSuite';
import { Faker } from '@algolia/support/src/__tests__/Faker';

const testSuite = new TestSuite('ab testing');

afterAll(() => testSuite.cleanUp());

test(testSuite.testName, async () => {
  const index = testSuite.makeIndex();
  const index2 = testSuite.makeIndex();
  const responses: any = [];

  responses.push(index.saveObject(Faker.object('one')));
  responses.push(index2.saveObject(Faker.object('one')));

  // @todo Keep working from here..
  const client = testSuite.makeAnalytics();
  const response = await client.getABTests();
  expect(response.total).toBe(0);
});
