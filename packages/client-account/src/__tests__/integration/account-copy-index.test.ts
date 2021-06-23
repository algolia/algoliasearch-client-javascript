import { accountCopyIndex } from '@algolia/client-account';
import { createRetryablePromise } from '@algolia/client-common';
import { Rule, Synonym } from '@algolia/client-search';

import { waitResponses } from '../../../../client-common/src/__tests__/helpers';
import { TestSuite } from '../../../../client-common/src/__tests__/TestSuite';

const testSuite = new TestSuite('account_copy_index');

describe(testSuite.testName, () => {
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

  const setUpSource = async (source: ReturnType<typeof testSuite.makeIndex>) => {
    await waitResponses([
      source.saveObject({ objectID: 'one' }),
      source.setSettings({ searchableAttributes: ['objectID'] }),
      source.saveRule(rule),
      source.saveSynonym(synomy),
    ]);
  };

  const waitForIndexCreated = (destination: ReturnType<typeof testSuite.makeIndex>) =>
    createRetryablePromise(async retry => {
      const exists = await destination.exists();

      return exists ? Promise.resolve() : retry();
    });

  it('copies indices between accounts', async () => {
    const source = testSuite.makeIndex();
    const destination = testSuite
      .makeSearchClient('ALGOLIA_APPLICATION_ID_2', 'ALGOLIA_ADMIN_KEY_2')
      .initIndex(testSuite.makeIndexName());

    await setUpSource(source);

    await expect(accountCopyIndex(source, source)).rejects.toEqual({
      name: 'IndicesInTheSameAppError',
      message: 'Indices are in the same application. Use SearchClient.copyIndex instead.',
      appId: source.appId,
    });

    await expect(accountCopyIndex(source, destination).wait()).resolves.toBeUndefined();

    await expect(destination.search('')).resolves.toMatchObject({
      hits: [{ objectID: 'one' }],
    });

    await expect(destination.getSettings()).resolves.toMatchObject({
      searchableAttributes: ['objectID'],
    });

    await expect(destination.getRule('one')).resolves.toMatchObject(rule);

    await expect(destination.getSynonym('one')).resolves.toEqual(synomy);

    await expect(accountCopyIndex(source, destination)).rejects.toEqual({
      name: 'DestinationIndiceAlreadyExistsError',
      message: 'Destination indice already exists.',
    });
  });

  it('it does not need to wait', async () => {
    const source = testSuite.makeIndex();
    const destination = testSuite
      .makeSearchClient('ALGOLIA_APPLICATION_ID_2', 'ALGOLIA_ADMIN_KEY_2')
      .initIndex(testSuite.makeIndexName());

    await setUpSource(source);

    await expect(accountCopyIndex(source, destination)).resolves.toBeUndefined();

    await waitForIndexCreated(destination);
    await expect(destination.exists()).resolves.toEqual(true);
  });

  it('it bubbles up errors', async () => {
    const source = testSuite.makeIndex();

    await setUpSource(source);

    const indexName = testSuite.makeIndexName();

    const addApiKeyResponse = await testSuite
      .makeSearchClient('ALGOLIA_APPLICATION_ID_2', 'ALGOLIA_ADMIN_KEY_2')
      .addApiKey(['settings', 'editSettings', 'search'], {
        indexes: [indexName],
      })
      .wait();

    const destination = testSuite
      .algoliasearch(`${process.env.ALGOLIA_APPLICATION_ID_2}`, addApiKeyResponse.key)
      .initIndex(indexName);

    await expect(accountCopyIndex(source, destination).wait()).rejects.toMatchObject({
      name: 'ApiError',
      message: 'Not enough rights to update an object near line:1 column:64',
      status: 400,
    });

    // At this point, we should have created the index. But it should
    // be empty because we only have set settings on it.
    await waitForIndexCreated(destination);

    await expect(destination.search('')).resolves.toMatchObject({
      nbHits: 0,
      hits: [],
    });
  });
});
