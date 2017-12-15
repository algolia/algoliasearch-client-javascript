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
