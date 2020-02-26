import { createObjectNotFoundError, SearchResponse } from '../..';
import { waitResponses } from '../../../../client-common/src/__tests__/helpers';
import { TestSuite } from '../../../../client-common/src/__tests__/TestSuite';

const testSuite = new TestSuite('search');

test(testSuite.testName, async () => {
  const index = testSuite.makeIndex();

  const responses: any = [];

  responses.push(
    index.saveObjects(
      [
        {
          objectID: 'julien-lemoine',
          company: 'Algolia',
          name: 'Julien Lemoine',
        },
        {
          objectID: 'nicolas-dessaigne',
          company: 'Algolia',
          name: 'Nicolas Dessaigne',
        },
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

  await waitResponses(responses);

  type TObject = {
    company: string;
    name: string;
  };

  let searchResponse = await index.search<TObject>('algolia');

  expect(searchResponse.hits).toHaveLength(2);

  expect(index.getObjectPosition(searchResponse, 'nicolas-dessaigne')).toBe(0);
  expect(index.getObjectPosition(searchResponse, 'julien-lemoine')).toBe(1);
  expect(index.getObjectPosition(searchResponse, '')).toBe(-1);

  await expect(index.findObject(() => false)).rejects.toEqual(createObjectNotFoundError());
  expect(await index.findObject(() => true)).toMatchObject({
    position: 0,
    page: 0,
  });

  const cb = (obj: any) => obj.company === 'Apple';

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

test('decompounding at query time', async () => {
  const index = testSuite.makeIndex();

  await waitResponses([
    index.setSettings({
      decompoundedAttributes: {
        de: ['category', 'type', 'desc'],
      },
      queryLanguages: ['de'],
      ignorePlurals: true,
    }),
    index.saveObjects([
      { objectID: 'A...B', category: 'hunde', type: 'Hütte' },
      { objectID: 'AB', desc: 'Ich will ein schöne Hundehütte' },
      { objectID: 'BA', desc: 'Hüttehunde, Es ist eine lustige Verbindung!' },
      { objectID: 'B...A', category: 'Eine Hütte für Hunden' },
      { objectID: 'A', category: 'Hunde' },
      { objectID: 'B', category: 'Hunde' },
    ]),
  ]);

  const results = await index.search('Hundehütte', {
    explain: ['match.alternatives'],
    ignorePlurals: true,
    queryParameters: {
      foo: 'bar',
    },
  });

  const explain: SearchResponse['explain'] = {
    match: {
      alternatives: [
        {
          types: ['original'],
          words: ['hunde'],
          typos: 0,
          offset: 0,
          length: 1,
        },
        {
          types: ['original'],
          words: ['hutte'],
          typos: 0,
          offset: 1,
          length: 1,
        },
        {
          types: ['compound'],
          words: ['hundehutte'],
          typos: 0,
          offset: 0,
          length: 2,
        },
        {
          types: ['split'],
          words: ['hunde', 'hutte'],
          typos: 0,
          offset: 0,
          length: 2,
        },
        {
          types: ['plural'],
          words: ['hund'],
          typos: 0,
          offset: 0,
          length: 1,
        },
        {
          types: ['plural'],
          words: ['hundchen'],
          typos: 0,
          offset: 0,
          length: 1,
        },
        {
          types: ['plural'],
          words: ['hundchens'],
          typos: 0,
          offset: 0,
          length: 1,
        },
        {
          types: ['plural'],
          words: ['hundehutten'],
          typos: 0,
          offset: 0,
          length: 2,
        },
        {
          types: ['plural'],
          words: ['hunden'],
          typos: 0,
          offset: 0,
          length: 1,
        },
        {
          types: ['plural'],
          words: ['hundes'],
          typos: 0,
          offset: 0,
          length: 1,
        },
        {
          types: ['plural'],
          words: ['hundlein'],
          typos: 0,
          offset: 0,
          length: 1,
        },
        {
          types: ['plural'],
          words: ['hunds'],
          typos: 0,
          offset: 0,
          length: 1,
        },
        {
          types: ['plural'],
          words: ['hutten'],
          typos: 0,
          offset: 1,
          length: 1,
        },
      ],
    },
  };

  expect(results.explain).toMatchObject(explain);
});
