import { mapRequestOptions } from '../../..';

describe('RequestOptions implementation', () => {
  it('Has default values', () => {
    const result = mapRequestOptions(undefined);

    expect(result.data).toEqual({});
    expect(result.headers).toEqual({});
    expect(result.queryParameters).toEqual({});
    expect(result.timeout).toEqual(undefined);
  });

  it('Map values', () => {
    const result = mapRequestOptions({
      extra: 'two',
      'another-extra': 'four',
      timeout: 2,
      queryParameters: {
        userId: 'foo',
      },
      headers: {
        'X-Algolia-Foo': 'bar',
      },
    });

    expect(result.data).toEqual({
      extra: 'two',
      'another-extra': 'four',
    });
    expect(result.headers).toEqual({ 'X-Algolia-Foo': 'bar' });
    expect(result.queryParameters).toEqual({
      userId: 'foo',
    });
    expect(result.timeout).toEqual(2);
  });
});
