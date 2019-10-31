import { createMultiWaitable } from '@algolia/client-common/__tests__/helpers';
import { TestSuite } from '@algolia/client-common/__tests__/TestSuite';
import { createApiError } from '@algolia/transporter/errors/createApiError';

import { Synonym } from '../../types/Synonym';
import { SynonymEnum } from '../../types/SynonymType';

const testSuite = new TestSuite('synonyms');

afterAll(() => testSuite.cleanUp());

test(testSuite.testName, async () => {
  const index = testSuite.makeIndex();
  const responses = [];
  responses.push(
    index.saveObjects(
      [
        { console: 'Sony PlayStation <PLAYSTATIONVERSION>' },
        { console: 'Nintendo Switch' },
        { console: 'Nintendo Wii U' },
        { console: 'Nintendo Game Boy Advance' },
        { console: 'Microsoft Xbox' },
        { console: 'Microsoft Xbox 360' },
        { console: 'Microsoft Xbox One' },
      ],
      { autoGenerateObjectIDIfNotExist: true }
    )
  );

  const synonym1 = {
    objectID: 'gba',
    type: SynonymEnum.Synonym,
    synonyms: ['gba', 'gameboy advance', 'game boy advance'],
  };

  responses.push(index.saveSynonym(synonym1));

  const synonym2 = {
    objectID: 'wii_to_wii_u',
    type: SynonymEnum.OneWaySynonym,
    input: 'wii',
    synonyms: ['wii U'],
  };

  const synonym3 = {
    objectID: 'playstation_version_placeholder',
    type: SynonymEnum.Placeholder,
    placeholder: '<PLAYSTATIONVERSION>',
    replacements: ['1', 'One', '2', '3', '4', '4 Pro'],
  };

  const synonym4 = {
    objectID: 'ps4',
    type: SynonymEnum.AltCorrection2,
    word: 'ps4',
    corrections: ['playstation4'],
  };

  const synonym5 = {
    objectID: 'psone',
    type: SynonymEnum.AltCorrection2,
    word: 'psone',
    corrections: ['playstationone'],
  };

  const synonyms: Synonym[] = [synonym2, synonym3, synonym4, synonym5];

  responses.push(index.saveSynonyms([synonym2, synonym3, synonym4, synonym5]));

  await createMultiWaitable(responses).wait();

  synonyms.push(synonym1);

  await synonyms.forEach(async synonym => {
    expect(await index.getSynonym(synonym.objectID)).toEqual(synonym);
  });

  expect((await index.searchSynonyms('')).nbHits).toEqual(5);

  let synonymsFromBrowse = [];
  await index.browseSynonyms({
    batch: synonymsBatch => (synonymsFromBrowse = synonymsFromBrowse.concat(synonymsBatch)),
  });

  expect(synonymsFromBrowse).toHaveLength(5);

  synonymsFromBrowse.forEach(synonym => {
    expect(synonyms).toContainEqual(synonym);
  });

  let emptySynonyms = [];
  await index.browseSynonyms({
    query: 'GHJKLHGHJKLKJH',
    batch: synomyBatch => (emptySynonyms = emptySynonyms.concat(synomyBatch)),
  });

  expect(emptySynonyms).toHaveLength(0);

  await index.deleteSynonym('gba').wait();

  await expect(index.getSynonym('gba')).rejects.toEqual(
    createApiError('Synonym set does not exist', 404)
  );

  await index.clearSynonyms().wait();

  expect((await index.searchSynonyms('')).nbHits).toEqual(0);
});
