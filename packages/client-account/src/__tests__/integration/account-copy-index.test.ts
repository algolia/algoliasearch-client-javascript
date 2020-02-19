import { accountCopyIndex } from '@algolia/client-account';
import { Rule, Synonym } from '@algolia/client-search';

import { waitResponses } from '../../../../client-common/src/__tests__/helpers';
import { TestSuite } from '../../../../client-common/src/__tests__/TestSuite';

const testSuite = new TestSuite('account_copy_index');

test(testSuite.testName, async () => {
  const source = testSuite.makeIndex();
  const destination = testSuite
    .makeSearchClient('ALGOLIA_APPLICATION_ID_2', 'ALGOLIA_ADMIN_KEY_2')
    .initIndex(testSuite.makeIndexName());

  await expect(accountCopyIndex(source, source)).rejects.toEqual({
    name: 'IndicesInTheSameAppError',
    message: 'Indices are in the same application. Use SearchClient.copyIndex instead.',
    appId: source.appId,
  });

  const rule: Rule = {
    objectID: 'one',
    condition: { anchoring: 'is', pattern: 'pattern' },
    consequence: {
      params: {
        query: {
          edits: [{ type: 'remove', delete: 'pattern' }],
        },
      },
    },
  };

  const synomy: Synonym = { objectID: 'one', type: 'synonym', synonyms: ['one', 'two'] };

  await waitResponses([
    source.saveObject({ objectID: 'one' }),
    source.setSettings({ searchableAttributes: ['objectID'] }),
    source.saveRule(rule),
    source.saveSynonym(synomy),
  ]);

  await expect(accountCopyIndex(source, destination).wait()).resolves.toBeUndefined();

  await expect(destination.search('')).resolves.toMatchObject({
    hits: [{ objectID: 'one' }],
  });

  await expect(destination.getSettings()).resolves.toMatchObject({
    searchableAttributes: ['objectID'],
  });

  await expect(destination.getRule('one')).resolves.toEqual(rule);

  await expect(destination.getSynonym('one')).resolves.toEqual(synomy);

  await expect(accountCopyIndex(source, destination)).rejects.toEqual({
    name: 'DestinationIndiceAlreadyExistsError',
    message: 'Destination indice already exists.',
  });
});
