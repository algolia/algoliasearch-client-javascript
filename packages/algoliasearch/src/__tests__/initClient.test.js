import { initClient } from '../';

const validParams = { appId: '', apiKey: '' };

it('throws when it has too little parameters', () => {
  expect(() => initClient({})).toThrow();
  expect(() => initClient({ appId: '' })).toThrow();
  expect(() => initClient({ apiKey: '' })).toThrow();
});

it('contains the correct methods', () => {
  const client = initClient(validParams);
  expect(Object.keys(client)).toMatchSnapshot();
});

it('has the correct API calls for each method', () => {
  const fakeRequest = o => o;
  const client = initClient(validParams);
  const methods = Object.keys(client);

  const results = methods.reduce(
    (acc, method) => ({
      ...acc,
      [method]: client[method](fakeRequest),
    }),
    {}
  );

  expect(results).toMatchSnapshot();
});
