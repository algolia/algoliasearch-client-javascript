import { createMultiWaitable } from '@algolia/client-common/src/__tests__/helpers';
import { TestSuite } from '@algolia/client-common/src/__tests__/TestSuite';
import { createApiError } from '@algolia/transporter/src/errors/createApiError';

import { Rule } from '../../types/Rule';
import { Synonym } from '../../types/Synonym';

const testSuite = new TestSuite('replacing');

afterAll(() => testSuite.cleanUp());

test(testSuite.testName, async () => {
  const index = testSuite.makeIndex();
  let responses: any = [];

  responses.push(index.saveObject({ objectID: 'one' }));
  responses.push(index.saveSynonym({ objectID: 'one', type: 'synonym', synonyms: ['one', 'two'] }));
  responses.push(
    index.saveRule({
      objectID: 'one',
      condition: { anchoring: 'is', pattern: 'pattern' },
      consequence: {
        params: {
          query: {
            edits: [{ type: 'remove', delete: 'pattern' }],
          },
        },
      },
    })
  );

  await createMultiWaitable(responses).wait();
  responses = [];

  await index.replaceAllObjects([{ objectID: 'two' }], { safe: true });

  const synonym2: Synonym = { objectID: 'two', type: 'synonym', synonyms: ['one', 'two'] };
  await index.replaceAllSynonyms([synonym2]).wait();

  const rule2: Rule = {
    objectID: 'two',
    condition: { anchoring: 'is', pattern: 'pattern' },
    consequence: {
      params: {
        query: {
          edits: [{ type: 'remove', delete: 'pattern' }],
        },
      },
    },
  };

  await index.replaceAllRules([rule2]).wait();

  await expect(index.getObject('one')).rejects.toEqual(
    createApiError('ObjectID does not exist', 404)
  );
  await expect(index.getObject('two')).resolves.toEqual({ objectID: 'two' });

  await expect(index.getSynonym('two')).resolves.toEqual(synonym2);
  await expect(index.getSynonym('one')).rejects.toEqual(
    createApiError('Synonym set does not exist', 404)
  );

  await expect(index.getRule('two')).resolves.toEqual(rule2);
  await expect(index.getRule('one')).rejects.toEqual(
    createApiError('ObjectID does not exist', 404)
  );
});
