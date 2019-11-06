import { compose, encode } from '../..';

describe('helpers', () => {
  it('encodes url', () => {
    const encodedString = encode('foo/%s/bar/%s', ' 1 ', ' e ');

    expect(encodedString).toBe('foo/%201%20/bar/%20e%20');
  });

  it('composes objects', () => {
    const client = {
      foo: 'bar',
    };

    const getFoo = (base: typeof client) => {
      return {
        ...base,
        getFoo(): string {
          return this.foo;
        },
      };
    };

    const setFoo = (base: typeof client) => {
      return {
        ...base,
        setFoo(value: string): void {
          this.foo = value;
        },
      };
    };

    const obj = compose(
      client,
      {
        methods: [setFoo, getFoo],
      }
    );

    expect(Object.getOwnPropertyNames(obj)).toEqual(['foo', 'setFoo', 'getFoo']);
  });
});
