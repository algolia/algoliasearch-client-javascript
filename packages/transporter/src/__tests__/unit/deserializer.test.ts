import { Requester } from '@algolia/requester-common';
import { anything, spy, when } from 'ts-mockito';

import { createApiError } from '../../errors/createApiError';
import { Transporter } from '../../types';
import { createFakeRequester, createFixtures } from '../Fixtures';

let requester: Requester;
let transporter: Transporter;

beforeEach(() => {
  requester = spy(createFakeRequester());
  transporter = createFixtures().transporter(requester);
});

const transporterRequest = createFixtures().transporterRequest();

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
