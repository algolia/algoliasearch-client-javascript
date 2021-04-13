/* eslint-disable no-param-reassign */
import { TestSuite } from '../../../../client-common/src/__tests__/TestSuite';

const testSuite = new TestSuite('dictionary');
import crypto from 'crypto';

describe(testSuite.testName, () => {
  const client = testSuite.makeSearchClient('ALGOLIA_APPLICATION_ID_2', 'ALGOLIA_ADMIN_KEY_2');

  test('stopwords', async () => {
    const stopwordEntry = {
      objectID: crypto.randomBytes(16).toString('hex'),
      language: 'en',
      word: 'down',
    };

    // clean past entries
    await client
      .deleteDictionaryEntries(
        'stopwords',
        (await client.searchDictionaryEntries('stopwords', stopwordEntry.objectID)).hits.map(
          hit => hit.objectID
        )
      )
      .wait();

    const nbSearchEntries = (
      await client.searchDictionaryEntries('stopwords', stopwordEntry.objectID)
    ).nbHits;

    await client.saveDictionaryEntries('stopwords', [stopwordEntry]).wait();

    const stopwords = await client.searchDictionaryEntries('stopwords', stopwordEntry.objectID);

    expect(stopwords.nbHits).toEqual(nbSearchEntries + 1);
    expect(stopwords.hits).toEqual(
      expect.arrayContaining([expect.objectContaining(stopwordEntry)])
    );

    await client.deleteDictionaryEntries('stopwords', [stopwordEntry.objectID]).wait();
    expect(
      (await client.searchDictionaryEntries('stopwords', stopwordEntry.objectID)).nbHits
    ).toEqual(0);

    const oldDictionaryState = await client.searchDictionaryEntries('stopwords', '');
    const oldDictionaryEntries = oldDictionaryState.hits.map(hit => {
      // @ts-ignore
      delete hit.type;

      return hit;
    });

    await client.saveDictionaryEntries('stopwords', [stopwordEntry]).wait();
    expect(
      (await client.searchDictionaryEntries('stopwords', stopwordEntry.objectID)).nbHits
    ).toEqual(1);

    await client.replaceDictionaryEntries('stopwords', oldDictionaryEntries).wait();
    expect(
      (await client.searchDictionaryEntries('stopwords', stopwordEntry.objectID)).nbHits
    ).toEqual(0);

    const stopwordsSettings = {
      disableStandardEntries: {
        stopwords: {
          en: true,
          fr: true,
        },
      },
    };

    await client.setDictionarySettings(stopwordsSettings);
    expect(await client.getDictionarySettings()).toEqual(stopwordsSettings);
  });

  test('plurals', async () => {
    const pluralEntry = {
      objectID: crypto.randomBytes(16).toString('hex'),
      language: 'fr',
      words: ['cheval', 'chevaux'],
    };

    // clean past entries
    await client
      .deleteDictionaryEntries(
        'plurals',
        (await client.searchDictionaryEntries('plurals', pluralEntry.objectID)).hits.map(
          hit => hit.objectID
        )
      )
      .wait();

    const nbSearchEntries = (await client.searchDictionaryEntries('plurals', pluralEntry.objectID))
      .nbHits;

    await client.saveDictionaryEntries('plurals', [pluralEntry]).wait();

    const plurals = await client.searchDictionaryEntries('plurals', pluralEntry.objectID);

    expect(plurals.nbHits).toEqual(nbSearchEntries + 1);
    expect(plurals.hits).toEqual(expect.arrayContaining([expect.objectContaining(pluralEntry)]));

    await client.deleteDictionaryEntries('plurals', [pluralEntry.objectID]).wait();
    expect((await client.searchDictionaryEntries('plurals', pluralEntry.objectID)).nbHits).toEqual(
      0
    );
  });

  test('compounds', async () => {
    const compoundEntry = {
      objectID: crypto.randomBytes(16).toString('hex'),
      language: 'de',
      word: 'kopfschmerztablette',
      decomposition: ['kopf', 'schmerz', 'tablette'],
    };

    // clean past entries
    await client
      .deleteDictionaryEntries(
        'compounds',
        (await client.searchDictionaryEntries('compounds', compoundEntry.objectID)).hits.map(
          hit => hit.objectID
        )
      )
      .wait();

    const nbSearchEntries = (
      await client.searchDictionaryEntries('compounds', compoundEntry.objectID)
    ).nbHits;

    await client.saveDictionaryEntries('compounds', [compoundEntry]).wait();

    const compounds = await client.searchDictionaryEntries('compounds', compoundEntry.objectID);

    expect(compounds.nbHits).toEqual(nbSearchEntries + 1);
    expect(compounds.hits).toEqual(
      expect.arrayContaining([expect.objectContaining(compoundEntry)])
    );

    await client.deleteDictionaryEntries('compounds', [compoundEntry.objectID]).wait();
    expect(
      (await client.searchDictionaryEntries('compounds', compoundEntry.objectID)).nbHits
    ).toEqual(0);
  });
});
