import { Requester } from '@algolia/requester-common';
import { anything, deepEqual, spy, verify, when } from 'ts-mockito';

import { createApiError, Transporter } from '../..';
import { createFakeRequester, createFixtures } from '../fixtures';

let requesterMock: Requester;
let transporter: Transporter;

const transporterRequest = createFixtures().transporterRequest();

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

    verify(requesterMock.send(anything())).twice();

    expect(transporter.hosts.filter(host => host.isUp())).toHaveLength(3);
  });

  it('retries after a network error', async () => {
    when(requesterMock.send(deepEqual(createFixtures().readRequest()))).thenResolve({
      content: '',
      status: 0,
      isTimedOut: false,
    });

    await transporter.read(transporterRequest, {});

    verify(requesterMock.send(anything())).twice();

    expect(transporter.hosts.filter(host => host.isUp())).toHaveLength(2);
  });

  it('retries after a 1xx', async () => {
    when(requesterMock.send(deepEqual(createFixtures().readRequest()))).thenResolve({
      content: '',
      status: 101,
      isTimedOut: false,
    });

    await transporter.read(transporterRequest);

    verify(requesterMock.send(anything())).twice();

    expect(transporter.hosts.filter(host => host.isUp())).toHaveLength(2);
  });

  it('do not retry after a 2xx', async () => {
    type SearchResponse = {
      readonly hits: ReadonlyArray<{ readonly name: string }>;
    };

    const response = await transporter.read<SearchResponse>(transporterRequest, {});

    expect(response.hits[0].name).toBe('Star Wars');
    verify(requesterMock.send(anything())).once();

    expect(transporter.hosts.filter(host => host.isUp())).toHaveLength(3);
  });

  it('retries after a 3xx', async () => {
    when(requesterMock.send(deepEqual(createFixtures().readRequest()))).thenResolve({
      content: '',
      status: 300,
      isTimedOut: false,
    });

    await transporter.read(transporterRequest);

    verify(requesterMock.send(anything())).twice();

    expect(transporter.hosts.filter(host => host.isUp())).toHaveLength(2);
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

    await expect(transporter.write(transporterRequest)).rejects.toEqual(
      createApiError('Invalid Application ID', 404)
    );

    verify(requesterMock.send(anything())).once();

    expect(transporter.hosts.filter(host => host.isUp())).toHaveLength(3);
  });

  it('retries after a 5xx', async () => {
    when(requesterMock.send(deepEqual(createFixtures().writeRequest()))).thenResolve({
      content: '',
      status: 500,
      isTimedOut: false,
    });

    await transporter.write(transporterRequest, {});

    verify(requesterMock.send(anything())).twice();

    expect(transporter.hosts.filter(host => host.isUp())).toHaveLength(2);
  });
});
