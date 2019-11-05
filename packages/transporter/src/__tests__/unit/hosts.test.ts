import { Requester } from '@algolia/requester-common';
import { anything, deepEqual, spy, verify, when } from 'ts-mockito';

import { createRetryError } from '../../errors/createRetryError';
import { Transporter } from '../../types';
import { createFakeRequester, createFixtures } from '../Fixtures';

let requester: Requester;
let transporter: Transporter;

beforeEach(() => {
  requester = spy(createFakeRequester());
  transporter = createFixtures().transporter(requester);

  when(requester.send(anything())).thenResolve({
    content: '{}',
    status: 500,
    isTimedOut: false,
  });
});

const transporterRequest = createFixtures().transporterRequest();

describe('The selection of hosts', (): void => {
  it('Select only readable hosts when calling the `read` method', async () => {
    await expect(transporter.read(transporterRequest)).rejects.toEqual(createRetryError());

    verify(requester.send(deepEqual(createFixtures().readRequest()))).once();
    verify(requester.send(deepEqual(createFixtures().writeRequest()))).never();
    verify(
      requester.send(
        deepEqual(
          createFixtures().writeAndWriteRequest({
            timeout: 2,
            url: 'https://read-and-write.com/save',
          })
        )
      )
    ).once();
  });

  it('Select only writable hosts when calling the `write` method', async () => {
    await expect(transporter.write(transporterRequest)).rejects.toEqual(createRetryError());

    verify(requester.send(deepEqual(createFixtures().readRequest()))).never();
    verify(requester.send(deepEqual(createFixtures().writeRequest()))).once();
    verify(
      requester.send(
        deepEqual(
          createFixtures().writeRequest({
            timeout: 30,
            url: 'https://read-and-write.com/save',
          })
        )
      )
    ).once();
  });
});
