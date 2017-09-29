// @flow
import initIndex from './initIndex';

const validParams = {
  appId: 'some_app',
  apiKey: 'some_key',
  indexName: 'some_index',
};

it('initIndex throws when it has too little parameters', () => {
  // $FlowFixMe --> type disallows this
  expect(() => initIndex({})).toThrow();
  // $FlowFixMe --> type disallows this
  expect(() => initIndex({ appId: '' })).toThrowErrorMatchingSnapshot();
  // $FlowFixMe --> type disallows this
  expect(() => initIndex({ apiKey: '' })).toThrowErrorMatchingSnapshot();
  // $FlowFixMe --> type disallows this
  expect(() =>
    initIndex({ apiKey: '', appId: '' })
  ).toThrowErrorMatchingSnapshot();

  expect(() => initIndex(validParams)).not.toThrow();
});

it('initIndex contains the correct methods', () => {
  const index = initIndex(validParams);
  expect(Object.keys(index)).toMatchSnapshot();
});

it.skip('index.search() works 🐣', async () => {
  const index = initIndex(validParams);
  const result = await index.search({ query: 'hello world' });
  expect(result).toMatchSnapshot();
});
