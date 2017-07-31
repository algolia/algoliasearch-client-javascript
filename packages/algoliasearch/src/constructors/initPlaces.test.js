import initPlaces from './initPlaces';

const validClientParams = {
  appId: 'some_app',
  apiKey: 'some_key',
};

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
