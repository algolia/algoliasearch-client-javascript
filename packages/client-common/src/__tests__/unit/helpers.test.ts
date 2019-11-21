import { addMethods, encode } from '../..';

describe('helpers', () => {
  it('encodes url', () => {
    const encodedString = encode('foo/%s/bar/%s', ' 1 ', ' e ');

    expect(encodedString).toBe('foo/%201%20/bar/%20e%20');
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
