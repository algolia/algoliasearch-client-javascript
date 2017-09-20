import createStore, { createMemoryStore } from './';

it('will error without namespace', () => {
  expect(() => createStore()).toThrowErrorMatchingSnapshot();
  expect(() => createStore('')).toThrowErrorMatchingSnapshot();
  expect(() => createStore(5)).toThrowErrorMatchingSnapshot();
});

it('has the correct methods', () => {
  expect(createStore('algolia-js-client-0')).toMatchSnapshot();
});

it('Detects localStorage availability', () => {
  const store = createStore('algolia-js-client-1');

  expect(store.supportsLocalStorage()).toBe(false);
});

it('sets then gets', () => {
  const store = createStore('algolia-js-client-2');

  const data = { someData: true };
  expect(store.set('key', data)).toEqual(data);

  expect(store.get('key')).toEqual(data);
});

it('clears completely on clear()', () => {
  const store = createStore('algolia-js-client-3');

  const data = { cool: true, data: false };

  expect(store.set('the_key', data)).toEqual(data);

  expect(store.clear()).toEqual({});

  expect(store.get('the_key')).toBeUndefined();
});

describe('localStorage works', () => {
  beforeAll(() => {
    let state = {};
    global.localStorage = {
      getItem: jest.fn(key => state[key]),
      setItem: jest.fn((key, value) => {
        state[key] = value;
        return state[key];
      }),
      removeItem: jest.fn(() => {
        state = {};
        return state;
      }),
    };
  });

  it('Detects localStorage availability', () => {
    const store = createStore('algolia-js-client-4');

    expect(store.supportsLocalStorage()).toBe(true);
  });

  it('sets then gets', () => {
    const store = createStore('algolia-js-client-5');

    const data = { someData: true };
    expect(store.set('key', data)).toEqual(data);

    expect(store.get('key')).toEqual(data);
  });

  it('sets to localStorage', () => {
    const store = createStore('algolia-js-client-6');

    const data = { weirdData: true };
    expect(store.set('otherKey', data)).toEqual(data);

    expect(
      JSON.parse(global.localStorage.getItem('algolia-js-client-6')).otherKey
    ).toEqual(data);
  });

  it('clears completely on clear()', () => {
    const store = createStore('algolia-js-client-7');

    const data = { cool: true, data: false };

    expect(store.set('super_key', data)).toEqual(data);

    expect(store.clear()).toEqual({});

    expect(store.get('super_key')).toBeUndefined();

    expect(
      global.localStorage.getItem('algolia-js-client-7')
    ).toMatchSnapshot();
  });
});

describe('memory-only store', () => {
  it('has the correct methods', () => {
    expect(createMemoryStore()).toMatchSnapshot();
  });

  it('sets then gets', () => {
    const store = createMemoryStore();

    const data = { someData: true };
    expect(store.set('key', data)).toEqual(data);

    expect(store.get('key')).toEqual(data);
  });

  it('clears completely on clear()', () => {
    const store = createMemoryStore();

    const data = { cool: true, data: false };

    expect(store.set('the_key', data)).toEqual(data);

    expect(store.clear()).toEqual({});

    expect(store.get('the_key')).toBeUndefined();
  });
});
