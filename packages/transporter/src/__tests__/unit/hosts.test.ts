import { createTransporter } from '@algolia/transporter/createTransporter';
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
    status: 500,
    isTimedOut: false,
  });
});

const transporterRequest = Fixtures.transporterRequest();

describe('The selection of hosts', (): void => {
  it('Select only readable hosts when calling the `read` method', async () => {
    await expect(transporter.read(transporterRequest)).rejects.toEqual(createRetryError());

    verify(requester.send(deepEqual(Fixtures.readRequest()))).once();
    verify(requester.send(deepEqual(Fixtures.writeRequest()))).never();
    verify(
      requester.send(
        deepEqual(
          Fixtures.writeAndWriteRequest({
            timeout: 2,
            url: 'https://read-and-write.com/save',
          })
        )
      )
    ).once();
  });

  it('Select only writable hosts when calling the `write` method', async () => {
    await expect(transporter.write(transporterRequest)).rejects.toEqual(createRetryError());

    verify(requester.send(deepEqual(Fixtures.readRequest()))).never();
    verify(requester.send(deepEqual(Fixtures.writeRequest()))).once();
    verify(
      requester.send(
        deepEqual(
          Fixtures.writeRequest({
            timeout: 30,
            url: 'https://read-and-write.com/save',
          })
        )
      )
    ).once();
  });
});
