import { Fixtures, FakeRequester } from '../Fixtures';
import { when, anything, verify, mock, deepEqual } from 'ts-mockito';
import { Host, CallType, Transporter } from '@algolia/transporter-types';

let requester: FakeRequester;
let transporter: Transporter;

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
  });

  it('Retries after a 1xx', async () => {
    requesterRequest.timeout = 2;
    requesterRequest.url = 'https://read.com/save';
    when(requester.send(deepEqual(requesterRequest))).thenResolve({
      content: '',
      status: 101,
      isTimedOut: true,
    });

    await transporter.read(transporterRequest);

    verify(requester.send(anything())).twice();
  });

  it("Don't retry after a 2xx", async () => {
    type SearchResponse = {
      hits: Array<{ name: string }>;
    };

    const response = await transporter.read<SearchResponse>(transporterRequest, {});

    expect(response.hits[0].name).toBe('Star Wars');
    verify(requester.send(anything())).once();
  });

  it('Retries after a 3xx', async () => {
    requesterRequest.timeout = 2;
    requesterRequest.url = 'https://read.com/save';
    when(requester.send(deepEqual(requesterRequest))).thenResolve({
      content: '',
      status: 300,
      isTimedOut: true,
    });

    await transporter.read(transporterRequest);

    verify(requester.send(anything())).twice();
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

    await expect(transporter.write(transporterRequest)).rejects.toEqual({
      message: 'Invalid Application ID',
      status: 404,
    });

    verify(requester.send(anything())).once();
  });

  it('Retries after a 5xx', async () => {
    requesterRequest.timeout = 30;
    requesterRequest.url = 'https://write.com/save';
    when(requester.send(deepEqual(requesterRequest))).thenResolve({
      content: '',
      status: 500,
      isTimedOut: true,
    });

    await transporter.write(transporterRequest, {});

    verify(requester.send(anything())).twice();
  });

  it('Set hosts down on retriable failures', async () => {
    const host = new Host({
      url: 'foo',
      accept: CallType.Write,
    });

    transporter = transporter.withHosts([host]);

    when(requester.send(anything())).thenResolve({
      content: '',
      status: 500,
      isTimedOut: false,
    });

    expect(host.isUp()).toBe(true);
    await expect(transporter.write(transporterRequest, {})).rejects.toEqual({
      message: 'Unreachable hosts',
      name: 'RetryError',
    });
    expect(host.isUp()).toBeFalsy();
  });
});
