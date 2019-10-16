import { endpoint } from '../../helpers';

describe('helpers', () => {
  it('encodes url endpoints', () => {
    const encodedString = endpoint('foo/%s/bar/%s', ' 1 ', ' e ');

    expect(encodedString).toBe('foo/%201%20/bar/%20e%20');
  });
});
