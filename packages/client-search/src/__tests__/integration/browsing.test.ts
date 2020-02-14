import {
  browseObjects,
  BrowseOptions,
  browseRules,
  browseSynonyms,
  ObjectWithObjectID,
  SearchIndex,
} from '../..';
import { createFaker } from '../../../../client-common/src/__tests__/createFaker';
import { TestSuite } from '../../../../client-common/src/__tests__/TestSuite';

const testSuite = new TestSuite('browsing');

test(testSuite.testName, async () => {
  const index = testSuite.makeIndex();

  // First lets create the index.
  await index.setSettings({}).wait();

  // Then, let's create a generic browse function that
  // will take a browseMethod, and get metrics such as
  // the number of retrieved hits and number of batches.
  const browse = async (
    method: (index: SearchIndex) => any,
    options: { hitsPerPage?: number } = {}
  ) => {
    const result = {
      hitsCount: 0,
      batchCount: 0,
    };

    const browseOptions: BrowseOptions<ObjectWithObjectID> = {
      ...options,
      batch(batch) {
        result.batchCount++;
        result.hitsCount = result.hitsCount + batch.length;
      },
    };

    await method(index)(browseOptions);

    return result;
  };

  // Next, let's create a test case for each browse type, note that
  // each test case as a specific method, a specific way of browsing,
  // and also a specific way of reseting the dataset.

  const objectsCase = {
    method: browseObjects,
    async withDataset(number: number) {
      await index.clearObjects();

      await index.saveObjects(createFaker().objects(number)).wait();
    },
    cursorBased: true,
  };

  const rulesCase = {
    method: browseRules,
    async withDataset(number: number) {
      await index.clearRules();

      await index
        .saveRules(
          [...Array(number).keys()].map(objectID => ({
            objectID: objectID.toString(),
            consequence: { params: { filters: 'brand:OnePlus' } },
          }))
        )
        .wait();
    },
    cursorBased: false,
  };

  const synonymsCase = {
    method: browseSynonyms,
    async withDataset(number: number) {
      await index.clearSynonyms();

      await index
        .saveSynonyms(
          [...Array(number).keys()].map(objectID => ({
            objectID: objectID.toString(),
            type: 'synonym',
            synonyms: ['gba', 'gameboy advance', 'game boy advance'],
          }))
        )
        .wait();
    },
    cursorBased: false,
  };

  // Finaly let's start the testing part. For each browse type lets test
  // it against, and multiple numbers of datasets and conditions.
  await Promise.all(
    [objectsCase, synonymsCase, rulesCase].map(async testCase => {
      await expect(browse(testCase.method)).resolves.toEqual({
        hitsCount: 0,
        batchCount: 1,
      });

      await testCase.withDataset(10);

      await Promise.all([
        expect(browse(testCase.method)).resolves.toEqual({
          hitsCount: 10,
          batchCount: 1,
        }),

        expect(browse(testCase.method, { hitsPerPage: 9 })).resolves.toEqual({
          hitsCount: 10,
          batchCount: 2,
        }),

        expect(browse(testCase.method, { hitsPerPage: 10 })).resolves.toEqual({
          hitsCount: 10,
          batchCount: testCase.cursorBased ? 1 : 2,
        }),

        expect(browse(testCase.method, { hitsPerPage: 11 })).resolves.toEqual({
          hitsCount: 10,
          batchCount: 1,
        }),
      ]);

      await testCase.withDataset(1000);

      await Promise.all([
        expect(browse(testCase.method)).resolves.toEqual({
          hitsCount: 1000,
          batchCount: testCase.cursorBased ? 1 : 2,
        }),

        expect(browse(testCase.method, { hitsPerPage: 999 })).resolves.toEqual({
          hitsCount: 1000,
          batchCount: 2,
        }),
      ]);
    })
  );
});
