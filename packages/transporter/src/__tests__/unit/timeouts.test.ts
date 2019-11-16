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

describe('the timeouts selection', () => {
  it('uses read default value', async () => {
    await transporter.read(transporterRequest);

    verify(requesterMock.send(deepEqual(createFixtures().readRequest()))).once();
    verify(requesterMock.send(anything())).once();
  });

  it('uses write default value', async () => {
    await transporter.write(transporterRequest);
    verify(requesterMock.send(deepEqual(createFixtures().writeRequest()))).once();
    verify(requesterMock.send(anything())).once();
  });

  it('uses overrides read default value with request options', async () => {
    await transporter.read(transporterRequest, { timeout: 5 });

    verify(
      requesterMock.send(
        deepEqual(
          createFixtures().readRequest({
            timeout: 5,
          })
        )
      )
    ).once();
    verify(requesterMock.send(anything())).once();
  });

  it('uses overrides write default value with request options', async () => {
    await transporter.write(transporterRequest, { timeout: 25 });
    verify(
      requesterMock.send(
        deepEqual(
          createFixtures().writeRequest({
            timeout: 25,
          })
        )
      )
    ).once();
    verify(requesterMock.send(anything())).once();
  });

  it('Increases timeout based on number of retries', async () => {
    when(requesterMock.send(anything())).thenResolve({
      content: '{}',
      status: 500,
      isTimedOut: true,
    });

    await expect(transporter.read(transporterRequest)).rejects.toContain({
      name: 'RetryError',
      message:
        'Unreachable hosts - your application id may be incorrect. If the error persists, contact support@algolia.com.',
    });

    verify(requesterMock.send(deepEqual(createFixtures().readRequest()))).once();
    verify(
      requesterMock.send(
        deepEqual(
          createFixtures().readRequest({
            url: 'https://read-and-write.com/save',
            timeout: 4,
          })
        )
      )
    ).once();
    verify(requesterMock.send(anything())).twice();
  });

  it('proxies to default timeout when timeout is 0', async () => {
    when(requesterMock.send(anything())).thenResolve({
      content: '{}',
      status: 200,
      isTimedOut: false,
    });

    await expect(
      transporter.read(transporterRequest, {
        timeout: 0,
      })
    ).resolves.toEqual({});

    verify(requesterMock.send(deepEqual(createFixtures().readRequest()))).once();
  });
});
