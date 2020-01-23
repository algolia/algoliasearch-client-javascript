import { version } from '@algolia/client-common';
import { createNullLogger, Logger } from '@algolia/logger-common';
import { Requester } from '@algolia/requester-common';
import { anything, deepEqual, spy, verify, when } from 'ts-mockito';

import { Transporter } from '../..';
import { createFakeRequester, createFixtures } from '../fixtures';

let requesterMock: Requester;
let loggerMock: Logger;
let transporter: Transporter;

beforeEach(() => {
  const requester = createFakeRequester();
  requesterMock = spy(requester);

  const logger = createNullLogger();
  loggerMock = spy(logger);

  transporter = createFixtures().transporter(requester, {
    logger,
  });

  when(requesterMock.send(anything())).thenResolve({
    content: 'Internal Error',
    status: 500,
    isTimedOut: false,
  });
});

const transporterRequest = createFixtures().transporterRequest();

describe('transporter stack trace serialization', () => {
  it('removes credentials', async () => {
    const transporterStackTrace = [
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
          content: 'Internal Error',
          isTimedOut: false,
          status: 500,
        },
        triesLeft: 1,
      },
      {
        host: {
          accept: 3,
          protocol: 'https',
          url: 'read-and-write.com',
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
          url: `https://read-and-write.com/save?x-algolia-agent=Algolia%20for%20JavaScript%20(${version})%3B%20Browser`,
        },
        response: {
          content: 'Internal Error',
          isTimedOut: false,
          status: 500,
        },
        triesLeft: 0,
      },
    ];

    await expect(transporter.read(transporterRequest)).rejects.toEqual({
      name: 'RetryError',
      message:
        'Unreachable hosts - your application id may be incorrect. If the error persists, contact support@algolia.com.',
      transporterStackTrace,
    });

    // assert headers did not got mutated
    await expect(transporter.headers).toEqual({
      'content-type': 'application/x-www-form-urlencoded',
      'x-algolia-api-key': 'apiKey',
      'x-algolia-application-id': 'appId',
      'X-Default-Header': 'Default value',
    });

    // assert logger received retriable failures
    await verify(loggerMock.info('Retryable failure', deepEqual(transporterStackTrace[0]))).times(
      1
    );
    await verify(loggerMock.info('Retryable failure', deepEqual(transporterStackTrace[1]))).times(
      1
    );
  });
});
