import { initClient } from 'algoliasearch';

// todo: figure out how to avoid running this test in regular mode when destruct
jest.unmock('algoliasearch-http-requester');

it('can initialize a client', () => {
  const client = initClient({
    appId: 'latency',
    apiKey: '6be0576ff61c053d5f9a3225e2a90f76',
  });
  expect(
    client.search({ requests: [{ indexName: 'bestbuy', query: 'a' }] })
  ).resolves.toMatchSnapshot();
});
