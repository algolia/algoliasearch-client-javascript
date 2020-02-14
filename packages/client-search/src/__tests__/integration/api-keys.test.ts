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

  const updateApiKeyResponse = await client
    .updateApiKey(addApiKeyResponse.key, {
      maxHitsPerQuery: 42,
      queryParameters: 'typoTolerance=min',
    })
    .wait();

  expect(Object.keys(updateApiKeyResponse)).toEqual(['key', 'updatedAt']);

  const updatedGetApiKeyResponse = await client.getApiKey(addApiKeyResponse.key);
  expect(updatedGetApiKeyResponse).toMatchObject({
    maxHitsPerQuery: 42,
    queryParameters: 'typoTolerance=min',
  });

  const deleteApiKeyResponse = await client.deleteApiKey(addApiKeyResponse.key).wait();
  expect(Object.keys(deleteApiKeyResponse)).toEqual(['deletedAt']);

  await expect(client.getApiKey(addApiKeyResponse.key)).rejects.toMatchObject({
    name: 'ApiError',
    message: 'Key does not exist',
    status: 404,
  });

  const restoreApiKeyResponse = await client.restoreApiKey(addApiKeyResponse.key).wait();
  expect(Object.keys(restoreApiKeyResponse)).toEqual(['createdAt']);

  const restoredGetApiKeyResponse = await client.getApiKey(addApiKeyResponse.key);
  expect(restoredGetApiKeyResponse).toMatchObject({
    maxHitsPerQuery: 42,
    queryParameters: 'typoTolerance=min',
  });

  const deleteAgainApiKeyResponse = await client.deleteApiKey(addApiKeyResponse.key).wait();
  expect(Object.keys(deleteAgainApiKeyResponse)).toEqual(['deletedAt']);
});
