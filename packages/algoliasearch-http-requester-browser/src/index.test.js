import httpRequester from './';
import fetchMock from 'jest-fetch-mock';

export const snapshotAll = requests =>
  requests.map(req => expect(req).resolves.toMatchSnapshot());

beforeAll(() => {
  global.fetch = fetchMock;
});

it('most simple search', () => {
  const requests = [
    httpRequester({
      body: {
        requests: {
          query: 'hello world',
        },
      },
      connectTimeout: 1000,
      method: 'POST',
      requestOptions: undefined,
      timeout: 2000,
      url: {
        hostname: 'some_app-dsn.algolia.net',
        pathname: '/1/indexes/*/queriesundefined',
      },
    }),
  ];

  snapshotAll(requests);
});
