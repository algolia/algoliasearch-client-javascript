import { Fixtures, FakeRequester } from '../Fixtures';
import { when, anything, verify, mock, deepEqual } from 'ts-mockito';
import { Transporter } from '../../Transporter';

let requester: FakeRequester;
let transporter: Transporter;

beforeEach(() => {
  requester = mock(FakeRequester);
  transporter = Fixtures.transporter(requester);

  when(requester.send(anything())).thenResolve({
    content: '{"hits": [{"name": "Star Wars"}]}',
    status: 200,
    isTimedOut: false,
  });
});

const transporterRequest = Fixtures.transporterRequest();
const requesterRequest = Fixtures.requesterRequest();

describe('The retry strategy', () => {
  it('Retries after a timeout', done => {
    requesterRequest.timeout = 30;
    requesterRequest.url = 'https://write.com/save';

    when(requester.send(deepEqual(requesterRequest))).thenResolve({
      content: '',
      status: 0,
      isTimedOut: true,
    });

    return transporter.write(transporterRequest, {}).then(() => {
      verify(requester.send(anything())).twice();
      done();
    });
  });

  it('Retries after a network error', done => {
    type SearchResponse = {
      hits: Array<{ name: string }>;
    };

    requesterRequest.timeout = 2;
    requesterRequest.url = 'https://read.com/save';
    when(requester.send(deepEqual(requesterRequest))).thenResolve({
      content: '',
      status: 0,
      isTimedOut: false,
    });

    return transporter
      .read<SearchResponse>(transporterRequest, {})
      .then(() => {
        verify(requester.send(anything())).twice();
        done();
      })
      .catch(e => done.fail(e));
  });

  it('Retries after a 1xx', done => {
    type SearchResponse = {
      hits: Array<{ name: string }>;
    };

    requesterRequest.timeout = 2;
    requesterRequest.url = 'https://read.com/save';
    when(requester.send(deepEqual(requesterRequest))).thenResolve({
      content: '',
      status: 101,
      isTimedOut: true,
    });

    return transporter
      .read<SearchResponse>(transporterRequest, {})
      .then(() => {
        verify(requester.send(anything())).twice();
        done();
      })
      .catch(e => done.fail(e));
  });

  it("Don't retry after a 2xx", done => {
    type SearchResponse = {
      hits: Array<{ name: string }>;
    };

    return transporter
      .read<SearchResponse>(transporterRequest, {})
      .then(res => {
        expect(res.hits[0].name).toBe('Star Wars');
        verify(requester.send(anything())).once();
        done();
      })
      .catch(e => done.fail(e));
  });

  it('Retries after a 3xx', done => {
    type SearchResponse = {
      hits: Array<{ name: string }>;
    };

    requesterRequest.timeout = 2;
    requesterRequest.url = 'https://read.com/save';
    when(requester.send(deepEqual(requesterRequest))).thenResolve({
      content: '',
      status: 300,
      isTimedOut: true,
    });

    return transporter
      .read<SearchResponse>(transporterRequest, {})
      .then(() => {
        verify(requester.send(anything())).twice();

        done();
      })
      .catch(e => done.fail(e));
  });

  it('Dont retry after a 4xx', done => {
    type SearchResponse = {
      hits: Array<{ name: string }>;
    };

    requesterRequest.timeout = 30;
    requesterRequest.url = 'https://write.com/save';
    when(requester.send(deepEqual(requesterRequest))).thenResolve({
      content: JSON.stringify({
        message: 'Invalid Application ID',
        status: 404,
      }),
      status: 404,
      isTimedOut: false,
    });

    type Reason = {
      message: string;
      status: number;
    };

    return transporter
      .write<SearchResponse>(transporterRequest, {})
      .then(() => done.fail('This should not happen.'))
      .catch((reason: Reason) => {
        verify(requester.send(anything())).once();

        expect(reason.message).toBe('Invalid Application ID');
        expect(reason.status).toBe(404);

        done();
      });
  });

  it('Retries after a 5xx', done => {
    type SearchResponse = {
      hits: Array<{ name: string }>;
    };

    requesterRequest.timeout = 30;
    requesterRequest.url = 'https://write.com/save';
    when(requester.send(deepEqual(requesterRequest))).thenResolve({
      content: '',
      status: 500,
      isTimedOut: true,
    });

    return transporter
      .write<SearchResponse>(transporterRequest, {})
      .then(() => {
        verify(requester.send(anything())).twice();
        done();
      })
      .catch(e => done.fail(e));
  });
});
