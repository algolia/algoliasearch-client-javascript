import { TestSuite } from '../TestSuite';
import { WaitablePromise } from '../../WaitablePromise';

const testSuite = new TestSuite('search');

afterAll(() => testSuite.cleanUp());

test(testSuite.testName, async () => {
  const index = testSuite.makeIndex();

  const responses: Array<WaitablePromise<any>> = [];

  responses.push(
    index.saveObjects(
      [
        { company: 'Algolia', name: 'Julien Lemoine' },
        { company: 'Algolia', name: 'Nicolas Dessaigne' },
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

  for (let i = 0; i < responses.length; i++) {
    await responses[i].wait();
  }

  let searchResponse = await index.search('algolia');

  expect(searchResponse.hits).toHaveLength(2);

  searchResponse = await index.search('elon', {
    clickAnalytics: true,
  });

  expect(searchResponse.queryID).toBeDefined();

  searchResponse = await index.search('elon', {
    facets: '*',
    facetFilters: 'company:tesla',
  });

  expect(searchResponse.hits).toHaveLength(1);

  searchResponse = await index.search('elon', {
    facets: '*',
    facetFilters: [['company:tesla', 'company:spacex']],
  });

  expect(searchResponse.hits).toHaveLength(2);

  const searchForFacetValuesResponse = await index.searchForFacetValues({
    facetName: 'company',
    facetQuery: 'a',
  });

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
