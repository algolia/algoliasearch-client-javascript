import { TestSuite } from '../../../../client-common/src/__tests__/TestSuite';
import { ObjectWithObjectID } from '../../types';

const testSuite = new TestSuite('batching');

test(testSuite.testName, async () => {
  const index = testSuite.makeIndex();

  await index
    .saveObjects([
      { objectID: 'one', key: 'value' },
      { objectID: 'two', key: 'value' },
      { objectID: 'three', key: 'value' },
      { objectID: 'four', key: 'value' },
      { objectID: 'five', key: 'value' },
    ])
    .wait();

  await index
    .batch([
      { action: 'addObject', body: { objectID: 'zero', key: 'value' } },
      { action: 'updateObject', body: { objectID: 'one', k: 'v' } },
      { action: 'partialUpdateObject', body: { objectID: 'two', k: 'v' } },
      { action: 'partialUpdateObject', body: { objectID: 'two_bis', key: 'value' } },
      { action: 'partialUpdateObjectNoCreate', body: { objectID: 'three', k: 'v' } },
      { action: 'deleteObject', body: { objectID: 'four' } },
    ])
    .wait();

  expect((await index.search('', { cacheable: false })).nbHits).toBe(6);

  let objects: ObjectWithObjectID[] = [];
  await index.browseObjects({
    batch(objectsBatch) {
      objects = objects.concat(objectsBatch);
    },
  });

  expect(objects.length).toBe(6);

  [
    { objectID: 'zero', key: 'value' },
    { objectID: 'one', k: 'v' },
    { objectID: 'two', key: 'value', k: 'v' },
    { objectID: 'two_bis', key: 'value' },
    { objectID: 'three', key: 'value', k: 'v' },
    { objectID: 'five', key: 'value' },
  ].forEach(object => {
    expect(objects).toContainEqual(object);
  });
});
