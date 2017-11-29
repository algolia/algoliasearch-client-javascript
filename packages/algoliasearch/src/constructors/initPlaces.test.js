import initPlaces from './initPlaces';

it('initPlaces throws when it has an appId', () => {
  expect(() => initPlaces()).not.toThrow();
  expect(() => initPlaces({})).not.toThrow();
  expect(() => initPlaces({ appID: 'pl-cool', apiKey: 'key' })).not.toThrow();

  expect(() =>
    initPlaces({ apiKey: 'some_key' })
  ).toThrowErrorMatchingSnapshot();
  expect(() =>
    initPlaces({ appID: 'some_app' })
  ).toThrowErrorMatchingSnapshot();
});

it('initPlaces contains the correct methods', () => {
  const places = initPlaces();
  expect(Object.keys(places)).toMatchSnapshot();
});

it('places.search() works 🐣', async () => {
  const places = initPlaces();
  const result = await places.search({ query: 'hello world' });
  expect(result).toMatchSnapshot();
});
