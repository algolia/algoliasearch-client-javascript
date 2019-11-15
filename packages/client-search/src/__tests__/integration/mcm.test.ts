import { TestSuite } from '../../../../client-common/src/__tests__/TestSuite';

const testSuite = new TestSuite('mcm');

afterAll(() => testSuite.cleanUp());

test(testSuite.testName, async () => {
  const client = testSuite.makeSearchClient('ALGOLIA_APPLICATION_ID_MCM', 'ALGOLIA_ADMIN_KEY_MCM');
  const response = await client.listClusters();
  expect(response.clusters).toHaveLength(2);
  const prefix = testSuite.makeIndexName();
  const firstClusterName = response.clusters[0].clusterName;
  const userId = (number: number) =>
    `${prefix}-${number}`
      .replace(/_/g, '-')
      .replace(/:/g, '-')
      .replace(/\./g, '-');

  const assignUserIDResponse = await client.assignUserID(userId(0), firstClusterName);
  expect(assignUserIDResponse).toHaveProperty('createdAt');

  const assignUserIDsResponse = await client.assignUserIDs(
    [userId(1), userId(2)],
    firstClusterName
  );
  expect(assignUserIDsResponse).toHaveProperty('createdAt');

  const waitUserID = async (number: number) => {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      try {
        return await client.getUserID(userId(number));
      } catch (e) {
        if (e.status !== 404 && e.message !== 'Mapping does not exist for this userID') {
          throw e;
        }
      }
    }
  };

  const getUserIDResponses = await Promise.all([0, 1, 2].map(number => waitUserID(number)));
  expect(getUserIDResponses).toHaveLength(3);
  [0, 1, 2].forEach(number => {
    expect(getUserIDResponses[number].userID).toBe(userId(number));
    expect(getUserIDResponses[number].clusterName).toBe(firstClusterName);
    expect(getUserIDResponses[number].nbRecords).toBe(0);
    expect(getUserIDResponses[number].dataSize).toBe(0);
  });

  const searchUserIDsResponses = await Promise.all(
    [0, 1, 2].map(number => client.searchUserIDs(userId(number), { cluster: firstClusterName }))
  );

  [0, 1, 2].forEach(number => {
    expect(searchUserIDsResponses[number].nbHits).toBe(1);
    expect(searchUserIDsResponses[number].page).toBe(0);
    expect(searchUserIDsResponses[number]).toHaveProperty('updatedAt');
    expect(searchUserIDsResponses[number].hits[0].clusterName).toEqual(firstClusterName);
  });
});
