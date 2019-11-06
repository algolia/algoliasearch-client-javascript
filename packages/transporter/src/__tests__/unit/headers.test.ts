import { Requester } from '@algolia/requester-common';
import { anything, deepEqual, spy, verify, when } from 'ts-mockito';

import { Transporter } from '../..';
import { createFakeRequester, createFixtures } from '../fixtures';

let requester: Requester;
let transporter: Transporter;

beforeEach(() => {
  const instance = createFakeRequester();
  requester = spy(instance);
  transporter = createFixtures().transporter(instance);

  when(requester.send(anything())).thenResolve({
    content: '{}',
    status: 200,
    isTimedOut: false,
  });
});

const transporterRequest = createFixtures().transporterRequest();

describe('The selection of headers', () => {
  it('Allows add extra headers', async () => {
    transporter.addHeaders({
      'X-Algolia-Application-Id': 'foo',
    });

    await transporter.write(transporterRequest);

    verify(
      requester.send(
        deepEqual(
          createFixtures().writeRequest({
            headers: {
              'X-Default-Header': 'Default value',
              'X-Algolia-Application-Id': 'foo',
            },
          })
        )
      )
    ).once();
  });

  it('Allows to add headers per read/write', async () => {
    await transporter.read(transporterRequest, {
      headers: {
        'X-Algolia-Application-Id': 'foo',
      },
    });

    verify(
      requester.send(
        deepEqual(
          createFixtures().readRequest({
            headers: {
              'X-Algolia-Application-Id': 'foo',
              'X-Default-Header': 'Default value',
            },
          })
        )
      )
    ).once();
  });

  it('Allows to add headers per read/write and override the default ones', async () => {
    await transporter.read(transporterRequest, {
      headers: {
        'X-Algolia-Application-Id': 'foo',
        'X-Default-Header': 'My custom header',
      },
    });

    verify(
      requester.send(
        deepEqual(
          createFixtures().readRequest({
            headers: {
              'X-Algolia-Application-Id': 'foo',
              'X-Default-Header': 'My custom header',
            },
          })
        )
      )
    ).once();
  });
});
