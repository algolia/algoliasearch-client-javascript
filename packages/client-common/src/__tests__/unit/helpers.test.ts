import { addMethods, encode } from '../..';

describe('helpers', () => {
  it('encodes url', () => {
    expect(encode('')).toBe('');

    expect(encode('/1/indexes/test/settings')).toBe('/1/indexes/test/settings');

    expect(encode('/1/indexes/test/task/%s', 123)).toBe('/1/indexes/test/task/123');

    expect(encode('/1/indexes/%s/task/%s', 'index#name', 1234)).toBe(
      '/1/indexes/index%23name/task/1234'
    );

    expect(encode('/1/indexes/%s/batch', '#index name_42#%23')).toBe(
      '/1/indexes/%23index%20name_42%23%2523/batch'
    );
  });

  it('adds objects', () => {
    const client = {
      foo: 'bar',
    };

    const getFoo = (base: typeof client) => {
      return (): string => base.foo;
    };

    const setFoo = (base: typeof client) => {
      return (value: string): void => {
        // eslint-disable-next-line no-param-reassign
        base.foo = value;
      };
    };

    const obj = addMethods(client, { setFoo, getFoo });

    expect(Object.getOwnPropertyNames(obj)).toEqual(['foo', 'setFoo', 'getFoo']);
  });
});
