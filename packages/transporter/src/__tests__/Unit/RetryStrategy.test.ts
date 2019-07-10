import { Fixtures, FakeRequester } from '../Fixtures';
import { when, anything, verify, mock, deepEqual } from 'ts-mockito';
import { Transporter } from '../../Transporter';

let requester: FakeRequester;
let transporter: Transporter;

beforeEach(() => {
  requester = mock(FakeRequester);
  transporter = Fixtures.transporter(requester);

  when(requester.send(anything())).thenResolve({
    content: '{"hits": [{"name": "Star Wars"}]}',
    status: 200,
    isTimedOut: false,
  });
});

const transporterRequest = Fixtures.transporterRequest();
const requesterRequest = Fixtures.requesterRequest();

describe('The retry strategy', () => {
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
    type SearchResponse = {
      hits: Array<{ name: string }>;
    };

    requesterRequest.timeout = 2;
    requesterRequest.url = 'https://read.com/save';
    when(requester.send(deepEqual(requesterRequest))).thenResolve({
      content: '',
      status: 0,
      isTimedOut: false,
    });

    await transporter.read<SearchResponse>(transporterRequest, {});

    verify(requester.send(anything())).twice();
  });

  it('Retries after a 1xx', async () => {
    type SearchResponse = {
      hits: Array<{ name: string }>;
    };

    requesterRequest.timeout = 2;
    requesterRequest.url = 'https://read.com/save';
    when(requester.send(deepEqual(requesterRequest))).thenResolve({
      content: '',
      status: 101,
      isTimedOut: true,
    });

    await transporter.read<SearchResponse>(transporterRequest, {});

    verify(requester.send(anything())).twice();
  });

  it("Don't retry after a 2xx", async () => {
    type SearchResponse = {
      hits: Array<{ name: string }>;
    };

    const response = await transporter.read<SearchResponse>(
      transporterRequest,
      {}
    );

    expect(response.hits[0].name).toBe('Star Wars');
    verify(requester.send(anything())).once();
  });

  it('Retries after a 3xx', async () => {
    type SearchResponse = {
      hits: Array<{ name: string }>;
    };

    requesterRequest.timeout = 2;
    requesterRequest.url = 'https://read.com/save';
    when(requester.send(deepEqual(requesterRequest))).thenResolve({
      content: '',
      status: 300,
      isTimedOut: true,
    });

    await transporter.read<SearchResponse>(transporterRequest, {});

    verify(requester.send(anything())).twice();
  });

  it('Dont retry after a 4xx', async () => {
    type SearchResponse = {
      hits: Array<{ name: string }>;
    };

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

    expect.assertions(2);

    try {
      await transporter.write<SearchResponse>(transporterRequest, {});
    } catch (reason) {
      verify(requester.send(anything())).once();

      expect(reason.message).toBe('Invalid Application ID');
      expect(reason.status).toBe(404);
    }
  });

  it('Retries after a 5xx', async () => {
    type SearchResponse = {
      hits: Array<{ name: string }>;
    };

    requesterRequest.timeout = 30;
    requesterRequest.url = 'https://write.com/save';
    when(requester.send(deepEqual(requesterRequest))).thenResolve({
      content: '',
      status: 500,
      isTimedOut: true,
    });

    await transporter.write<SearchResponse>(transporterRequest, {});

    verify(requester.send(anything())).twice();
  });
});
