import { Requester } from '@algolia/requester-common';
import { anything, deepEqual, spy, verify, when } from 'ts-mockito';

import { serializeQueryParameters, Transporter } from '../..';
import { createFakeRequester, createFixtures } from '../fixtures';

let requesterMock: Requester;
let transporter: Transporter;

beforeEach(() => {
  const requester = createFakeRequester();
  requesterMock = spy(requester);
  transporter = createFixtures().transporter(requester);

  when(requesterMock.send(anything())).thenResolve({
    content: '{}',
    status: 200,
    isTimedOut: false,
  });
});

describe('serializer', () => {
  it('serializes path with / and witout / ', async () => {
    const transporterRequest = createFixtures().transporterRequest();
    await transporter.write(transporterRequest);
    await transporter.write({
      ...transporterRequest,
      path: '/save',
    });

    verify(requesterMock.send(deepEqual(createFixtures().writeRequest()))).twice();
  });

  it('serializes query parameters', () => {
    // @todo change this to an more integration level.
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
