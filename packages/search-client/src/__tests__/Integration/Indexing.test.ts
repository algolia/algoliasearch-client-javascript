import { TestSuite } from '../TestSuite';
import { Faker } from '../Faker';
import { BatchResponse } from '../../Methods/SearchIndex/batch';
import { WaitablePromise } from '../../WaitablePromise';
import { SaveObjectResponse } from '../../Methods/SearchIndex/saveObject';

const testSuite = new TestSuite('indexing');

afterAll(() => testSuite.cleanUp());

test(testSuite.testName, () => {
  const index = testSuite.makeIndex();
  let responses: Array<WaitablePromise<SaveObjectResponse | BatchResponse[]>> = [];

  const object1 = Faker.object('object1');
  responses.push(index.saveObject(object1));

  responses.push(
    index.saveObject(Faker.object(), {
      autoGenerateObjectIDIfNotExist: true,
    })
  );

  responses = responses.concat(index.saveObjects([]));

  const object3 = Faker.object('object3');
  const object4 = Faker.object('object4');
  responses = responses.concat(index.saveObjects([object3, object4]));

  responses = responses.concat(
    index.saveObjects([Faker.object(), Faker.object()], {
      autoGenerateObjectIDIfNotExist: true,
    })
  );

  responses = responses.concat(
    index.saveObjects(Faker.objects(1000), {
      batchSize: 100,
    })
  );

  responses.forEach(response => {
    response.wait();
  });
});
