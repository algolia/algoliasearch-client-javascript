import { Transporter } from '@algolia/transporter-types';
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

describe('The selection of headers', () => {
  it('Allows override default headers', async () => {
    transporter.headers = {
      'X-Algolia-Application-Id': 'foo',
    };

    await transporter.write(transporterRequest);

    requesterRequest.url = 'https://write.com/save';
    requesterRequest.timeout = 30;
    requesterRequest.headers = {
      'X-Algolia-Application-Id': 'foo',
    };

    verify(requester.send(deepEqual(requesterRequest))).once();
  });

  it('Allows to add headers per read/write', async () => {
    await transporter.read(transporterRequest, {
      headers: {
        'X-Algolia-Application-Id': 'foo',
      },
    });

    requesterRequest.url = 'https://read.com/save';
    requesterRequest.timeout = 2;
    requesterRequest.headers = {
      'X-Algolia-Application-Id': 'foo',
      'X-Default-Header': 'Default value',
    };

    verify(requester.send(deepEqual(requesterRequest))).once();
  });

  it('Allows to add headers per read/write and override the default ones', async () => {
    await transporter.read(transporterRequest, {
      headers: {
        'X-Algolia-Application-Id': 'foo',
        'X-Default-Header': 'My custom header',
      },
    });

    requesterRequest.headers = {
      'X-Algolia-Application-Id': 'foo',
      'X-Default-Header': 'My custom header',
    };

    verify(requester.send(deepEqual(requesterRequest))).once();
  });
});
