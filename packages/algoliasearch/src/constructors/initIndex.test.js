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
  expect(() => initIndex({ appId: '' })).toThrow();
  // $FlowFixMe --> type disallows this
  expect(() => initIndex({ apiKey: '' })).toThrow();
  // $FlowFixMe --> type disallows this
  expect(() => initIndex({ apiKey: '', appId: '' })).toThrow();

  expect(() => initIndex(validParams)).not.toThrow();
});

it('initIndex contains the correct methods', () => {
  const index = initIndex(validParams);
  expect(Object.keys(index)).toMatchSnapshot();
});
