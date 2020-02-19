import { TestSuite } from '../../../../client-common/src/__tests__/TestSuite';

const testSuite = new TestSuite('query_parameters');

test(testSuite.testName, async () => {
  const index = testSuite.makeIndex();
  await index.saveObject({ objectID: 1 }).wait();

  await expect(index.getSettings()).resolves.toMatchObject({ version: 2 });

  await expect(
    index.getSettings({
      getVersion: 1,
    })
  ).resolves.toMatchObject({ version: 1 });

  await expect(
    index.getSettings({
      getVersion: 1,
      queryParameters: {
        getVersion: 2,
      },
    })
  ).resolves.toMatchObject({ version: 2 });
});
