import { Requester } from '@algolia/requester-common';
import { anything, deepEqual, spy, verify, when } from 'ts-mockito';

import { createRetryError, Transporter } from '../..';
import { createFakeRequester, createFixtures } from '../fixtures';

let requesterMock: Requester;
let transporter: Transporter;

beforeEach(() => {
  const requester = createFakeRequester();
  requesterMock = spy(requester);
  transporter = createFixtures().transporter(requester);

  when(requesterMock.send(anything())).thenResolve({
    content: '{}',
    status: 500,
    isTimedOut: false,
  });
});

const transporterRequest = createFixtures().transporterRequest();

describe('selection of hosts', (): void => {
  it('select only readable hosts when calling the `read` method', async () => {
    await expect(transporter.read(transporterRequest)).rejects.toContain({
      name: 'RetryError',
      message:
        'Unreachable hosts - your application id may be incorrect. If the error persists, contact support@algolia.com.',
    });

    verify(requesterMock.send(deepEqual(createFixtures().readRequest()))).once();
    verify(requesterMock.send(deepEqual(createFixtures().writeRequest()))).never();
    verify(
      requesterMock.send(
        deepEqual(
          createFixtures().writeAndWriteRequest({
            timeout: 2,
            url: 'https://read-and-write.com/save',
          })
        )
      )
    ).once();
  });

  it('select only writable hosts when calling the `write` method', async () => {
    await expect(transporter.write(transporterRequest)).rejects.toEqual(createRetryError());

    verify(requesterMock.send(deepEqual(createFixtures().readRequest()))).never();
    verify(requesterMock.send(deepEqual(createFixtures().writeRequest()))).once();
    verify(
      requesterMock.send(
        deepEqual(
          createFixtures().writeRequest({
            timeout: 30,
            url: 'https://read-and-write.com/save',
          })
        )
      )
    ).once();
  });
});
