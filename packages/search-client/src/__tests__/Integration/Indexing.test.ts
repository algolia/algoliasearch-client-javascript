import { TestSuite } from '../TestSuite';

const testSuite = new TestSuite('indexing');

afterAll(async () => await testSuite.cleanUp());

test(testSuite.testName, () => {
  // Instantiate the client and index indexing
  testSuite.makeIndex();
});
