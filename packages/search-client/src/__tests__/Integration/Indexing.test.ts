import { TestSuite } from '../TestSuite';
import { Faker } from '../Faker';

const testSuite = new TestSuite('indexing');

afterAll(() => testSuite.cleanUp());

test(testSuite.testName, async () => {
  const index = testSuite.makeIndex();

  await index.saveObject(Faker.object('res1'));

  await index.saveObject(Faker.object(), {
    autoGenerateObjectIDIfNotExist: true,
  });

  await index.saveObjects([]);

  await index.saveObjects([Faker.object('res4-1'), Faker.object('res4-2')]);

  await index.saveObjects([Faker.object(), Faker.object()], {
    autoGenerateObjectIDIfNotExist: true,
  });
});
