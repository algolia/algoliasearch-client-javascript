import { Settings } from '@algolia/client-search';

import { createFaker } from '../../../../client-common/src/__tests__/createFaker';
import { createMultiWaitable } from '../../../../client-common/src/__tests__/helpers';
import { TestSuite } from '../../../../client-common/src/__tests__/TestSuite';

const testSuite = new TestSuite('settings');

afterAll(() => testSuite.cleanUp());

test(testSuite.testName, async () => {
  const index = testSuite.makeIndex();

  const replica1 = testSuite.makeIndex(`${index.indexName}_replica1`);
  const replica2 = testSuite.makeIndex(`${index.indexName}_replica2`);

  const responses: any = [];

  responses.push(index.saveObject(createFaker().object('foo')));

  const settings1: Settings = {
    searchableAttributes: [
      'attribute1',
      'attribute2',
      'attribute3',
      'ordered(attribute4)',
      'unordered(attribute5)',
    ],
    attributesForFaceting: ['attribute1', 'filterOnly(attribute2)', 'searchable(attribute3)'],
    unretrievableAttributes: ['attribute1', 'attribute2'],
    attributesToRetrieve: ['attribute3', 'attribute4'],
    ranking: [
      'asc(attribute1)',
      'desc(attribute2)',
      'attribute',
      'custom',
      'exact',
      'filters',
      'geo',
      'proximity',
      'typo',
      'words',
    ],
    customRanking: ['asc(attribute1)', 'desc(attribute1)'],
    replicas: [replica1.indexName, replica2.indexName],
    maxValuesPerFacet: 100,
    sortFacetValuesBy: 'count',
    attributesToHighlight: ['attribute1', 'attribute2'],
    attributesToSnippet: ['attribute1:10', 'attribute2:8'],
    highlightPreTag: '<strong>',
    highlightPostTag: '</strong>',
    snippetEllipsisText: ' and so on.',
    restrictHighlightAndSnippetArrays: true,
    hitsPerPage: 42,
    paginationLimitedTo: 43,
    minWordSizefor1Typo: 2,
    minWordSizefor2Typos: 6,
    typoTolerance: 'false',
    allowTyposOnNumericTokens: false,
    ignorePlurals: true,
    disableTypoToleranceOnAttributes: ['attribute1', 'attribute2'],
    disableTypoToleranceOnWords: ['word1', 'word2'],
    separatorsToIndex: '()[]',
    queryType: 'prefixNone',
    removeWordsIfNoResults: 'allOptional',
    advancedSyntax: true,
    optionalWords: ['word1', 'word2'],
    removeStopWords: true,
    disablePrefixOnAttributes: ['attribute1', 'attribute2'],
    disableExactOnAttributes: ['attribute1', 'attribute2'],
    exactOnSingleWordQuery: 'word',
    enableRules: false,
    numericAttributesForFiltering: ['attribute1', 'attribute2'],
    allowCompressionOfIntegerArray: true,
    attributeForDistinct: 'attribute1',
    distinct: 2,
    replaceSynonymsInHighlight: false,
    minProximity: 7,
    responseFields: ['hits', 'hitsPerPage'],
    maxFacetHits: 100,
    camelCaseAttributes: ['attribute1', 'attribute2'],
    decompoundedAttributes: { de: ['attribute1', 'attribute2'], fi: ['attribute3'] },
    keepDiacriticsOnCharacters: 'øé',
  };

  responses.push(index.setSettings(settings1));

  await createMultiWaitable(responses).wait();

  expect(await index.getSettings()).toMatchObject(settings1);

  const settings2 = {
    typoTolerance: 'min',
    ignorePlurals: ['en', 'fr'],
    removeStopWords: ['en', 'fr'],
    distinct: true,
  };

  await index.setSettings(settings2).wait();

  expect(await index.getSettings()).toMatchObject(settings2);
});
