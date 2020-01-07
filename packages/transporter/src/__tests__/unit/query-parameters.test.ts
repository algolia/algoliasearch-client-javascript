import { Requester } from '@algolia/requester-common';
import { anything, deepEqual, spy, verify, when } from 'ts-mockito';

import { Transporter } from '../..';
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

const transporterRequest = createFixtures().transporterRequest();

describe('usage of query parameters', () => {
  it('allows to set query parameters', async () => {
    Object.assign(transporter.queryParameters, { 'x-foo': 'foo' });

    await transporter.write(transporterRequest);

    verify(
      requesterMock.send(
        deepEqual(
          createFixtures().writeRequest({
            url: 'https://write.com/save?x-foo=foo',
          })
        )
      )
    ).once();
  });

  it('allows to add query parameters per read/write', async () => {
    await transporter.read(transporterRequest, {
      queryParameters: {
        'x-bar': 'bar',
      },
    });

    verify(
      requesterMock.send(
        deepEqual(
          createFixtures().readRequest({
            url: 'https://read.com/save?x-bar=bar',
          })
        )
      )
    ).once();
  });

  it('allows to add query parameters per read/write and override the default ones', async () => {
    await transporter.read(transporterRequest, {
      queryParameters: {
        'x-foo': 'My custom foo',
        'x-bar': 'My custom bar',
      },
    });

    verify(
      requesterMock.send(
        deepEqual(
          createFixtures().readRequest({
            url: 'https://read.com/save?x-foo=My%20custom%20foo&x-bar=My%20custom%20bar',
          })
        )
      )
    ).once();
  });
});
