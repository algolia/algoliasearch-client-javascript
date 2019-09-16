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

describe('Usage of query parameters', () => {
  it('allows to set query parameters', async () => {
    transporter.queryParameters = {
      'x-foo': 'foo',
    };

    await transporter.write(transporterRequest);

    requesterRequest.url = 'https://write.com/save?x-foo=foo';
    requesterRequest.timeout = 30;

    verify(requester.send(deepEqual(requesterRequest))).once();
  });

  it('Allows to add query parameters per read/write', async () => {
    await transporter.read(transporterRequest, {
      queryParameters: {
        'x-bar': 'bar',
      },
    });

    requesterRequest.url = 'https://read.com/save?x-bar=bar';
    requesterRequest.timeout = 2;

    verify(requester.send(deepEqual(requesterRequest))).once();
  });

  it('Allows to add query parameters per read/write and override the default ones', async () => {
    await transporter.read(transporterRequest, {
      queryParameters: {
        'x-foo': 'My custom foo',
        'x-bar': 'My custom bar',
      },
    });

    requesterRequest.url = 'https://read.com/save?x-foo=My custom foo&x-bar=My custom bar';
    requesterRequest.timeout = 2;

    verify(requester.send(deepEqual(requesterRequest))).once();
  });
});
