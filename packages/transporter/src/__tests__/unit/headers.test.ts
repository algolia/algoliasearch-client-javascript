import { Transporter } from '@algolia/transporter';
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

describe('The selection of headers', () => {
  it('Allows add extra headers', async () => {
    transporter.addHeaders({
      'X-Algolia-Application-Id': 'foo',
    });

    await transporter.write(transporterRequest);

    verify(
      requester.send(
        deepEqual(
          Fixtures.writeRequest({
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
          Fixtures.readRequest({
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
          Fixtures.readRequest({
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
