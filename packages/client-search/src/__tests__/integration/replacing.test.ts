import { createApiError } from '@algolia/transporter';

import { Rule, Synonym } from '../..';
import { createMultiWaitable } from '../../../../client-common/src/__tests__/helpers';
import { TestSuite } from '../../../../client-common/src/__tests__/TestSuite';
import { ChunkedBatchResponse } from '../../types';

const testSuite = new TestSuite('replacing');

afterAll(() => testSuite.cleanUp());

test(testSuite.testName, async () => {
  const index = testSuite.makeIndex();
  let responses: any = [];

  responses.push(index.saveObject({ objectID: 'one' }));
  responses.push(
    index.saveSynonym({
      objectID: 'one',
      type: 'synonym',
      synonyms: ['one', 'two'],
    })
  );
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

  let replaceAllObjectsResponse: ChunkedBatchResponse;

  replaceAllObjectsResponse = await index.replaceAllObjects([{ objectID: 'two' }]);

  responses.push(replaceAllObjectsResponse);

  const synonym2: Synonym = {
    objectID: 'two',
    type: 'synonym',
    synonyms: ['one', 'two'],
  };

  const replaceAllSynonymsResponse = await index.replaceAllSynonyms([synonym2]);
  responses.push(replaceAllSynonymsResponse);

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

  const replaceAllRulesResponse = await index.replaceAllRules([rule2]);
  responses.push(replaceAllRulesResponse);

  await createMultiWaitable(responses).wait();

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

  expect(replaceAllObjectsResponse.objectIDs).toEqual(['two']);
  expect(replaceAllObjectsResponse.taskIDs).toHaveLength(3);

  replaceAllObjectsResponse = await index.replaceAllObjects(
    [{ withoutObjectID: 'three' }, { withoutObjectID: 'four' }],
    {
      safe: true, // should wait task
      autoGenerateObjectIDIfNotExist: true,
      batchSize: 1,
    }
  );

  expect(replaceAllObjectsResponse.objectIDs).toHaveLength(2);
  expect(replaceAllObjectsResponse.taskIDs).toHaveLength(4);

  await expect(index.getObject(replaceAllObjectsResponse.objectIDs[0])).resolves.toEqual({
    objectID: replaceAllObjectsResponse.objectIDs[0],
    withoutObjectID: 'three',
  });

  await expect(index.getObject(replaceAllObjectsResponse.objectIDs[1])).resolves.toEqual({
    objectID: replaceAllObjectsResponse.objectIDs[1],
    withoutObjectID: 'four',
  });
});
