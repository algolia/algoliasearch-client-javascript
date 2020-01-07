import { Requester } from '@algolia/requester-common';
import { anything, deepEqual, spy, verify, when } from 'ts-mockito';

import { createStatefulHost, Transporter } from '../..';
import { createStatelessHost } from '../../createStatelessHost';
import { CallEnum, HostStatusEnum } from '../../types';
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
            responseTimeout: 5,
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
            responseTimeout: 25,
          })
        )
      )
    ).once();
  });

  it('increases timeout based on number of retries', async () => {
    when(requesterMock.send(anything())).thenResolve({
      content: '{}',
      status: 500,
      isTimedOut: true,
    });

    // @ts-ignore
    transporter.hosts = [
      ...transporter.hosts,
      { url: 'another-read-host.com', accept: CallEnum.Read },
    ].map(host => createStatelessHost(host));

    const assertRequest = (request: object) => {
      return verify(requesterMock.send(deepEqual(createFixtures().readRequest(request)))).once();
    };

    // First, let's test that the timeouts increase.
    await expect(transporter.read(transporterRequest)).rejects.toMatchObject({
      name: 'RetryError',
      message:
        'Unreachable hosts - your application id may be incorrect. If the error persists, contact support@algolia.com.',
    });

    assertRequest({
      url: 'https://read.com/save',
      connectTimeout: 1,
      responseTimeout: 2,
    });

    assertRequest({
      url: 'https://read-and-write.com/save',
      connectTimeout: 4,
      responseTimeout: 8,
    });

    assertRequest({
      url: 'https://another-read-host.com/save',
      connectTimeout: 5,
      responseTimeout: 10,
    });

    // Then, let's test that the timeouts are kept on the next search
    await expect(transporter.read(transporterRequest)).rejects.toMatchObject({
      name: 'RetryError',
      message:
        'Unreachable hosts - your application id may be incorrect. If the error persists, contact support@algolia.com.',
    });

    assertRequest({
      url: 'https://read.com/save',
      connectTimeout: 6,
      responseTimeout: 12,
    });

    assertRequest({
      url: 'https://read-and-write.com/save',
      connectTimeout: 7,
      responseTimeout: 14,
    });

    assertRequest({
      url: 'https://another-read-host.com/save',
      connectTimeout: 8,
      responseTimeout: 16,
    });

    // Finally, let's test that the timeouts are not kept if the lastUpdate
    // of the host was long time ago.
    await transporter.hostsCache.set(transporter.hosts[0], {
      ...createStatefulHost(transporter.hosts[0], HostStatusEnum.Timeout),
      lastUpdate: Date.now() - 60 * 2 * 1000 - 20, // should be up now!
    });

    await expect(transporter.read(transporterRequest)).rejects.toMatchObject({
      name: 'RetryError',
      message:
        'Unreachable hosts - your application id may be incorrect. If the error persists, contact support@algolia.com.',
    });

    assertRequest({
      url: 'https://read.com/save',
      connectTimeout: 5,
      responseTimeout: 10,
    });

    assertRequest({
      url: 'https://read-and-write.com/save',
      connectTimeout: 6,
      responseTimeout: 12,
    });

    assertRequest({
      url: 'https://another-read-host.com/save',
      connectTimeout: 7,
      responseTimeout: 14,
    });
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
