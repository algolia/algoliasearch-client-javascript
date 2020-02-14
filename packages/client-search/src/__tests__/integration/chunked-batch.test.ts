import { TestSuite } from '../../../../client-common/src/__tests__/TestSuite';

const testSuite = new TestSuite('chunked_batch');

test(testSuite.testName, async () => {
  const index = testSuite.makeIndex();

  const saveObjectResponse = await index.saveObject({ objectID: 1 });
  expect(saveObjectResponse.objectID).toEqual('1');
  expect(saveObjectResponse.taskID).toBeDefined();

  const saveObjectsResponse = await index.saveObjects([{ objectID: 1 }]);
  expect(saveObjectsResponse.objectIDs).toEqual(['1']);
  expect(saveObjectsResponse.taskIDs).toHaveLength(1);

  const secondSaveObjectsResponse = await index.saveObjects([{ objectID: 1 }, { objectID: 2 }], {
    batchSize: 1,
  });
  expect(secondSaveObjectsResponse.objectIDs).toEqual(['1', '2']);
  expect(secondSaveObjectsResponse.taskIDs).toHaveLength(2);

  const partialUpdateObjectResponse = await index.partialUpdateObject({
    objectID: 1,
  });
  expect(partialUpdateObjectResponse.objectID).toEqual('1');
  expect(partialUpdateObjectResponse.taskID).toBeDefined();

  const partialUpdateObjectsResponse = await index.partialUpdateObjects([{ objectID: 1 }]);
  expect(partialUpdateObjectsResponse.objectIDs).toEqual(['1']);
  expect(partialUpdateObjectsResponse.taskIDs).toHaveLength(1);

  const deleteObjectResponse = await index.deleteObject('1');
  expect(deleteObjectResponse.taskID).toBeDefined();

  const deleteObjectsResponse = await index.deleteObjects(['1']);
  expect(deleteObjectsResponse.objectIDs).toEqual(['1']);
  expect(deleteObjectsResponse.taskIDs).toHaveLength(1);
});
