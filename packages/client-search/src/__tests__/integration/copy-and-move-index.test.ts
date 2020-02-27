import { waitResponses } from '../../../../client-common/src/__tests__/helpers';
import { TestSuite } from '../../../../client-common/src/__tests__/TestSuite';

const testSuite = new TestSuite('copy_and_move_index');

test(testSuite.testName, async () => {
  const client = testSuite.makeSearchClient();
  const index = client.initIndex(testSuite.makeIndexName());

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

  responses.push(
    index.saveRule({
      objectID: 'company_auto_faceting',
      condition: {
        anchoring: 'contains',
        pattern: '{facet:company}',
      },
      consequence: {
        params: { automaticFacetFilters: ['company'] },
      },
    })
  );

  await waitResponses(responses);
  responses = [];

  const indexSettings = client.initIndex(`${index.indexName}copy_index_settings`);
  responses.push(client.copySettings(index.indexName, indexSettings.indexName));

  const indexSynonyms = client.initIndex(`${index.indexName}copy_index_synonyms`);
  responses.push(client.copySynonyms(index.indexName, indexSynonyms.indexName));

  const indexRules = client.initIndex(`${index.indexName}copy_index_rules`);
  responses.push(client.copyRules(index.indexName, indexRules.indexName));

  const indexFull = client.initIndex(`${index.indexName}copy_index_full`);
  responses.push(client.copyIndex(index.indexName, indexFull.indexName));

  await waitResponses(responses);
  responses = [];

  const synonyms = await index.searchSynonyms('');
  const rules = await index.searchRules('');
  const settings = await index.getSettings();

  expect((await indexSettings.getSettings()).attributesForFaceting).toEqual(
    settings.attributesForFaceting
  );

  expect(await indexSynonyms.searchSynonyms('')).toEqual(synonyms);
  expect(await indexFull.searchSynonyms('')).toEqual(synonyms);
  expect((await indexRules.searchSynonyms('')).hits).toEqual([]);
  expect((await indexSettings.searchSynonyms('')).hits).toEqual([]);

  expect(await indexRules.searchRules('')).toEqual(rules);
  expect(await indexFull.searchRules('')).toEqual(rules);
  expect((await indexSynonyms.searchRules('')).hits).toEqual([]);
  expect((await indexSettings.searchRules('')).hits).toEqual([]);

  expect(await indexSettings.getSettings()).toEqual(settings);
  expect(await indexFull.getSettings()).toEqual(settings);
  expect((await indexRules.getSettings()).attributesForFaceting).toEqual(null);
  expect((await indexSynonyms.getSettings()).attributesForFaceting).toEqual(null);

  const indexMoved = client.initIndex(`${index.indexName}move_index`);
  await client.moveIndex(index.indexName, indexMoved.indexName).wait();

  expect(await index.exists()).toBe(false);
  expect(await indexMoved.getSettings()).toEqual(settings);
  expect(await indexMoved.searchSynonyms('')).toEqual(synonyms);
  expect(await indexMoved.searchRules('')).toEqual(rules);
});
