/* eslint sonarjs/cognitive-complexity: 0 */ // --> OFF

import { createRetryablePromise } from '@algolia/client-common';
import { ApiError, Transporter } from '@algolia/transporter';

import { TestSuite } from '../../../../client-common/src/__tests__/TestSuite';

const testSuite = new TestSuite('mcm');

const createRetryableTransporter = (client: Transporter): Transporter => {
  return new Proxy(client, {
    get(obj: any, method: string) {
      return (...args: any) => {
        return createRetryablePromise(retry => {
          return obj[method](...args).catch((err: ApiError) => {
            if (err.message === 'Remote side is unreachable') {
              return retry();
            }

            throw err;
          });
        });
      };
    },
  });
};

test(testSuite.testName, async () => {
  const client = testSuite.makeSearchClient('ALGOLIA_APPLICATION_ID_MCM', 'ALGOLIA_ADMIN_KEY_MCM');

  // @ts-ignore
  client.transporter = createRetryableTransporter(client.transporter);

  const response = await client.listClusters();

  expect(response.clusters).toHaveLength(2);
  const prefix = testSuite.makeIndexName();
  const firstClusterName = response.clusters[0].clusterName;
  const userID = (number: number) =>
    `${prefix}-${number}`
      .replace(/_/g, '-')
      .replace(/:/g, '-')
      .replace(/\./g, '-');

  await expect(client.assignUserID(userID(0), firstClusterName)).resolves.toHaveProperty(
    'createdAt'
  );

  await expect(
    client.assignUserIDs([userID(1), userID(2)], firstClusterName)
  ).resolves.toHaveProperty('createdAt');

  const waitAssign = (number: number) => {
    return createRetryablePromise(async retry => {
      try {
        return await client.getUserID(userID(number));
      } catch (e) {
        if (e.status !== 404 || e.message !== 'Mapping does not exist for this userID') {
          throw e;
        }

        return retry();
      }
    });
  };

  await Promise.all([0, 1, 2].map(waitAssign));

  for (let number = 0; number < 3; number++) {
    await expect(client.getUserID(userID(number))).resolves.toMatchObject({
      userID: userID(number),
      clusterName: firstClusterName,
      nbRecords: 0,
      dataSize: 0,
    });
  }

  const searchUserIDsResponses = await Promise.all(
    [0, 1, 2].map(number => client.searchUserIDs(userID(number), { cluster: firstClusterName }))
  );

  [0, 1, 2].forEach(number => {
    expect(searchUserIDsResponses[number].nbHits).toBe(1);
    expect(searchUserIDsResponses[number].page).toBe(0);
    expect(searchUserIDsResponses[number]).toHaveProperty('updatedAt');
    expect(searchUserIDsResponses[number].hits[0].userID).toEqual(userID(number));
    expect(searchUserIDsResponses[number].hits[0].clusterName).toEqual(firstClusterName);
  });

  const listUserIDsResponse = await client.listUserIDs();

  expect(listUserIDsResponse.userIDs.length > 0).toBe(true);
  expect(Object.keys(listUserIDsResponse.userIDs[0])).toEqual([
    'userID',
    'clusterName',
    'nbRecords',
    'dataSize',
  ]);

  await expect(
    client.listUserIDs({
      hitsPerPage: 1,
    })
  ).resolves.toMatchObject({
    hitsPerPage: 1,
    page: 0,
  });

  expect(listUserIDsResponse.userIDs.length > 0).toBe(true);
  expect(Object.keys(listUserIDsResponse.userIDs[0])).toEqual([
    'userID',
    'clusterName',
    'nbRecords',
    'dataSize',
  ]);

  const getTopUserIDsResponse = await client.getTopUserIDs();

  expect(getTopUserIDsResponse.topUsers[firstClusterName].length > 0).toBe(true);
  expect(Object.keys(getTopUserIDsResponse.topUsers[firstClusterName][0])).toEqual([
    'userID',
    'nbRecords',
    'dataSize',
  ]);

  const removeUserID = async (number: number) => {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      try {
        return await client.removeUserID(userID(number));
      } catch (e) {
        if (e.status !== 400 || e.message !== `User '${userID(number)}' is already migrating`) {
          throw e;
        }
      }
    }
  };

  for (let number = 0; number < 3; number++) {
    await expect(removeUserID(number)).resolves.toHaveProperty('deletedAt');
  }

  const waitRemove = (number: number) => {
    return createRetryablePromise(async retry => {
      try {
        await client.getUserID(userID(number));

        return retry();
      } catch (e) {
        if (e.status !== 404) {
          throw e;
        }
      }

      return Promise.resolve();
    });
  };

  await Promise.all([0, 1, 2].map(waitRemove));

  for (let number = 0; number < 3; number++) {
    await expect(client.getUserID(userID(number))).rejects.toMatchObject({
      message: 'Mapping does not exist for this userID',
      name: 'ApiError',
      status: 404,
    });
  }

  await expect(client.hasPendingMappings({ retrieveMappings: true })).resolves.toMatchObject({
    clusters: expect.any(Object),
    pending: expect.any(Boolean),
  });

  await expect(client.hasPendingMappings({ getClusters: true })).resolves.toMatchObject({
    clusters: expect.any(Object),
    pending: expect.any(Boolean),
  });

  /* eslint-disable-next-line jest/valid-expect */
  const assertion = await expect(client.hasPendingMappings()).resolves;

  assertion.toMatchObject({
    pending: expect.any(Boolean),
  });

  assertion.not.toHaveProperty('clusters');
});
