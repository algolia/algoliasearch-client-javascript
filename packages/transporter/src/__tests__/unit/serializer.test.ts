import { serializeQueryParameters } from '../..';

describe('serializer', () => {
  it('serializes any', () => {
    expect(
      serializeQueryParameters({
        str: 'foo',
        obj: { foo: 1 },
        arr: ['nuno', 'chloe'],
        bool: true,
      })
    ).toEqual('str=foo&obj=%7B%22foo%22%3A1%7D&arr=%5B%22nuno%22%2C%22chloe%22%5D&bool=true');
  });
});
