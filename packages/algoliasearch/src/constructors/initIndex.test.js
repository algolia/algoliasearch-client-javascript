import initIndex from './initIndex';

const validParams = {
  appID: 'some_app',
  apiKey: 'some_key',
  indexName: 'some_index',
};

it('initIndex throws when it has too little parameters', () => {
  expect(() => initIndex({})).toThrow();
  expect(() => initIndex({ appID: '' })).toThrowErrorMatchingSnapshot();
  expect(() => initIndex({ apiKey: '' })).toThrowErrorMatchingSnapshot();
  expect(() =>
    initIndex({ apiKey: '', appID: '' })
  ).toThrowErrorMatchingSnapshot();

  expect(() => initIndex(validParams)).not.toThrow();
});

it('initIndex contains the correct methods', () => {
  const index = initIndex(validParams);
  expect(Object.keys(index)).toMatchSnapshot();
});

it('index.search() works 🐣', async () => {
  const index = initIndex(validParams);
  const result = await index.search({ query: 'hello world' });
  expect(result).toMatchSnapshot();
});
