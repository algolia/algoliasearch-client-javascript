import { verify, deepEqual, anything, when, mock } from 'ts-mockito';
import { Fixtures, FakeRequester } from '../Fixtures';
import { Transporter, RetryError } from '@algolia/transporter-types';

let requester: FakeRequester;
let transporter: Transporter;

beforeEach(() => {
  requester = mock(FakeRequester);
  transporter = Fixtures.transporter(requester);

  when(requester.send(anything())).thenResolve({
    content: '',
    status: 500,
    isTimedOut: false,
  });
});

const transporterRequest = Fixtures.transporterRequest();
const requesterRequest = Fixtures.requesterRequest();

describe('The selection of hosts', (): void => {
  it('Select only readable hosts when calling the `read` method', done => {
    return transporter
      .read(transporterRequest)
      .then(() => done.fail('This should not happen'))
      .catch(e => {
        expect(e.message).toMatch('Unreachable hosts');

        requesterRequest.timeout = 2;
        requesterRequest.url = 'https://read.com/save';
        verify(requester.send(deepEqual(requesterRequest))).once();

        requesterRequest.url = 'https://write.com/save';
        verify(requester.send(deepEqual(requesterRequest))).never();

        requesterRequest.url = 'https://read-and-write.com/save';
        verify(requester.send(deepEqual(requesterRequest))).once();

        done();
      });
  });

  it('Select only writable hosts when calling the `write` method', done => {
    return transporter
      .write(transporterRequest)
      .then(() => done.fail('This should not happen'))
      .catch(e => {
        expect(e.message).toMatch('Unreachable hosts');

        requesterRequest.timeout = 30;
        requesterRequest.url = 'https://read.com/save';
        verify(requester.send(deepEqual(requesterRequest))).never();

        requesterRequest.url = 'https://write.com/save';
        verify(requester.send(deepEqual(requesterRequest))).once();

        requesterRequest.url = 'https://read-and-write.com/save';
        verify(requester.send(deepEqual(requesterRequest))).once();

        done();
      });
  });
});

describe('The selection timeouts', () => {
  it('Uses read default value', done => {
    return transporter
      .read(transporterRequest)
      .then(() => done.fail('This should not happen'))
      .catch(e => {
        expect(e.message).toMatch('Unreachable hosts');

        requesterRequest.timeout = 2;
        requesterRequest.url = 'https://read.com/save';
        verify(requester.send(deepEqual(requesterRequest))).once();

        done();
      });
  });

  it('Uses write default value', done => {
    return transporter
      .write(transporterRequest)
      .then(() => done.fail('This should not happen'))
      .catch(e => {
        expect(e.message).toMatch('Unreachable hosts');

        requesterRequest.timeout = 30;
        requesterRequest.url = 'https://write.com/save';
        verify(requester.send(deepEqual(requesterRequest))).once();

        done();
      });
  });

  it('Uses overrides read default value with request options', done => {
    return transporter
      .read(transporterRequest, { timeout: 5 })
      .then(() => done.fail('This should not happen'))
      .catch((e: RetryError) => {
        expect(e.message).toMatch('Unreachable hosts');

        requesterRequest.timeout = 5;
        requesterRequest.url = 'https://read.com/save';
        verify(requester.send(deepEqual(requesterRequest))).once();

        done();
      });
  });

  it('Uses overrides write default value with request options', done => {
    return transporter
      .write(transporterRequest, { timeout: 25 })
      .then(() => done.fail('This should not happen'))
      .catch(e => {
        expect(e.message).toMatch('Unreachable hosts');

        requesterRequest.timeout = 25;
        requesterRequest.url = 'https://write.com/save';
        verify(requester.send(deepEqual(requesterRequest))).once();

        done();
      });
  });
});
