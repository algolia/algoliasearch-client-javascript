import { InMemoryCache } from '../../InMemoryCache';

describe('in memory cache', () => {
  it('sets/gets values', () => {
    const cache = new InMemoryCache();

    const defaultValue = { bar: 1 };
    expect(cache.get('foo', defaultValue)).toBe(defaultValue);

    cache.set('foo', { foo: 2 });
    expect(cache.get('foo', defaultValue)).toMatchObject({ foo: 2 });
  });

  it('deletes keys', () => {
    const cache = new InMemoryCache();
    cache.set('foo', { bar: 1 });

    cache.delete('foo');

    expect(cache.get('foo', { test: 2 })).toMatchObject({ test: 2 });
  });

  it('allows to be clear', () => {
    const cache = new InMemoryCache();
    cache.set('1', { 'set-1': 1 });
    cache.set('2', { 'set-2': 2 });

    cache.clear();

    expect(cache.get('1', { 'get-1': 1 })).toMatchObject({ 'get-1': 1 });
    expect(cache.get('2', { 'get-2': 2 })).toMatchObject({ 'get-2': 2 });
  });
});
