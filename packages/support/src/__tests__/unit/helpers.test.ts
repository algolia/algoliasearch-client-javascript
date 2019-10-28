import { compose, encode } from '../../helpers';

class Client {
  public foo = 'bar';
}

describe('helpers', () => {
  it('encodes url', () => {
    const encodedString = encode('foo/%s/bar/%s', ' 1 ', ' e ');

    expect(encodedString).toBe('foo/%201%20/bar/%20e%20');
  });

  it('composes objects', () => {
    const getFoo = (base: Client) => {
      return {
        ...base,
        getFoo(): string {
          return this.foo;
        },
      };
    };

    const setFoo = (base: Client) => {
      return {
        ...base,
        setFoo(value: string): void {
          this.foo = value;
        },
      };
    };

    const obj = compose(
      new Client(),
      {
        methods: [setFoo, getFoo],
      }
    );

    expect(Object.getOwnPropertyNames(obj)).toEqual(['foo', 'setFoo', 'getFoo']);
  });
});
