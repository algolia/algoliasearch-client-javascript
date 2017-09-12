import initPlaces from './initPlaces';

it('initPlaces throws when it has an appId', () => {
  expect(() => initPlaces()).not.toThrow();
  expect(() => initPlaces({})).not.toThrow();
  expect(() => initPlaces({ appId: 'pl-cool', apiKey: 'key' })).not.toThrow();

  expect(() =>
    initPlaces({ apiKey: 'some_key' })
  ).toThrowErrorMatchingSnapshot();
  expect(() =>
    initPlaces({ appId: 'some_app' })
  ).toThrowErrorMatchingSnapshot();
});

it('initPlaces contains the correct methods', () => {
  const index = initPlaces();
  expect(Object.keys(index)).toMatchSnapshot();
});
