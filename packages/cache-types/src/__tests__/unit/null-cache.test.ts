import { NullCache } from '../../NullCache';

describe('null cache', () => {
  it('returns default value', () => {
    const cache = new NullCache();

    expect(cache.get('foo', 'bar')).toBe('bar');
  });
});
