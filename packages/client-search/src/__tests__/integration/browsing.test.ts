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
import { SearchOptions } from '../../types';

const testSuite = new TestSuite('browsing');

let index: ReturnType<typeof testSuite.makeIndex>;
let browse: (
  method: (index: SearchIndex) => any,
  options?: BrowseOptions<{}> & SearchOptions
) => Promise<{
  hitsCount: number;
  batchCount: number;
}>;

beforeAll(async () => {
  index = testSuite.makeIndex();

  // First lets create the index.
  await index.setSettings({}).wait();

  // Then, let's create a generic browse function that
  // will take a browseMethod, and get metrics such as
  // the number of retrieved hits and number of batches.
  browse = async (method, options = {}) => {
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
});

describe.each([
  [
    'browseObjects',
    {
      method: browseObjects,
      async withDataset(number: number) {
        await index.clearObjects();

        await index.saveObjects(createFaker().objects(number)).wait();
      },
      cursorBased: true,
    },
  ],
  [
    'browseRules',
    {
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
    },
  ],
  [
    'browseSynonyms',
    {
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
    },
  ],
])(`${testSuite.testName}: %s`, (_methodName, testCase) => {
  test('empty', async () => {
    await expect(browse(testCase.method)).resolves.toEqual({
      hitsCount: 0,
      batchCount: 1,
    });
  });

  test('dataset 10', async () => {
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
  });

  test('dataset 1000', async () => {
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
  });

  test('should stop', async () => {
    await testCase.withDataset(10);

    await Promise.all([
      expect(
        browse(testCase.method, {
          // Should stop on the very first batch. Therefore, the number
          // of hits should be 1, and the batch count should be 1
          shouldStop: () => true,
          hitsPerPage: 1,
        })
      ).resolves.toEqual({
        hitsCount: 1,
        batchCount: 1,
      }),

      expect(
        browse(testCase.method, {
          // Should stop on the second batch. The one that was the objectID "7". Therefore,
          // the number of hits should be 4, and the batch count should be 2
          shouldStop: res => res.hits[0].objectID === '7',
          hitsPerPage: 2,
        })
      ).resolves.toEqual({
        hitsCount: 4,
        batchCount: 2,
      }),
    ]);
  });

  test('error inside browse method', async () => {
    await expect(
      testCase.method(index)({
        unknownParameter: 'fail',
      })
    ).rejects.toEqual(
      expect.objectContaining({
        message: expect.any(String),
        name: 'ApiError',
      })
    );
  });
});
