import { verify, deepEqual, anything, when, mock } from 'ts-mockito';
import { Fixtures, FakeRequester } from '../Fixtures';
import { Transporter } from '@algolia/transporter-types';

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
  });

  it('Uses write default value', async () => {
    await transporter.write(transporterRequest);

    requesterRequest.timeout = 30;
    requesterRequest.url = 'https://write.com/save';
    verify(requester.send(deepEqual(requesterRequest))).once();
  });

  it('Uses overrides read default value with request options', async () => {
    await transporter.read(transporterRequest, { timeout: 5 });

    requesterRequest.timeout = 5;
    requesterRequest.url = 'https://read.com/save';
    verify(requester.send(deepEqual(requesterRequest))).once();
  });

  it('Uses overrides write default value with request options', async () => {
    await transporter.write(transporterRequest, { timeout: 25 });

    requesterRequest.timeout = 25;
    requesterRequest.url = 'https://write.com/save';
    verify(requester.send(deepEqual(requesterRequest))).once();
  });
});
