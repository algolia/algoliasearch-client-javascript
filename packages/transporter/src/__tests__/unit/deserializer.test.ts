import { anything, mock, when } from 'ts-mockito';

import { createTransporter } from '../../createTransporter';
import { createApiError } from '../../errors/createApiError';
import { FakeRequester, Fixtures } from '../Fixtures';

let requester: FakeRequester;
let transporter: ReturnType<typeof createTransporter>;

beforeEach(() => {
  requester = mock(FakeRequester);
  transporter = Fixtures.transporter(requester);
});

const transporterRequest = Fixtures.transporterRequest();

describe('The deserializer', () => {
  it('Deserializes success responses', async () => {
    type SearchResponse = {
      readonly hits: ReadonlyArray<{
        readonly name: string;
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

  it('deserializes fail responses', async () => {
    when(requester.send(anything())).thenResolve({
      content: JSON.stringify({ message: 'User not found', status: 404 }),
      status: 404,
      isTimedOut: false,
    });

    await expect(transporter.read(transporterRequest)).rejects.toEqual(
      createApiError('User not found', 404)
    );
  });

  it('Deserializes fail non json responses', async () => {
    when(requester.send(anything())).thenResolve({
      content: 'String message for some reason',
      status: 404,
      isTimedOut: false,
    });

    await expect(transporter.read(transporterRequest)).rejects.toEqual(
      createApiError('String message for some reason', 404)
    );
  });
});
