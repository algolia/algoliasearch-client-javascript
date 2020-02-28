import { createRetryablePromise } from '@algolia/client-common';

import { TestSuite } from '../../../../client-common/src/__tests__/TestSuite';

const testSuite = new TestSuite('api_keys');

test(testSuite.testName, async () => {
  const client = testSuite.makeSearchClient();

  const apiKeyOptions = {
    description: 'A description',
    indexes: ['index'],
    maxHitsPerQuery: 1000,
    maxQueriesPerIPPerHour: 1000,
    queryParameters: 'typoTolerance=strict',
    referers: ['referer'],
    validity: 600,
  };

  const addApiKeyResponse = await client.addApiKey(['search'], apiKeyOptions).wait();

  expect(Object.keys(addApiKeyResponse)).toEqual(['key', 'createdAt']);

  const getApiKeyResponse = await client.getApiKey(addApiKeyResponse.key);
  const apiKeyOptionsWithoutValidity = Object.assign({}, apiKeyOptions);
  delete apiKeyOptionsWithoutValidity.validity;

  expect(getApiKeyResponse).toMatchObject(apiKeyOptionsWithoutValidity);
  expect(getApiKeyResponse.value).toEqual(addApiKeyResponse.key);
  expect(getApiKeyResponse.acl).toEqual(['search']);

  const listApiKeysResponse = await client.listApiKeys();
  expect(listApiKeysResponse.keys.length).toBeGreaterThan(0);
  expect(listApiKeysResponse.keys.map(apiKey => apiKey.value)).toContainEqual(
    addApiKeyResponse.key
  );

  await expect(
    client
      .updateApiKey(addApiKeyResponse.key, {
        maxHitsPerQuery: 42,
        queryParameters: 'typoTolerance=min',
      })
      .wait()
  ).resolves.toMatchObject({
    updatedAt: expect.any(String),
    key: addApiKeyResponse.key,
  });

  await expect(client.getApiKey(addApiKeyResponse.key)).resolves.toMatchObject({
    maxHitsPerQuery: 42,
    queryParameters: 'typoTolerance=min',
  });

  await expect(client.deleteApiKey(addApiKeyResponse.key).wait()).resolves.toMatchObject({
    deletedAt: expect.any(String),
  });

  await expect(client.getApiKey(addApiKeyResponse.key)).rejects.toMatchObject({
    name: 'ApiError',
    message: 'Key does not exist',
    status: 404,
  });

  const restoreApiKey = createRetryablePromise(async retry => {
    try {
      return await client.restoreApiKey(addApiKeyResponse.key).wait();
    } catch (e) {
      if (e.message !== 'Key already exists') {
        throw e;
      }

      return retry();
    }
  });

  await expect(restoreApiKey).resolves.toMatchObject({
    createdAt: expect.any(String),
  });

  await expect(client.getApiKey(addApiKeyResponse.key)).resolves.toMatchObject({
    maxHitsPerQuery: 42,
    queryParameters: 'typoTolerance=min',
  });

  await expect(client.deleteApiKey(addApiKeyResponse.key).wait()).resolves.toMatchObject({
    deletedAt: expect.any(String),
  });
});
