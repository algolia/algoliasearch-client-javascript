import { createMultiWaitable } from '@algolia/support/src/__tests__/helpers';
import { TestSuite } from '@algolia/support/src/__tests__/TestSuite';

const testSuite = new TestSuite('copy_and_move_index');

afterAll(() => testSuite.cleanUp());

test(testSuite.testName, async () => {
  const index = testSuite.makeIndex();
  const client = testSuite.makeSearchClient();

  let responses = [];

  responses.push(
    index.saveObjects([
      { objectID: 'one', company: 'apple' },
      { objectID: 'two', company: 'algolia' },
    ])
  );

  responses.push(index.setSettings({ attributesForFaceting: ['company'] }));
  responses.push(
    index.saveSynonym({
      objectID: 'google_placeholder',
      type: 'placeholder',
      placeholder: '<GOOG>',
      replacements: ['Google', 'GOOG'],
    })
  );

  // @todo save rule here...
  await createMultiWaitable(responses).wait();
  responses = [];

  const indexSettings = testSuite.makeIndex(`${index.indexName}copy_index_settings`);
  responses.push(client.copySettings(index.indexName, indexSettings.indexName));

  // @todo Copy rules here...

  const indexSynonyms = testSuite.makeIndex(`${index.indexName}copy_index_synonyms`);
  responses.push(client.copySynonyms(index.indexName, indexSynonyms.indexName));

  const indexFull = testSuite.makeIndex(`${index.indexName}copy_index_full`);
  responses.push(client.copyIndex(index.indexName, indexFull.indexName));

  await createMultiWaitable(responses).wait();
  responses = [];

  const synonyms = await index.searchSynonyms('');
  const settings = await index.getSettings();

  expect((await indexSettings.getSettings()).attributesForFaceting).toEqual(
    settings.attributesForFaceting
  );
  expect((await indexSettings.searchSynonyms('')).hits).toEqual([]);

  expect(await indexSynonyms.searchSynonyms('')).toEqual(synonyms);
  expect((await indexSynonyms.getSettings()).attributesForFaceting).toEqual(null);

  expect(await indexFull.getSettings()).toEqual(settings);
  expect(await indexFull.searchSynonyms('')).toEqual(synonyms);

  const indexMoved = testSuite.makeIndex(`${index.indexName}move_index`);
  await client.moveIndex(index.indexName, indexMoved.indexName).wait();
  expect(await index.exists()).toBe(false);
  expect(await indexMoved.getSettings()).toEqual(settings);
  expect(await indexMoved.searchSynonyms('')).toEqual(synonyms);
});
