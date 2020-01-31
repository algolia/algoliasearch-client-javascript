/* eslint sonarjs/cognitive-complexity: 0 */ // --> OFF

import { createRetryablePromise } from '@algolia/client-common';
import { ApiError, Transporter } from '@algolia/transporter';

import { TestSuite } from '../../../../client-common/src/__tests__/TestSuite';

const testSuite = new TestSuite('mcm');

afterAll(() => testSuite.cleanUp());

const createRetryableTransporter = (client: Transporter): Transporter => {
  return new Proxy(client, {
    get(obj: any, method: string) {
      return (...args: any) => {
        return createRetryablePromise(retry => {
          return obj[method](...args).catch((err: ApiError) => {
            if (err.status === 500 && err.message === 'Remote side is unreachable') {
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

  const assignUserIDResponse = await client.assignUserID(userID(0), firstClusterName);
  expect(assignUserIDResponse).toHaveProperty('createdAt');

  const assignUserIDsResponse = await client.assignUserIDs(
    [userID(1), userID(2)],
    firstClusterName
  );

  expect(assignUserIDsResponse).toHaveProperty('createdAt');

  const waitUserID = async (number: number) => {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      try {
        return await client.getUserID(userID(number));
      } catch (e) {
        // @todo Be more specific here.
      }
    }
  };

  for (let number = 0; number < 3; number++) {
    expect(await waitUserID(number)).toMatchObject({
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

  expect(
    await client.listUserIDs({
      hitsPerPage: 1,
    })
  ).toHaveLength(1);

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
        // @todo Be more specific here...
      }
    }
  };

  for (let number = 0; number < 3; number++) {
    expect(await removeUserID(number)).toHaveProperty('deletedAt');
  }

  for (let number = 0; number < 3; number++) {
    await expect(client.getUserID(userID(number))).rejects.toEqual({
      message: 'Mapping does not exist for this userID',
      name: 'ApiError',
      status: 404,
    });
  }
  // @todo remove past users ids.
});
