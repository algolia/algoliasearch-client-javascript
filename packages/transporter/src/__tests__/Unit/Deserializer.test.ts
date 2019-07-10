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
  it('Deserializes success responses', async () => {
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

    const response = await transporter.read<SearchResponse>(transporterRequest);

    expect(response).toStrictEqual({ hits: [{ name: 'Star Wars' }] });
  });

  it('Deserializes fail responses', async () => {
    when(requester.send(anything())).thenResolve({
      content: JSON.stringify({ message: 'User not found', status: 404 }),
      status: 404,
      isTimedOut: false,
    });

    expect.assertions(1);

    try {
      await transporter.read(transporterRequest);
    } catch (e) {
      expect(e).toStrictEqual({ message: 'User not found', status: 404 });
    }
  });

  it('Deserializes fail non json responses', async () => {
    when(requester.send(anything())).thenResolve({
      content: 'String message for some reason',
      status: 404,
      isTimedOut: false,
    });

    expect.assertions(1);

    try {
      await transporter.read(transporterRequest);
    } catch (e) {
      expect(e).toStrictEqual({
        message: 'String message for some reason',
        status: 404,
        name: ApiError.name,
      });
    }
  });
});
