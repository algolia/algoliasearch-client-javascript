import { NullCache } from '../../NullCache';

describe('null cache', () => {
  it('does not set value', () => {
    const cache = new NullCache();

    cache.set('key', { foo: 10 });

    const defaultValue = { foo: 12 };

    expect(cache.get('key', defaultValue)).toBe(defaultValue);
  });

  it('returns default value', () => {
    const cache = new NullCache();

    const defaultValue = { foo: 12 };

    expect(cache.get('foo', defaultValue)).toBe(defaultValue);
  });
});
