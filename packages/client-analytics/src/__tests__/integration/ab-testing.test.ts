import { createApiError } from '@algolia/transporter';

import { ABTest, Variant } from '../..';
import { createFaker } from '../../../../client-common/src/__tests__/createFaker';
import { createMultiWaitable } from '../../../../client-common/src/__tests__/helpers';
import { TestSuite } from '../../../../client-common/src/__tests__/TestSuite';

const testSuite = new TestSuite('ab_testing');

afterAll(() => testSuite.cleanUp());

test(testSuite.testName, async () => {
  const index1 = testSuite.makeIndex();
  const index2 = testSuite.makeIndex();
  const client = testSuite.makeSearchClient().initAnalytics();
  const today = new Date();
  const todayDate = `${today.getFullYear}-${today.getMonth}-${today.getDay}`;

  // Delete old AB tests
  {
    const oldABTests = (await client.getABTests()).abtests;

    await oldABTests
      .filter(abtest => abtest.name.startsWith('js-') && !abtest.name.startsWith(`js-${todayDate}`))
      .map(async abtest => {
        await client.deleteABTest(abtest.abTestID);
      });
  }

  // Create the two indices by adding a dummy object in each of them
  const object = createFaker().object('one');
  await createMultiWaitable([index1.saveObject(object), index2.saveObject(object)] as any).wait();

  const abTestName = testSuite.makeIndexName();
  const abTest: ABTest = {
    name: abTestName,
    variants: [
      { index: index1.indexName, trafficPercentage: 60, description: 'a description' },
      { index: index2.indexName, trafficPercentage: 40 },
    ],
    endAt: new Date(today.getTime() + 24 * 3600 * 1000).toISOString(),
  };

  const abTestID = (await client.addABTest(abTest)).abTestID;

  const compareVariants = (got: readonly Variant[], expected: Variant[]) => {
    const convertedVariants = got.map(v => {
      const convertedVariant: Variant = {
        index: v.index,
        trafficPercentage: v.trafficPercentage,
      };

      if (v.description && v.description.length !== 0) {
        convertedVariant.description = v.description;
      }

      return convertedVariant;
    });

    expect(convertedVariants).toEqual(expect.arrayContaining(expected));
    expect(expected).toEqual(expect.arrayContaining(convertedVariants));
  };

  const compareDateStrings = (got: string, expected: string) => {
    expect(new Date(got).getTime()).toBe(new Date(expected).getTime());
  };

  // Retrieve the AB test and check it corresponds to the original one
  {
    const found = await client.getABTest(abTestID);
    expect(found.abTestID).toBe(abTestID);
    expect(found.name).toBe(abTest.name);
    compareDateStrings(found.endAt, abTest.endAt);
    compareVariants(found.variants, abTest.variants);
  }

  // Find the AB test among all the existing AB tests and check it
  // corresponds to the original one
  {
    const all = await client.getABTests();
    const found = all.abtests.find(t => t.abTestID === abTestID);
    expect(found.abTestID).toBe(abTestID);
    expect(found.name).toBe(abTest.name);
    compareDateStrings(found.endAt, abTest.endAt);
    compareVariants(found.variants, abTest.variants);
  }

  // Stop the AB test
  const stopABTestResponse = await client.stopABTest(abTestID);
  await index1.waitTask(stopABTestResponse.taskID);

  // Check the AB test still exists but is stopped
  await expect(client.getABTest(abTestID)).resolves.toMatchObject({ status: 'stopped' });

  // Delete the AB test
  const deleteABTestResponse = await client.deleteABTest(abTestID);
  await index1.waitTask(deleteABTestResponse.taskID);

  // Check the AB test doesn't exist anymore
  await expect(client.getABTest(abTestID)).rejects.toEqual(
    createApiError('ABTestID not found', 404)
  );
});
