import { Requester } from '@algolia/requester-common';
import { anything, deepEqual, spy, verify, when } from 'ts-mockito';

import { createStatefulHost, Transporter } from '../..';
import { createRetryableOptions } from '../../concerns/createRetryableOptions';
import { createStatelessHost } from '../../createStatelessHost';
import { HostStatusEnum } from '../../types';
import { createFakeRequester, createFixtures } from '../fixtures';

let requesterMock: Requester;
let transporter: Transporter;

const transporterRequest = createFixtures().transporterRequest();

const defaultHost = () => Promise.resolve(undefined);

describe('retry strategy', () => {
  beforeEach(() => {
    const requester = createFakeRequester();
    requesterMock = spy(requester);
    transporter = createFixtures().transporter(requester);

    when(requesterMock.send(anything())).thenResolve({
      content: '{"hits": [{"name": "Star Wars"}]}',
      status: 200,
      isTimedOut: false,
    });
  });

  it('retries after a timeout', async () => {
    when(requesterMock.send(deepEqual(createFixtures().writeRequest()))).thenResolve({
      content: '',
      status: 0,
      isTimedOut: true,
    });

    await transporter.write(transporterRequest, {});

    const expectationHost = createStatefulHost(transporter.hosts[1], HostStatusEnum.Timeouted);

    // @ts-ignore
    delete expectationHost.lastUpdate;

    await expect(
      transporter.hostsCache.get<any>(transporter.hosts[1], defaultHost)
    ).resolves.toMatchObject(expectationHost);
    await expect(
      transporter.hostsCache.get<any>(transporter.hosts[0], defaultHost)
    ).resolves.toBeUndefined();
    await expect(
      transporter.hostsCache.get<any>(transporter.hosts[2], defaultHost)
    ).resolves.toBeUndefined();

    verify(requesterMock.send(anything())).twice();
  });

  it('retries after a network error', async () => {
    when(requesterMock.send(deepEqual(createFixtures().readRequest()))).thenResolve({
      content: '',
      status: 0,
      isTimedOut: false,
    });

    await transporter.read(transporterRequest, {});

    verify(requesterMock.send(anything())).twice();

    await expect(
      transporter.hostsCache.get<any>(transporter.hosts[1], defaultHost)
    ).resolves.toBeUndefined();
    await expect(
      transporter.hostsCache.get<any>(transporter.hosts[0], defaultHost)
    ).resolves.toBeTruthy();
    await expect(
      transporter.hostsCache.get<any>(transporter.hosts[2], defaultHost)
    ).resolves.toBeUndefined();
  });

  it('retries after a 1xx', async () => {
    when(requesterMock.send(deepEqual(createFixtures().readRequest()))).thenResolve({
      content: '',
      status: 101,
      isTimedOut: false,
    });

    await transporter.read(transporterRequest);

    verify(requesterMock.send(anything())).twice();

    await expect(
      transporter.hostsCache.get<any>(transporter.hosts[1], defaultHost)
    ).resolves.toBeUndefined();
    await expect(
      transporter.hostsCache.get<any>(transporter.hosts[0], defaultHost)
    ).resolves.toBeTruthy();
    await expect(
      transporter.hostsCache.get<any>(transporter.hosts[2], defaultHost)
    ).resolves.toBeUndefined();
  });

  it('do not retry after a 2xx', async () => {
    type SearchResponse = {
      readonly hits: ReadonlyArray<{ readonly name: string }>;
    };

    const response = await transporter.read<SearchResponse>(transporterRequest, {});

    expect(response.hits[0].name).toBe('Star Wars');
    verify(requesterMock.send(anything())).once();

    await expect(
      transporter.hostsCache.get<any>(transporter.hosts[1], defaultHost)
    ).resolves.toBeUndefined();
    await expect(
      transporter.hostsCache.get<any>(transporter.hosts[0], defaultHost)
    ).resolves.toBeUndefined();
    await expect(
      transporter.hostsCache.get<any>(transporter.hosts[2], defaultHost)
    ).resolves.toBeUndefined();
  });

  it('retries after a 3xx', async () => {
    when(requesterMock.send(deepEqual(createFixtures().readRequest()))).thenResolve({
      content: '',
      status: 300,
      isTimedOut: false,
    });

    await transporter.read(transporterRequest);

    verify(requesterMock.send(anything())).twice();

    await expect(
      transporter.hostsCache.get<any>(transporter.hosts[1], defaultHost)
    ).resolves.toBeUndefined();
    await expect(
      transporter.hostsCache.get<any>(transporter.hosts[0], defaultHost)
    ).resolves.toBeTruthy();
    await expect(
      transporter.hostsCache.get<any>(transporter.hosts[2], defaultHost)
    ).resolves.toBeUndefined();
  });

  it('do not retry after a 4xx', async () => {
    when(requesterMock.send(deepEqual(createFixtures().writeRequest()))).thenResolve({
      content: JSON.stringify({
        message: 'Invalid Application ID',
        status: 404,
      }),
      status: 404,
      isTimedOut: false,
    });

    await expect(transporter.write(transporterRequest)).rejects.toMatchObject({
      name: 'ApiError',
      message: 'Invalid Application ID',
      status: 404,
    });

    verify(requesterMock.send(anything())).once();

    await expect(
      transporter.hostsCache.get<any>(transporter.hosts[1], defaultHost)
    ).resolves.toBeUndefined();
    await expect(
      transporter.hostsCache.get<any>(transporter.hosts[0], defaultHost)
    ).resolves.toBeUndefined();
    await expect(
      transporter.hostsCache.get<any>(transporter.hosts[2], defaultHost)
    ).resolves.toBeUndefined();
  });

  it('retries after a 5xx', async () => {
    when(requesterMock.send(deepEqual(createFixtures().writeRequest()))).thenResolve({
      content: '',
      status: 500,
      isTimedOut: false,
    });

    await transporter.write(transporterRequest, {});

    verify(requesterMock.send(anything())).twice();

    await expect(
      transporter.hostsCache.get<any>(transporter.hosts[1], defaultHost)
    ).resolves.toBeTruthy();
    await expect(
      transporter.hostsCache.get<any>(transporter.hosts[0], defaultHost)
    ).resolves.toBeUndefined();
    await expect(
      transporter.hostsCache.get<any>(transporter.hosts[2], defaultHost)
    ).resolves.toBeUndefined();
  });

  it('takes cache in consideration', async () => {
    when(requesterMock.send(deepEqual(createFixtures().writeRequest()))).thenResolve({
      content: '',
      status: 500,
      isTimedOut: false,
    });

    await transporter.write(transporterRequest, {});

    verify(requesterMock.send(anything())).twice();

    await transporter.write(transporterRequest, {});

    verify(requesterMock.send(anything())).times(3); // +1
  });

  it('respects TTL', async () => {
    // Set one host down.
    await transporter.hostsCache.set(transporter.hosts[0], {
      ...createStatefulHost(transporter.hosts[0], HostStatusEnum.Down),
      lastUpdate: Date.now() - 60 * 2 * 1000 + 10, // should be down
    });

    expect(
      (await createRetryableOptions(transporter.hostsCache, transporter.hosts)).statelessHosts
    ).toHaveLength(2);

    await transporter.hostsCache.set(transporter.hosts[0], {
      ...createStatefulHost(
        createStatelessHost({
          url: 'read.com',
        })
      ),
      lastUpdate: Date.now() - 60 * 2 * 1000 - 20,
    });
    expect(
      (await createRetryableOptions(transporter.hostsCache, transporter.hosts)).statelessHosts
    ).toHaveLength(3);
  });

  it('respests hosts order', async () => {
    // Default
    expect(
      (await createRetryableOptions(transporter.hostsCache, transporter.hosts)).statelessHosts[0]
    ).toEqual(transporter.hosts[0]);

    // Remove one host
    await transporter.hostsCache.set(
      transporter.hosts[0],
      createStatefulHost(transporter.hosts[0], HostStatusEnum.Down)
    );
    expect(
      (await createRetryableOptions(transporter.hostsCache, transporter.hosts)).statelessHosts[0]
    ).toEqual(transporter.hosts[1]);

    expect(
      (await createRetryableOptions(transporter.hostsCache, transporter.hosts)).statelessHosts
    ).toHaveLength(2);

    // Remove all down
    await transporter.hostsCache.set(
      transporter.hosts[1],
      createStatefulHost(transporter.hosts[1], HostStatusEnum.Down)
    );
    await transporter.hostsCache.set(
      transporter.hosts[2],
      createStatefulHost(transporter.hosts[2], HostStatusEnum.Down)
    );
    expect(
      (await createRetryableOptions(transporter.hostsCache, transporter.hosts)).statelessHosts[0]
    ).toEqual(transporter.hosts[0]);
    expect(
      (await createRetryableOptions(transporter.hostsCache, transporter.hosts)).statelessHosts
    ).toHaveLength(3);
  });

  it('gives all hosts when all are down', async () => {
    await transporter.hostsCache.set(
      transporter.hosts[0],
      createStatefulHost(transporter.hosts[0], HostStatusEnum.Down)
    );
    await transporter.hostsCache.set(
      transporter.hosts[1],
      createStatefulHost(transporter.hosts[1], HostStatusEnum.Down)
    );
    await transporter.hostsCache.set(
      transporter.hosts[2],
      createStatefulHost(transporter.hosts[2], HostStatusEnum.Down)
    );

    expect(
      (await createRetryableOptions(transporter.hostsCache, transporter.hosts)).statelessHosts
    ).toHaveLength(3);

    await transporter.hostsCache.set(transporter.hosts[0], {
      ...createStatefulHost(transporter.hosts[0], HostStatusEnum.Down),
      lastUpdate: Date.now() - 60 * 2 * 1000 - 20, // should be up
    });

    expect(
      (await createRetryableOptions(transporter.hostsCache, transporter.hosts)).statelessHosts
    ).toHaveLength(1);

    await transporter.hostsCache.set(
      transporter.hosts[0],
      createStatefulHost(transporter.hosts[0], HostStatusEnum.Timeouted)
    );

    expect(
      (await createRetryableOptions(transporter.hostsCache, transporter.hosts)).statelessHosts
    ).toHaveLength(1);
  });

  it('sets timeouted hosts on the end of the list', async () => {
    await transporter.hostsCache.set(
      transporter.hosts[0],
      createStatefulHost(transporter.hosts[0], HostStatusEnum.Timeouted)
    );

    expect(
      (await createRetryableOptions(transporter.hostsCache, transporter.hosts)).statelessHosts[0]
    ).toEqual(transporter.hosts[1]);
  });
});
