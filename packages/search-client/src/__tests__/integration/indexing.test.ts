import { TestSuite } from '@algolia/support/src/__tests__/TestSuite';
import { Faker } from '@algolia/support/src/__tests__/Faker';
import { createMultiWaitable } from '@algolia/support/src/__tests__/helpers';

const testSuite = new TestSuite('indexing');

afterAll(() => testSuite.cleanUp());

test(testSuite.testName, async () => {
  const index = testSuite.makeIndex();
  let responses: any = [];

  const object1 = Faker.object('object1');
  responses.push(index.saveObject(object1));

  const object2 = Faker.object();
  const response2 = index.saveObject(object2, {
    autoGenerateObjectIDIfNotExist: true,
  });

  responses.push(response2);

  responses = responses.concat(index.saveObjects([]));

  const object3 = {
    ...Faker.object('object3'),
    _tags: ['algolia'],
  };

  const object4 = {
    ...Faker.object('object4'),
    _tags: ['algolia'],
  };

  responses = responses.concat(index.saveObjects([object3, object4]));

  const object5 = Faker.object();
  const object6 = Faker.object();
  const response5and6 = index.saveObjects([object5, object6], {
    autoGenerateObjectIDIfNotExist: true,
  });
  responses = responses.concat(response5and6);

  const object7 = Faker.object('object7');
  const response7 = index.batch([
    {
      action: 'addObject',
      body: object7,
    },
  ]);

  responses = responses.concat(response7);

  const remain1000objects = Faker.objects(1000);

  responses = responses.concat(
    index.saveObjects(remain1000objects, {
      batchSize: 100,
    })
  );

  await createMultiWaitable(responses).wait();
  responses = [];

  await expect(index.getObject('object1')).resolves.toStrictEqual(object1);

  const objectId2 = (await response2).objectID;
  await expect(index.getObject(objectId2)).resolves.toStrictEqual(
    Object.assign(object2, { objectID: objectId2 })
  );
  await expect(index.getObject('object3')).resolves.toStrictEqual(object3);
  await expect(index.getObject('object4')).resolves.toStrictEqual(object4);

  const objectId5 = (await response5and6)[0].objectIDs[0];
  await expect(index.getObject(objectId5)).resolves.toStrictEqual(
    Object.assign(object5, { objectID: objectId5 })
  );

  const objectId6 = (await response5and6)[0].objectIDs[1];
  await expect(index.getObject(objectId6)).resolves.toStrictEqual(
    Object.assign(object6, { objectID: objectId6 })
  );

  await expect(index.getObject('object7')).resolves.toStrictEqual(object7);

  await expect(
    index.getObjects(Array.from(Array(1000).keys()).map((objectId: number) => objectId.toString()))
  ).resolves.toStrictEqual({
    results: remain1000objects,
  });

  // @todo missing browseObjects here...

  const updatedObject1 = {
    ...object1,
    name: 'This is an altered name',
  };

  responses.push(index.partialUpdateObject(updatedObject1));

  const updatedObject3 = {
    ...object3,
    bar: 40,
  };

  const updatedObject4 = {
    ...object4,
    foo: 30,
  };

  responses.push(index.partialUpdateObjects([updatedObject3, updatedObject4]));

  await createMultiWaitable(responses).wait();
  responses = [];

  expect(await index.getObject('object1')).toEqual(updatedObject1);
  expect(await index.getObject('object3')).toEqual(updatedObject3);
  expect(await index.getObject('object4')).toEqual(updatedObject4);

  await index.deleteObject('object1').wait();
  expect((await index.search('', { cacheable: false })).nbHits).toBe(1006);

  await index.deleteObject(objectId2).wait();
  expect((await index.search('', { cacheable: false })).nbHits).toBe(1005);

  await index.deleteBy({ tagFilters: ['algolia'] }).wait();
  expect((await index.search('', { cacheable: false })).nbHits).toBe(1003);

  await index.deleteObjects([objectId5, objectId6]).wait();
  expect((await index.search('', { cacheable: false })).nbHits).toBe(1001);

  await index.clearObjects().wait();
  expect((await index.search('', { cacheable: false })).nbHits).toBe(0);
});
