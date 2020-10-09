import { Requester } from '@algolia/requester-common';
import { anything, deepEqual, spy, verify, when } from 'ts-mockito';

import { CallEnum, createStatelessHost, Transporter } from '../..';
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
    await expect(transporter.read(transporterRequest)).rejects.toMatchObject({
      name: 'RetryError',
    });

    verify(requesterMock.send(deepEqual(createFixtures().readRequest()))).once();
    verify(requesterMock.send(deepEqual(createFixtures().writeRequest()))).never();
    verify(
      requesterMock.send(
        deepEqual(
          createFixtures().readAndWriteRequest({
            responseTimeout: 2,
            url: 'https://read-and-write.com/save',
          })
        )
      )
    ).once();
  });

  it('select only writable hosts when calling the `write` method', async () => {
    await expect(transporter.write(transporterRequest)).rejects.toMatchObject({
      name: 'RetryError',
    });

    verify(requesterMock.send(deepEqual(createFixtures().readRequest()))).never();
    verify(requesterMock.send(deepEqual(createFixtures().writeRequest()))).once();
    verify(
      requesterMock.send(
        deepEqual(
          createFixtures().writeRequest({
            responseTimeout: 30,
            url: 'https://read-and-write.com/save',
          })
        )
      )
    ).once();
  });

  it('defaults to `https` and `any`', () => {
    const host = createStatelessHost({ url: 'foo.com' });

    expect(host).toEqual({
      url: 'foo.com',
      accept: CallEnum.Any,
      protocol: 'https',
    });
  });

  it('allows a string to be passed', () => {
    const host = createStatelessHost('foo.com');

    expect(host).toEqual({
      url: 'foo.com',
      accept: CallEnum.Any,
      protocol: 'https',
    });
  });
});
