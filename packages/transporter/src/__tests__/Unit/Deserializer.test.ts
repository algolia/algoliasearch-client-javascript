import { Fixtures, FakeRequester } from '../Fixtures';
import { when, anything, mock } from 'ts-mockito';
import { Transporter } from '../../Transporter';
import { ApiError } from '@algolia/transporter-types';

let requester: FakeRequester;
let transporter: Transporter;

beforeEach(() => {
  requester = mock(FakeRequester);
  transporter = Fixtures.transporter(requester);
});

const transporterRequest = Fixtures.transporterRequest();

describe('The deserializer', () => {
  it('Deserializes success responses', done => {
    type SearchResponse = {
      hits: Array<{
        name: string;
      }>;
    };

    when(requester.send(anything())).thenResolve({
      content: JSON.stringify({ hits: [{ name: 'Star Wars' }] }),
      status: 200,
      isTimedOut: false,
    });

    return transporter
      .read<SearchResponse>(transporterRequest)
      .then(results => {
        expect(results).toStrictEqual({ hits: [{ name: 'Star Wars' }] });

        done();
      })
      .catch(e => done.fail(e));
  });

  it('Deserializes fail responses', done => {
    when(requester.send(anything())).thenResolve({
      content: JSON.stringify({ message: 'User not found', status: 404 }),
      status: 404,
      isTimedOut: false,
    });

    return transporter
      .read(transporterRequest)
      .then(() => done.fail('This should not happen'))
      .catch((e: ApiError) => {
        expect(e).toStrictEqual({ message: 'User not found', status: 404 });

        done();
      });
  });

  it('Deserializes fail non json responses', done => {
    when(requester.send(anything())).thenResolve({
      content: 'String message for some reason',
      status: 404,
      isTimedOut: false,
    });

    return transporter
      .read(transporterRequest)
      .then(() => done.fail('This should not happen'))
      .catch((e: ApiError) => {
        expect(e).toStrictEqual({
          message: 'String message for some reason',
          status: 404,
          name: ApiError.name,
        });

        done();
      });
  });
});
