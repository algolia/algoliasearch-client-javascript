import { RetryError, Transporter } from '@algolia/transporter-types';
import { anything, deepEqual, mock, verify, when } from 'ts-mockito';

import { FakeRequester, Fixtures } from '../Fixtures';

let requester: FakeRequester;
let transporter: Transporter;

beforeEach(() => {
  requester = mock(FakeRequester);
  transporter = Fixtures.transporter(requester);

  when(requester.send(anything())).thenResolve({
    content: '{}',
    status: 200,
    isTimedOut: false,
  });
});

const transporterRequest = Fixtures.transporterRequest();
const requesterRequest = Fixtures.requesterRequest();

describe('The selection timeouts', () => {
  it('Uses read default value', async () => {
    await transporter.read(transporterRequest);

    requesterRequest.timeout = 2;
    requesterRequest.url = 'https://read.com/save';
    verify(requester.send(deepEqual(requesterRequest))).once();
    verify(requester.send(anything())).once();
  });

  it('Uses write default value', async () => {
    await transporter.write(transporterRequest);

    requesterRequest.timeout = 30;
    requesterRequest.url = 'https://write.com/save';
    verify(requester.send(deepEqual(requesterRequest))).once();
    verify(requester.send(anything())).once();
  });

  it('Uses overrides read default value with request options', async () => {
    await transporter.read(transporterRequest, { timeout: 5 });

    requesterRequest.timeout = 5;
    requesterRequest.url = 'https://read.com/save';
    verify(requester.send(deepEqual(requesterRequest))).once();
    verify(requester.send(anything())).once();
  });

  it('Uses overrides write default value with request options', async () => {
    await transporter.write(transporterRequest, { timeout: 25 });

    requesterRequest.timeout = 25;
    requesterRequest.url = 'https://write.com/save';
    verify(requester.send(deepEqual(requesterRequest))).once();
    verify(requester.send(anything())).once();
  });

  it('Increases timeout based on number of retries', async () => {
    requester = mock(FakeRequester);
    transporter = Fixtures.transporter(requester);

    when(requester.send(anything())).thenResolve({
      content: '{}',
      status: 500,
      isTimedOut: true,
    });

    await expect(transporter.read(transporterRequest)).rejects.toEqual(new RetryError());

    requesterRequest.timeout = 2;
    requesterRequest.url = 'https://read.com/save';
    verify(requester.send(deepEqual(requesterRequest))).once();

    requesterRequest.timeout = 4;
    requesterRequest.url = 'https://read-and-write.com/save';
    verify(requester.send(deepEqual(requesterRequest))).once();
    verify(requester.send(anything())).twice();
  });

  it('allows no timeout to be used', async () => {
    requester = mock(FakeRequester);
    transporter = Fixtures.transporter(requester);

    when(requester.send(anything())).thenResolve({
      content: '{}',
      status: 200,
      isTimedOut: false,
    });

    await expect(
      transporter.read(transporterRequest, {
        timeout: 0,
      })
    ).resolves.toEqual({});

    requesterRequest.timeout = 0;
    requesterRequest.url = 'https://read.com/save';
    verify(requester.send(deepEqual(requesterRequest))).once();
  });
});
