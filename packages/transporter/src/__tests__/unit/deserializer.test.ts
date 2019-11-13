import { Requester } from '@algolia/requester-common';
import { anything, spy, when } from 'ts-mockito';

import { createApiError, Transporter } from '../..';
import { createFakeRequester, createFixtures } from '../fixtures';

let requesterMock: Requester;
let transporter: Transporter;

beforeEach(() => {
  const requester = createFakeRequester();
  requesterMock = spy(requester);
  transporter = createFixtures().transporter(requester);
});

const transporterRequest = createFixtures().transporterRequest();

describe('deserializer', () => {
  it('deserializes success responses', async () => {
    type SearchResponse = {
      readonly hits: ReadonlyArray<{
        readonly name: string;
      }>;
    };

    when(requesterMock.send(anything())).thenResolve({
      content: JSON.stringify({ hits: [{ name: 'Star Wars' }] }),
      status: 200,
      isTimedOut: false,
    });

    const response = await transporter.read<SearchResponse>(transporterRequest);

    expect(response).toStrictEqual({ hits: [{ name: 'Star Wars' }] });
  });

  it('handles deserialization errors', async () => {
    when(requesterMock.send(anything())).thenResolve({
      content: 'Non json string',
      status: 200,
      isTimedOut: false,
    });

    await expect(transporter.read(transporterRequest)).rejects.toEqual({
      name: 'DeserializationError',
      message: 'Unexpected token N in JSON at position 0',
      response: {
        content: 'Non json string',
        status: 200,
        isTimedOut: false,
      },
    });
  });

  it('deserializes fail responses', async () => {
    when(requesterMock.send(anything())).thenResolve({
      content: JSON.stringify({ message: 'User not found', status: 404 }),
      status: 404,
      isTimedOut: false,
    });

    await expect(transporter.read(transporterRequest)).rejects.toEqual(
      createApiError('User not found', 404)
    );
  });

  it('deserializes fail non json responses', async () => {
    when(requesterMock.send(anything())).thenResolve({
      content: 'String message for some reason',
      status: 404,
      isTimedOut: false,
    });

    await expect(transporter.read(transporterRequest)).rejects.toEqual(
      createApiError('String message for some reason', 404)
    );
  });
});
