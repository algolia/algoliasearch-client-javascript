// @flow
import initClient from './initClient';

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

it.skip('client.search() works 🐣', async () => {
  const client = initClient(validClientParams);
  const result = await client.search([
    { query: 'hello world', indexName: 'some_index' },
  ]);
  expect(result).toMatchSnapshot();
});
