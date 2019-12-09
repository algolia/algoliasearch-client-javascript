import { createUserAgent } from '../..';

describe('user agent', () => {
  it('contains a default value', () => {
    expect(createUserAgent('1.0.0').value).toEqual('Algolia for JavaScript (1.0.0)');
  });

  it('allows to add other api clients', () => {
    const userAgent = createUserAgent('1.0.0');

    expect(userAgent.value).toEqual('Algolia for JavaScript (1.0.0)');

    expect(
      userAgent.add({
        segment: 'JS Helper',
        version: '2.0.0',
      }).value
    ).toEqual('Algolia for JavaScript (1.0.0); JS Helper (2.0.0)');

    expect(userAgent.value).toEqual('Algolia for JavaScript (1.0.0); JS Helper (2.0.0)');

    expect(
      userAgent.add({
        segment: 'React Native (3.0.0)',
      }).value
    ).toEqual('Algolia for JavaScript (1.0.0); JS Helper (2.0.0); React Native (3.0.0)');

    expect(userAgent.value).toEqual(
      'Algolia for JavaScript (1.0.0); JS Helper (2.0.0); React Native (3.0.0)'
    );
  });

  it('is idempotent', () => {
    const userAgent = createUserAgent('1.0.0');

    expect(
      userAgent.add({
        segment: 'React Native (3.0.0)',
      }).value
    ).toEqual('Algolia for JavaScript (1.0.0); React Native (3.0.0)');

    expect(
      userAgent.add({
        segment: 'React Native',
        version: '3.0.0',
      }).value
    ).toEqual('Algolia for JavaScript (1.0.0); React Native (3.0.0)');
  });
});
