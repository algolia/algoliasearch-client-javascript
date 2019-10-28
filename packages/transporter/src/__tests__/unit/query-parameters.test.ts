import { anything, deepEqual, mock, verify, when } from 'ts-mockito';

import { Transporter } from '../../Transporter';
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

describe('Usage of query parameters', () => {
  it('allows to set query parameters', async () => {
    transporter.addQueryParameters({ 'x-foo': 'foo' });

    await transporter.write(transporterRequest);

    verify(
      requester.send(
        deepEqual(
          Fixtures.writeRequest({
            url: 'https://write.com/save?x-foo=foo',
          })
        )
      )
    ).once();
  });

  it('allows to add query parameters per read/write', async () => {
    await transporter.read(transporterRequest, {
      queryParameters: {
        'x-bar': 'bar',
      },
    });

    verify(
      requester.send(
        deepEqual(
          Fixtures.readRequest({
            url: 'https://read.com/save?x-bar=bar',
          })
        )
      )
    ).once();
  });

  it('allows to add query parameters per read/write and override the default ones', async () => {
    await transporter.read(transporterRequest, {
      queryParameters: {
        'x-foo': 'My custom foo',
        'x-bar': 'My custom bar',
      },
    });

    verify(
      requester.send(
        deepEqual(
          Fixtures.readRequest({
            url: 'https://read.com/save?x-foo=My%20custom%20foo&x-bar=My%20custom%20bar',
          })
        )
      )
    ).once();
  });
});
