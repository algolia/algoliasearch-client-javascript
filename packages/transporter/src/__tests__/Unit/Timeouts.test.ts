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

describe('The selection timeouts', () => {
  it('Uses read default value', done => {
    return transporter
      .read(transporterRequest)
      .then(() => {
        requesterRequest.timeout = 2;
        requesterRequest.url = 'https://read.com/save';
        verify(requester.send(deepEqual(requesterRequest))).once();

        done();
      })
      .catch(e => done.fail(e));
  });

  it('Uses write default value', done => {
    return transporter
      .write(transporterRequest)
      .then(() => {
        requesterRequest.timeout = 30;
        requesterRequest.url = 'https://write.com/save';
        verify(requester.send(deepEqual(requesterRequest))).once();

        done();
      })
      .catch(() => done.fail('This should not happen'));
  });

  it('Uses overrides read default value with request options', done => {
    return transporter
      .read(transporterRequest, { timeout: 5 })
      .then(() => {
        requesterRequest.timeout = 5;
        requesterRequest.url = 'https://read.com/save';
        verify(requester.send(deepEqual(requesterRequest))).once();

        done();
      })
      .catch(e => done.fail(e));
  });

  it('Uses overrides write default value with request options', done => {
    return transporter
      .write(transporterRequest, { timeout: 25 })
      .then(() => {
        requesterRequest.timeout = 25;
        requesterRequest.url = 'https://write.com/save';
        verify(requester.send(deepEqual(requesterRequest))).once();

        done();
      })
      .catch(e => done.fail(e));
  });
});
