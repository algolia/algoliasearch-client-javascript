import { createMappedRequestOptions } from '../..';

describe('request options', () => {
  it('has default values', () => {
    const result = createMappedRequestOptions(undefined);

    expect(result.data).toEqual(undefined);
    expect(result.headers).toEqual({});
    expect(result.queryParameters).toEqual({});
    expect(result.timeout).toEqual(undefined);
  });

  it('maps request options', () => {
    const result = createMappedRequestOptions({
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

  it('maps request options with data', () => {
    const result = createMappedRequestOptions({
      data: {
        foo: 'bar',
      },
    });

    expect(result.data).toEqual({
      foo: 'bar',
    });
  });

  it('ignores empty data maps', () => {
    const result = createMappedRequestOptions({
      data: {},
    });

    expect(result.data).toBeUndefined();
  });
});
