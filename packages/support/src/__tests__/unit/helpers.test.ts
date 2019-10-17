import { encode } from '../../helpers';

describe('helpers', () => {
  it('encodes url', () => {
    const encodedString = encode('foo/%s/bar/%s', ' 1 ', ' e ');

    expect(encodedString).toBe('foo/%201%20/bar/%20e%20');
  });
});
