import { Rule, Synonym } from '../..';
import { waitResponses } from '../../../../client-common/src/__tests__/helpers';
import { TestSuite } from '../../../../client-common/src/__tests__/TestSuite';

const testSuite = new TestSuite('replacing');

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

  await waitResponses(responses);
  responses = [];

  let replaceAllObjectsResponse = await index.replaceAllObjects([{ objectID: 'two' }]).wait();

  const synonym2: Synonym = {
    objectID: 'two',
    type: 'synonym',
    synonyms: ['one', 'two'],
  };

  responses.push(index.replaceAllSynonyms([synonym2]));

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

  responses.push(index.replaceAllRules([rule2]));

  await waitResponses(responses);

  await expect(index.getObject('one')).rejects.toMatchObject({
    name: 'ApiError',
    message: 'ObjectID does not exist',
    status: 404,
  });

  await expect(index.getObject('two')).resolves.toEqual({ objectID: 'two' });

  await expect(index.getSynonym('two')).resolves.toEqual(synonym2);
  await expect(index.getSynonym('one')).rejects.toMatchObject({
    name: 'ApiError',
    message: 'Synonym set does not exist',
    status: 404,
  });

  await expect(index.getRule('two')).resolves.toMatchObject(rule2);
  await expect(index.getRule('one')).rejects.toMatchObject({
    name: 'ApiError',
    message: 'ObjectID does not exist',
    status: 404,
  });

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
