// @flow
import initClient from './initClient';

const validClientParams = {
  appId: 'some_app',
  apiKey: 'some_key',
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
