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
    status: 500,
    isTimedOut: false,
  });
});

const transporterRequest = Fixtures.transporterRequest();
const requesterRequest = Fixtures.requesterRequest();

describe('The selection of hosts', (): void => {
  it('Select only readable hosts when calling the `read` method', async () => {
    expect.assertions(1);
    try {
      await transporter.read(transporterRequest);
    } catch (e) {
      expect(e.message).toMatch('Unreachable hosts');

      requesterRequest.timeout = 2;
      requesterRequest.url = 'https://read.com/save';
      verify(requester.send(deepEqual(requesterRequest))).once();

      requesterRequest.url = 'https://write.com/save';
      verify(requester.send(deepEqual(requesterRequest))).never();

      requesterRequest.url = 'https://read-and-write.com/save';
      verify(requester.send(deepEqual(requesterRequest))).once();
    }
  });

  it('Select only writable hosts when calling the `write` method', async () => {
    expect.assertions(1);

    try {
      await transporter.write(transporterRequest);
    } catch (e) {
      expect(e.message).toMatch('Unreachable hosts');

      requesterRequest.timeout = 30;
      requesterRequest.url = 'https://read.com/save';
      verify(requester.send(deepEqual(requesterRequest))).never();

      requesterRequest.url = 'https://write.com/save';
      verify(requester.send(deepEqual(requesterRequest))).once();

      requesterRequest.url = 'https://read-and-write.com/save';
      verify(requester.send(deepEqual(requesterRequest))).once();
    }
  });
});
