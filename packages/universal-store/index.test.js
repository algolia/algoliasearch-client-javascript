import createStore from './';

it('will error without namespace', () => {
  expect(() => createStore()).toThrowErrorMatchingSnapshot();
  expect(() => createStore('')).toThrowErrorMatchingSnapshot();
  expect(() => createStore(5)).toThrowErrorMatchingSnapshot();
});

it('has the correct methods', () => {
  expect(createStore('algolia-js-client')).toMatchSnapshot();
});

it('Detects sessionStorage availability', () => {
  const store = createStore('algolia-js-client');

  expect(store.supportsSessionStorage('client')).toBe(false);
});

it('sets then gets', () => {
  const store = createStore('algolia-js-client');

  const data = { someData: true };
  expect(store.set('key', data)).toMatchObject(data);

  expect(store.get('key')).toMatchObject(data);
});

describe('sessionStorage works', () => {
  beforeAll(() => {
    const state = {};
    global.sessionStorage = {
      getItem: jest.fn(key => state[key]),
      setItem: jest.fn((key, value) => {
        state[key] = value;
        return state[key];
      }),
    };
  });

  it('Detects sessionStorage availability', () => {
    const store = createStore('algolia-js-client');

    expect(store.supportsSessionStorage('client')).toBe(true);
  });

  it('sets then gets', () => {
    const store = createStore('algolia-js-client');

    const data = { someData: true };
    expect(store.set('key', data)).toMatchObject(data);

    expect(store.get('key')).toMatchObject(data);
  });

  it('sets to sessionStorage', () => {
    const store = createStore('algolia-js-client');

    const data = { weirdData: true };
    expect(store.set('otherKey', data)).toMatchObject(data);

    expect(
      JSON.parse(global.sessionStorage.getItem('algolia-js-client')).otherKey
    ).toMatchObject(data);
  });
});
