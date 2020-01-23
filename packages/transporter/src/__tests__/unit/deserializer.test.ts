import { version } from '@algolia/client-common';
import { Requester } from '@algolia/requester-common';
import { anything, spy, when } from 'ts-mockito';

import { Transporter } from '../..';
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

    await expect(transporter.read(transporterRequest)).rejects.toMatchObject({
      name: 'ApiError',
      message: 'User not found',
      status: 404,
    });
  });

  it('deserializes fail non json responses', async () => {
    when(requesterMock.send(anything())).thenResolve({
      content: 'String message for some reason',
      status: 404,
      isTimedOut: false,
    });

    await expect(transporter.read(transporterRequest)).rejects.toMatchObject({
      name: 'ApiError',
      message: 'String message for some reason',
      status: 404,
    });
  });

  it('includes stack trace', async () => {
    when(requesterMock.send(anything())).thenResolve({
      content: 'Server error',
      status: 404,
      isTimedOut: false,
    });

    await expect(transporter.read(transporterRequest)).rejects.toEqual({
      name: 'ApiError',
      message: 'Server error',
      status: 404,
      transporterStackTrace: [
        {
          host: {
            accept: 1,
            protocol: 'https',
            url: 'read.com',
          },
          request: {
            connectTimeout: 1,
            data: '{}',
            headers: {
              'content-type': 'application/x-www-form-urlencoded',
              'x-algolia-api-key': '*****',
              'x-algolia-application-id': 'appId',
              'x-default-header': 'Default value',
            },
            method: 'POST',
            responseTimeout: 2,
            url: `https://read.com/save?x-algolia-agent=Algolia%20for%20JavaScript%20(${version})%3B%20Browser`,
          },
          response: {
            content: 'Server error',
            isTimedOut: false,
            status: 404,
          },
          triesLeft: 1,
        },
      ],
    });
  });
});
