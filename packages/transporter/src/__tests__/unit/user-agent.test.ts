import { createUserAgent } from '../..';

describe('user agent', () => {
  it('contains a default value', () => {
    expect(createUserAgent('1.0.0').value).toEqual('Algolia for JavaScript (1.0.0)');
  });

  it('allows to add other api clients', () => {
    expect(
      createUserAgent('1.0.0').with({
        segment: 'React Native',
        version: '2.0.0',
      }).value
    ).toEqual('Algolia for JavaScript (1.0.0); React Native (2.0.0)');
  });
});
