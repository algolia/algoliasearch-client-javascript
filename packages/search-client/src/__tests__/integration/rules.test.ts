import { createMultiWaitable } from '@algolia/support/src/__tests__/helpers';
import { TestSuite } from '@algolia/support/src/__tests__/TestSuite';

import { EditEnum } from '../../methods/types/EditType';
import { IndexSettings } from '../../methods/types/IndexSettings';
import { Rule } from '../../methods/types/Rule';

const testSuite = new TestSuite('rules');

afterAll(() => testSuite.cleanUp());

test(testSuite.testName, async () => {
  const index = testSuite.makeIndex();
  const responses = [];
  responses.push(
    index.saveObjects([
      { objectID: 'iphone_7', brand: 'Apple', model: '7' },
      { objectID: 'iphone_8', brand: 'Apple', model: '8' },
      { objectID: 'iphone_x', brand: 'Apple', model: 'X' },
      { objectID: 'one_plus_one', brand: 'OnePlus', model: 'One' },
      { objectID: 'one_plus_two', brand: 'OnePlus', model: 'Two' },
    ])
  );

  const settings: IndexSettings = {
    attributesForFaceting: ['brand', 'model'],
  };

  responses.push(index.setSettings(settings));

  const ruleToSave: Rule = {
    objectID: 'brand_automatic_faceting',
    enabled: false,
    condition: { anchoring: 'is', pattern: '{facet:brand}' },
    consequence: {
      params: { automaticFacetFilters: [{ facet: 'brand', disjunctive: true, score: 42 }] },
    },
    validity: [{ from: 1532439300, until: 1532525700 }, { from: 1532612100, until: 1532698500 }],
    description: 'Automatic apply the faceting on `brand` if a brand value is found in the query',
  };

  responses.push(index.saveRule(ruleToSave));

  const ruleToSave2: Rule = {
    objectID: 'query_edits',
    condition: { anchoring: 'is', pattern: 'mobile phone', alternatives: true },
    consequence: {
      params: {
        query: {
          edits: [
            { type: EditEnum.Remove, delete: 'mobile' },
            { type: EditEnum.Replace, delete: 'phone', insert: 'ihpone' },
          ],
        },
      },
    },
  };

  const ruleToSave3: Rule = {
    objectID: 'query_promo',
    consequence: { params: { filters: 'brand:OnePlus' } },
  };

  const ruleToSave4: Rule = {
    objectID: 'query_promo_only_summer',
    consequence: { params: { filters: 'model:One' } },
    condition: { context: 'summer' },
  };

  const rulesToSaves: Rule[] = [ruleToSave2, ruleToSave3, ruleToSave4];
  responses.push(index.saveRules(rulesToSaves));
  await createMultiWaitable(responses).wait();

  expect(await index.getRule(ruleToSave.objectID)).toMatchObject(ruleToSave);
  expect(await index.getRule(ruleToSave2.objectID)).toMatchObject(ruleToSave2);
  expect(await index.getRule(ruleToSave3.objectID)).toMatchObject(ruleToSave3);
  expect(await index.getRule(ruleToSave4.objectID)).toMatchObject(ruleToSave4);

  expect((await index.search('', { ruleContexts: ['summer'] })).hits.length).toEqual(1);

  const searchResult = await index.searchRules('');
  expect(searchResult.nbHits).toEqual(4);
  expect(
    searchResult.hits.find((rule: Rule) => rule.objectID === ruleToSave.objectID)
  ).toMatchObject(ruleToSave);
  expect(
    searchResult.hits.find((rule: Rule) => rule.objectID === ruleToSave2.objectID)
  ).toMatchObject(ruleToSave2);
  expect(
    searchResult.hits.find((rule: Rule) => rule.objectID === ruleToSave3.objectID)
  ).toMatchObject(ruleToSave3);
  expect(
    searchResult.hits.find((rule: Rule) => rule.objectID === ruleToSave4.objectID)
  ).toMatchObject(ruleToSave4);

  let rulesFromBrowse = [];
  await index.browseRules({
    batch: rulesBatch => (rulesFromBrowse = rulesFromBrowse.concat(rulesBatch)),
  });

  expect(rulesFromBrowse.length).toEqual(4);
  expect(rulesFromBrowse.find((rule: Rule) => rule.objectID === ruleToSave.objectID)).toMatchObject(
    ruleToSave
  );
  expect(
    rulesFromBrowse.find((rule: Rule) => rule.objectID === ruleToSave2.objectID)
  ).toMatchObject(ruleToSave2);
  expect(
    rulesFromBrowse.find((rule: Rule) => rule.objectID === ruleToSave3.objectID)
  ).toMatchObject(ruleToSave3);
  expect(
    rulesFromBrowse.find((rule: Rule) => rule.objectID === ruleToSave4.objectID)
  ).toMatchObject(ruleToSave4);

  let emptyRules = [];
  await index.browseRules({
    query: 'FGHJKLVFGBHJKJHBGVF',
    batch: ruleBatch => (emptyRules = emptyRules.concat(ruleBatch)),
  });

  expect(emptyRules).toHaveLength(0);

  await index.deleteRule(ruleToSave.objectID).wait();

  const searchResultAfterDelete = await index.searchRules('');
  expect(searchResultAfterDelete.nbHits).toEqual(3);
  expect(searchResultAfterDelete.hits).not.toContain(ruleToSave);

  await index.clearRules().wait();

  const searchResultAfterClear = await index.searchRules();
  expect(searchResultAfterClear.nbHits).toBe(0);
});
