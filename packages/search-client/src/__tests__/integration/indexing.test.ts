import { TestSuite } from '../TestSuite';
import { Faker } from '../Faker';

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

  const object3 = Faker.object('object3');
  const object4 = Faker.object('object4');
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

  for (let i = 0; i < responses.length; i++) {
    await responses[i].wait();
  }

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
});
