/* eslint-disable no-param-reassign */
import { TestSuite } from '../../../../client-common/src/__tests__/TestSuite';

const testSuite = new TestSuite('dictionary');

test(testSuite.testName, async () => {
  const client = testSuite.makeSearchClient('ALGOLIA_APPLICATION_ID_2', 'ALGOLIA_ADMIN_KEY_2');

  const stopwordEntryId = Math.floor(Math.random() * 10000).toString();
  expect((await client.searchDictionaryEntries('stopwords', stopwordEntryId)).nbHits).toEqual(0);

  const stopwordEntry = {
    objectID: stopwordEntryId,
    language: 'en',
    word: 'down',
  };

  await client.saveDictionaryEntries('stopwords', [stopwordEntry]);

  const stopwords = await client.searchDictionaryEntries('stopwords', stopwordEntryId);
  expect(stopwords.nbHits).toEqual(1);
  expect(stopwords.hits[0].objectID).toEqual(stopwordEntry.objectID);
  expect(stopwords.hits[0].word).toEqual(stopwordEntry.word);

  await client.deleteDictionaryEntries('stopwords', [stopwordEntryId]);
  expect((await client.searchDictionaryEntries('stopwords', stopwordEntryId)).nbHits).toEqual(0);

  const oldDictionaryState = await client.searchDictionaryEntries('stopwords', '');
  const oldDictionaryEntries = oldDictionaryState.hits.map(hit => {
    // @ts-ignore
    delete hit.type;

    return hit;
  });

  await client.saveDictionaryEntries('stopwords', [stopwordEntry]);
  expect((await client.searchDictionaryEntries('stopwords', stopwordEntryId)).nbHits).toEqual(1);

  await client.replaceDictionaryEntries('stopwords', oldDictionaryEntries);
  expect((await client.searchDictionaryEntries('stopwords', stopwordEntryId)).nbHits).toEqual(0);

  const stopwordsSettings = {
    disableStandardEntries: {
      stopwords: {
        en: true,
      },
    },
  };

  await client.setDictionarySettings(stopwordsSettings);
  expect(await client.getDictionarySettings()).toEqual(stopwordsSettings);

  const pluralEntryId = Math.floor(Math.random() * 10000).toString();
  expect((await client.searchDictionaryEntries('plurals', pluralEntryId)).nbHits).toEqual(0);

  const pluralEntry = {
    objectID: pluralEntryId,
    language: 'fr',
    words: ['cheval', 'chevaux'],
  };

  await client.saveDictionaryEntries('plurals', [pluralEntry]);

  const plurals = await client.searchDictionaryEntries('plurals', pluralEntryId);
  expect(plurals.nbHits).toEqual(1);
  expect(plurals.hits[0].objectID).toEqual(pluralEntry.objectID);
  expect(plurals.hits[0].words).toEqual(pluralEntry.words);

  await client.deleteDictionaryEntries('plurals', [pluralEntryId]);
  expect((await client.searchDictionaryEntries('plurals', pluralEntryId)).nbHits).toEqual(0);

  const compoundEntryId = Math.floor(Math.random() * 10000).toString();
  expect((await client.searchDictionaryEntries('plurals', compoundEntryId)).nbHits).toEqual(0);

  const compoundEntry = {
    objectID: compoundEntryId,
    language: 'fr',
    word: 'kopfschmerztablette',
    decomposition: ['kopf', 'schmerz', 'tablette'],
  };

  await client.saveDictionaryEntries('plurals', [compoundEntry]);

  const compounds = await client.searchDictionaryEntries('plurals', compoundEntryId);
  expect(compounds.nbHits).toEqual(1);
  expect(compounds.hits[0].objectID).toEqual(compoundEntry.objectID);
  expect(compounds.hits[0].word).toEqual(compoundEntry.word);
  expect(compounds.hits[0].decomposition).toEqual(compoundEntry.decomposition);

  await client.deleteDictionaryEntries('plurals', [compoundEntryId]);
  expect((await client.searchDictionaryEntries('plurals', compoundEntryId)).nbHits).toEqual(0);
});
