import { createMultiWaitable } from '@algolia/support/src/__tests__/helpers';
import { TestSuite } from '@algolia/support/src/__tests__/TestSuite';

import { createObjectNotFoundError } from '../../errors/createObjectNotFoundError';

const testSuite = new TestSuite('search');

afterAll(() => testSuite.cleanUp());

test(testSuite.testName, async () => {
  const index = testSuite.makeIndex();

  const responses: any = [];

  responses.push(
    index.saveObjects(
      [
        { objectID: 'julien-lemoine', company: 'Algolia', name: 'Julien Lemoine' },
        { objectID: 'nicolas-dessaigne', company: 'Algolia', name: 'Nicolas Dessaigne' },
        { company: 'Amazon', name: 'Jeff Bezos' },
        { company: 'Apple', name: 'Steve Jobs' },
        { company: 'Apple', name: 'Steve Wozniak' },
        { company: 'Arista Networks', name: 'Jayshree Ullal' },
        { company: 'Google', name: 'Larry Page' },
        { company: 'Google', name: 'Rob Pike' },
        { company: 'Google', name: 'Serguey Brin' },
        { company: 'Microsoft', name: 'Bill Gates' },
        { company: 'SpaceX', name: 'Elon Musk' },
        { company: 'Tesla', name: 'Elon Musk' },
        { company: 'Yahoo', name: 'Marissa Mayer' },
      ],
      {
        autoGenerateObjectIDIfNotExist: true,
      }
    )
  );

  responses.push(index.setSettings({ attributesForFaceting: ['searchable(company)'] }));

  await createMultiWaitable(responses).wait();

  let searchResponse = await index.search('algolia');

  expect(searchResponse.hits).toHaveLength(2);

  expect(index.getObjectPosition(searchResponse, 'nicolas-dessaigne')).toBe(0);
  expect(index.getObjectPosition(searchResponse, 'julien-lemoine')).toBe(1);
  expect(index.getObjectPosition(searchResponse, '')).toBe(-1);

  await expect(index.findObject(() => false)).rejects.toEqual(createObjectNotFoundError());
  expect(await index.findObject(() => true)).toMatchObject({
    position: 0,
    page: 0,
  });

  const cb = obj => obj.company === 'Apple';

  await expect(index.findObject(cb, { query: 'algolia' })).rejects.toEqual(
    createObjectNotFoundError()
  );

  await expect(
    index.findObject(cb, {
      query: '',
      paginate: false,
      hitsPerPage: 5,
    })
  ).rejects.toEqual(createObjectNotFoundError());

  expect(
    await index.findObject(cb, {
      query: '',
      paginate: true,
      hitsPerPage: 5,
    })
  ).toMatchObject({
    position: 0,
    page: 2,
  });

  searchResponse = await index.search('elon', {
    clickAnalytics: true,
  });

  expect(searchResponse.queryID).toBeDefined();

  searchResponse = await index.search('elon', {
    facets: ['*'],
    facetFilters: [['company:tesla']],
  });

  expect(searchResponse.hits).toHaveLength(1);

  searchResponse = await index.search('elon', {
    facets: ['*'],
    facetFilters: [['company:tesla', 'company:spacex']],
  });

  expect(searchResponse.hits).toHaveLength(2);

  const searchForFacetValuesResponse = await index.searchForFacetValues('company', 'a');

  expect(searchForFacetValuesResponse.facetHits).toEqual([
    {
      count: 2,
      highlighted: '<em>A</em>lgolia',
      value: 'Algolia',
    },
    {
      count: 2,
      highlighted: '<em>A</em>pple',
      value: 'Apple',
    },
    {
      count: 1,
      highlighted: '<em>A</em>mazon',
      value: 'Amazon',
    },
    {
      count: 1,
      highlighted: '<em>A</em>rista Networks',
      value: 'Arista Networks',
    },
  ]);
});
