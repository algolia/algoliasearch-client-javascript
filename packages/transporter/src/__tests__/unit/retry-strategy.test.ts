import { ApiError } from '@algolia/transporter-types';
import { anything, deepEqual, mock, verify, when } from 'ts-mockito';

import { FakeRequester, Fixtures, TestTransporter } from '../Fixtures';

let requester: FakeRequester;
let transporter: TestTransporter;

const transporterRequest = Fixtures.transporterRequest();
const requesterRequest = Fixtures.requesterRequest();

describe('The retry strategy', () => {
  beforeEach(() => {
    requester = mock(FakeRequester);
    transporter = Fixtures.transporter(requester);

    when(requester.send(anything())).thenResolve({
      content: '{"hits": [{"name": "Star Wars"}]}',
      status: 200,
      isTimedOut: false,
    });
  });

  it('Retries after a timeout', async () => {
    requesterRequest.timeout = 30;
    requesterRequest.url = 'https://write.com/save';

    when(requester.send(deepEqual(requesterRequest))).thenResolve({
      content: '',
      status: 0,
      isTimedOut: true,
    });

    await transporter.write(transporterRequest, {});

    verify(requester.send(anything())).twice();

    expect(transporter._hosts.filter(host => host.isUp())).toHaveLength(3);
  });

  it('Retries after a network error', async () => {
    requesterRequest.timeout = 2;
    requesterRequest.url = 'https://read.com/save';
    when(requester.send(deepEqual(requesterRequest))).thenResolve({
      content: '',
      status: 0,
      isTimedOut: false,
    });

    await transporter.read(transporterRequest, {});

    verify(requester.send(anything())).twice();

    expect(transporter._hosts.filter(host => host.isUp())).toHaveLength(2);
  });

  it('Retries after a 1xx', async () => {
    requesterRequest.timeout = 2;
    requesterRequest.url = 'https://read.com/save';
    when(requester.send(deepEqual(requesterRequest))).thenResolve({
      content: '',
      status: 101,
      isTimedOut: false,
    });

    await transporter.read(transporterRequest);

    verify(requester.send(anything())).twice();

    expect(transporter._hosts.filter(host => host.isUp())).toHaveLength(2);
  });

  it("Don't retry after a 2xx", async () => {
    type SearchResponse = {
      readonly hits: ReadonlyArray<{ readonly name: string }>;
    };

    const response = await transporter.read<SearchResponse>(transporterRequest, {});

    expect(response.hits[0].name).toBe('Star Wars');
    verify(requester.send(anything())).once();

    expect(transporter._hosts.filter(host => host.isUp())).toHaveLength(3);
  });

  it('Retries after a 3xx', async () => {
    requesterRequest.timeout = 2;
    requesterRequest.url = 'https://read.com/save';
    when(requester.send(deepEqual(requesterRequest))).thenResolve({
      content: '',
      status: 300,
      isTimedOut: false,
    });

    await transporter.read(transporterRequest);

    verify(requester.send(anything())).twice();

    expect(transporter._hosts.filter(host => host.isUp())).toHaveLength(2);
  });

  it('Dont retry after a 4xx', async () => {
    requesterRequest.timeout = 30;
    requesterRequest.url = 'https://write.com/save';
    when(requester.send(deepEqual(requesterRequest))).thenResolve({
      content: JSON.stringify({
        message: 'Invalid Application ID',
        status: 404,
      }),
      status: 404,
      isTimedOut: false,
    });

    await expect(transporter.write(transporterRequest)).rejects.toEqual(
      new ApiError('Invalid Application ID', 404)
    );

    verify(requester.send(anything())).once();

    expect(transporter._hosts.filter(host => host.isUp())).toHaveLength(3);
  });

  it('Retries after a 5xx', async () => {
    requesterRequest.timeout = 30;
    requesterRequest.url = 'https://write.com/save';
    when(requester.send(deepEqual(requesterRequest))).thenResolve({
      content: '',
      status: 500,
      isTimedOut: false,
    });

    await transporter.write(transporterRequest, {});

    verify(requester.send(anything())).twice();

    expect(transporter._hosts.filter(host => host.isUp())).toHaveLength(2);
  });
});
