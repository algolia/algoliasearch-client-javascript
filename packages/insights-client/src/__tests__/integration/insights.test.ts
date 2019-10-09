import { TestSuite } from '@algolia/support/src/__tests__/TestSuite';
import { Faker } from '@algolia/support/src/__tests__/Faker';
import { EventEnum } from '../../methods/types/EventType';
import { clickedObjectIDs, HasClickedObjectIDs } from '../../methods/user/clickedObjectIDs';
import {
  clickedObjectIDsAfterSearch,
  HasClickedObjectIDsAfterSearch,
} from '../../methods/user/clickedObjectIDsAfterSearch';
import { HasClickedFilters, clickedFilters } from '../../methods/user/clickedFilters';
import { HasConvertedObjectIDs, convertedObjectIDs } from '../../methods/user/convertedObjectIDs';
import {
  HasConvertedObjectIDsAfterSearch,
  convertedObjectIDsAfterSearch,
} from '../../methods/user/convertedObjectIDsAfterSearch';
import { HasConvertedFilters, convertedFilters } from '../../methods/user/convertedFilters';
import { HasViewedFilters, viewedFilters } from '../../methods/user/viewedFilters';
import { HasViewedObjectIDs, viewedObjectIDs } from '../../methods/user/viewedObjectIDs';

const testSuite = new TestSuite('insights');

afterAll(() => testSuite.cleanUp());

describe('insights', () => {
  const index = testSuite.makeIndex();
  const client = testSuite.makeInsights();

  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() - 2);
  const twoDaysAgo = currentDate.getTime();

  it('send event', async () => {
    const response = await client.sendEvent({
      eventType: EventEnum.Click,
      eventName: 'foo',
      index: index.indexName,
      userToken: 'bar',
      objectIDs: ['one', 'two'],
      timestamp: twoDaysAgo,
    });

    expect(response.status).toBe(200);
    expect(response.message).toBe('OK');
  });

  it('send events', async () => {
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

  it('clicks object ids', async () => {
    const response = await client
      .user<HasClickedObjectIDs>('bar', {
        methods: [clickedObjectIDs],
      })
      .clickedObjectIDs({
        eventName: 'foo',
        indexName: index.indexName,
        objectIDs: ['one', 'two'],
      });

    expect(response.status).toBe(200);
    expect(response.message).toBe('OK');
  });

  it('clicks object ids after search', async () => {
    await index.saveObjects([Faker.object('one'), Faker.object('two')]).wait();
    const { queryID } = await index.search('', {
      clickAnalytics: true,
    });

    const response = await client
      .user<HasClickedObjectIDsAfterSearch>('bar', {
        methods: [clickedObjectIDsAfterSearch],
      })
      .clickedObjectIDsAfterSearch({
        eventName: 'foo',
        indexName: index.indexName,
        objectIDs: ['one', 'two'],
        positions: [1, 2],
        queryID,
      });

    expect(response.status).toBe(200);
    expect(response.message).toBe('OK');
  });

  it('clicks filters', async () => {
    const response = await client
      .user<HasClickedFilters>('bar', {
        methods: [clickedFilters],
      })
      .clickedFilters({
        eventName: 'foo',
        indexName: index.indexName,
        filters: ['filter:foo', 'filter:bar'],
      });

    expect(response.status).toBe(200);
    expect(response.message).toBe('OK');
  });

  it('converts object ids', async () => {
    const response = await client
      .user<HasConvertedObjectIDs>('bar', {
        methods: [convertedObjectIDs],
      })
      .convertedObjectIDs({
        eventName: 'foo',
        indexName: index.indexName,
        objectIDs: ['one', 'two'],
      });

    expect(response.status).toBe(200);
    expect(response.message).toBe('OK');
  });

  it('converts object ids after search', async () => {
    await index.saveObjects([Faker.object('one'), Faker.object('two')]).wait();
    const { queryID } = await index.search('', {
      clickAnalytics: true,
    });

    const response = await client
      .user<HasConvertedObjectIDsAfterSearch>('bar', {
        methods: [convertedObjectIDsAfterSearch],
      })
      .convertedObjectIDsAfterSearch({
        eventName: 'foo',
        indexName: index.indexName,
        objectIDs: ['one', 'two'],
        queryID,
      });

    expect(response.status).toBe(200);
    expect(response.message).toBe('OK');
  });

  it('converts filters', async () => {
    const response = await client
      .user<HasConvertedFilters>('bar', {
        methods: [convertedFilters],
      })
      .convertedFilters({
        eventName: 'foo',
        indexName: index.indexName,
        filters: ['filter:foo', 'filter:bar'],
      });

    expect(response.status).toBe(200);
    expect(response.message).toBe('OK');
  });

  it('views object ids', async () => {
    const response = await client
      .user<HasViewedObjectIDs>('bar', {
        methods: [viewedObjectIDs],
      })
      .viewedObjectIDs({
        eventName: 'foo',
        indexName: index.indexName,
        objectIDs: ['one', 'two'],
      });

    expect(response.status).toBe(200);
    expect(response.message).toBe('OK');
  });

  it('views filters', async () => {
    const response = await client
      .user<HasViewedFilters>('bar', {
        methods: [viewedFilters],
      })
      .viewedFilters({
        eventName: 'foo',
        indexName: index.indexName,
        filters: ['filter:foo', 'filter:bar'],
      });

    expect(response.status).toBe(200);
    expect(response.message).toBe('OK');
  });
});
