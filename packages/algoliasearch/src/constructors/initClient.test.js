// @flow
import initClient from './initClient.js';

const validClientParams = {
  appId: 'some_app',
  apiKey: 'some_key',
};

it('initClient throws when it has too little parameters', () => {
  // $FlowFixMe --> type disallows this
  expect(() => initClient({})).toThrow();
  // $FlowFixMe --> type disallows this
  expect(() => initClient({ appId: '' })).toThrowErrorMatchingSnapshot();
  // $FlowFixMe --> type disallows this
  expect(() => initClient({ apiKey: '' })).toThrowErrorMatchingSnapshot();

  expect(() => initClient(validClientParams)).not.toThrow();
});

it('initClient contains the correct methods', () => {
  const client = initClient(validClientParams);
  expect(Object.keys(client)).toMatchSnapshot();
});

it('client.search() works 🐣', async () => {
  const client = initClient(validClientParams);
  const result = await client.search({ requests: { query: 'hello world' } });
  expect(result).toMatchSnapshot();
});

it('allows you to pass a http requester', async () => {
  const httpRequester = jest.fn(() => Promise.resolve({}));
  const client = initClient({ ...validClientParams, httpRequester });
  await client.search({ requests: [] });
  expect(httpRequester).toHaveBeenCalledTimes(1);
});
