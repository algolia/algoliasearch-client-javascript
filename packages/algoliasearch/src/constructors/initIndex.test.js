// @flow
import initIndex from './initIndex';

const validParams = {
  appId: 'some_app',
  apiKey: 'some_key',
  indexName: 'some_index',
};

it('initIndex throws when it has too little parameters', () => {
  // $FlowIssue --> type disallows this
  expect(() => initIndex({})).toThrow();
  // $FlowIssue --> type disallows this
  expect(() => initIndex({ appId: '' })).toThrow();
  // $FlowIssue --> type disallows this
  expect(() => initIndex({ apiKey: '' })).toThrow();
  // $FlowIssue --> type disallows this
  expect(() => initIndex({ apiKey: '', appId: '' })).toThrow();

  expect(() => initIndex(validParams)).not.toThrow();
});

it('initIndex contains the correct methods', () => {
  const index = initIndex(validParams);
  expect(Object.keys(index)).toMatchSnapshot();
});
