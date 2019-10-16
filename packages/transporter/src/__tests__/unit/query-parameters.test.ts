import { BrowserXhrRequester } from '@algolia/requester-browser-xhr';
import { Transporter as TransporterContract } from '@algolia/transporter-types';
import { anything, deepEqual, mock, verify, when } from 'ts-mockito';

import { Transporter } from '../../Transporter';
import { FakeRequester, Fixtures } from '../Fixtures';

let requester: FakeRequester;
let transporter: TransporterContract;

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

describe('Usage of query parameters', () => {
  it('allows to created with query parameters', () => {
    const testTransporter = new Transporter({
      timeouts: {
        read: 0,
        write: 0,
      },
      requester: new BrowserXhrRequester(),
      queryParameters: { foo: 'bar' },
    });

    expect(testTransporter).toBeInstanceOf(Transporter);
    expect(testTransporter.queryParameters).toEqual({ foo: 'bar' });
  });

  it('allows to set query parameters', async () => {
    transporter.queryParameters = {
      'x-foo': 'foo',
    };

    await transporter.write(transporterRequest);

    requesterRequest.url = 'https://write.com/save?x-foo=foo';
    requesterRequest.timeout = 30;

    verify(requester.send(deepEqual(requesterRequest))).once();
  });

  it('allows to add query parameters per read/write', async () => {
    await transporter.read(transporterRequest, {
      queryParameters: {
        'x-bar': 'bar',
      },
    });

    requesterRequest.url = 'https://read.com/save?x-bar=bar';
    requesterRequest.timeout = 2;

    verify(requester.send(deepEqual(requesterRequest))).once();
  });

  it('allows to add query parameters per read/write and override the default ones', async () => {
    await transporter.read(transporterRequest, {
      queryParameters: {
        'x-foo': 'My custom foo',
        'x-bar': 'My custom bar',
      },
    });

    requesterRequest.url = 'https://read.com/save?x-foo=My%20custom%20foo&x-bar=My%20custom%20bar';
    requesterRequest.timeout = 2;

    verify(requester.send(deepEqual(requesterRequest))).once();
  });
});
