// @flow
import { initClient, initIndex, initPlaces } from './';

const validClientParams = {
  appId: 'some_app',
  apiKey: 'some_key',
};
const validIndexParams = {
  appId: 'some_app',
  apiKey: 'some_key',
  indexName: 'some_index',
};

it('initClient throws when it has too little parameters', () => {
  // $FlowIssue --> type disallows this
  expect(() => initClient({})).toThrow();
  // $FlowIssue --> type disallows this
  expect(() => initClient({ appId: '' })).toThrow();
  // $FlowIssue --> type disallows this
  expect(() => initClient({ apiKey: '' })).toThrow();
  expect(() => initClient(validClientParams)).not.toThrow();
});

it('initClient contains the correct methods', () => {
  const client = initClient(validClientParams);
  expect(Object.keys(client)).toMatchSnapshot();
});

it('initIndex throws when it has too little parameters', () => {
  // $FlowIssue --> type disallows this
  expect(() => initIndex({})).toThrow();
  // $FlowIssue --> type disallows this
  expect(() => initIndex({ appId: '' })).toThrow();
  // $FlowIssue --> type disallows this
  expect(() => initIndex({ apiKey: '' })).toThrow();
  // $FlowIssue --> type disallows this
  expect(() => initIndex({ apiKey: '', appId: '' })).toThrow();

  expect(() => initIndex(validIndexParams)).not.toThrow();
});

it('initIndex contains the correct methods', () => {
  const index = initIndex(validIndexParams);
  expect(Object.keys(index)).toMatchSnapshot();
});

it('initPlaces throws when it has too little parameters', () => {
  expect(() => initPlaces()).not.toThrow();
  expect(() => initPlaces({})).not.toThrow();
  expect(() => initPlaces(validClientParams)).not.toThrow();

  expect(() => initPlaces({ appId: 'some_id' })).toThrow();
  expect(() => initPlaces({ apiKey: 'some_key' })).toThrow();
});

it('initPlaces contains the correct methods', () => {
  const index = initPlaces();
  expect(Object.keys(index)).toMatchSnapshot();
});
