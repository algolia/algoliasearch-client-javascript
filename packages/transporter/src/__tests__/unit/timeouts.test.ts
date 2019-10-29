import { createTransporter } from '@algolia/transporter';
import { anything, deepEqual, mock, verify, when } from 'ts-mockito';

import { createRetryError } from '../../errors/createRetryError';
import { FakeRequester, Fixtures } from '../Fixtures';

let requester: FakeRequester;
let transporter: ReturnType<typeof createTransporter>;

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

describe('the timeouts selection', () => {
  it('Uses read default value', async () => {
    await transporter.read(transporterRequest);

    verify(requester.send(deepEqual(Fixtures.readRequest()))).once();
    verify(requester.send(anything())).once();
  });

  it('Uses write default value', async () => {
    await transporter.write(transporterRequest);
    verify(requester.send(deepEqual(Fixtures.writeRequest()))).once();
    verify(requester.send(anything())).once();
  });

  it('Uses overrides read default value with request options', async () => {
    await transporter.read(transporterRequest, { timeout: 5 });

    verify(
      requester.send(
        deepEqual(
          Fixtures.readRequest({
            timeout: 5,
          })
        )
      )
    ).once();
    verify(requester.send(anything())).once();
  });

  it('Uses overrides write default value with request options', async () => {
    await transporter.write(transporterRequest, { timeout: 25 });
    verify(
      requester.send(
        deepEqual(
          Fixtures.writeRequest({
            timeout: 25,
          })
        )
      )
    ).once();
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

    await expect(transporter.read(transporterRequest)).rejects.toEqual(createRetryError());

    verify(requester.send(deepEqual(Fixtures.readRequest()))).once();
    verify(
      requester.send(
        deepEqual(
          Fixtures.readRequest({
            url: 'https://read-and-write.com/save',
            timeout: 4,
          })
        )
      )
    ).once();
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

    verify(
      requester.send(
        deepEqual(
          Fixtures.readRequest({
            timeout: 0,
          })
        )
      )
    ).once();
  });
});
