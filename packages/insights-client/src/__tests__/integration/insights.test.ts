import { TestSuite } from '@algolia/support/src/__tests__/TestSuite';
import { Faker } from '@algolia/support/src/__tests__/Faker';
import { EventEnum } from '../../methods/types/EventType';

const testSuite = new TestSuite('insights');

afterAll(() => testSuite.cleanUp());

test(testSuite.testName, async () => {
  const index = testSuite.makeIndex();

  index.saveObjects([Faker.object('one'), Faker.object('two')]).wait();

  const client = testSuite.makeInsights();

  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() - 2);
  const twoDaysAgo = currentDate.getTime();

  const response = await client.sendEvents([
    {
      eventType: EventEnum.Click,
      eventName: 'foo',
      index: index.indexName,
      userToken: 'bar',
      objectIDs: ['one', 'two'],
      timestamp: twoDaysAgo,
    },
    {
      eventType: EventEnum.Click,
      eventName: 'foo',
      index: index.indexName,
      userToken: 'bar',
      objectIDs: ['one', 'two'],
      timestamp: twoDaysAgo,
    },
  ]);

  expect(response.status).toBe(200);
  expect(response.message).toBe('OK');
});
