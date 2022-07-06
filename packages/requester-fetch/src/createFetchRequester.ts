import { Request, Requester, Response as AlgoliaResponse } from '@algolia/requester-common';

function isAbortError(error: unknown): boolean {
  return (
    // browser fetch
    (error instanceof DOMException && error.name === 'AbortError') ||
    // node-fetch or undici
    (error instanceof Error && error.name === 'AbortError')
  );
}

function getErrorMessage(error: unknown, abortContent: string): string {
  if (isAbortError(error)) {
    return abortContent;
  } else {
    return error instanceof Error ? error.message : 'Network request failed';
  }
}

export type FetchRequesterOptions = {
  readonly requesterOptions?: RequestInit;
};

export function createFetchRequester({
  requesterOptions = {},
}: FetchRequesterOptions = {}): Requester {
  return {
    async send(request: Request): Promise<Readonly<AlgoliaResponse>> {
      const abortController = new AbortController();
      const signal = abortController.signal;

      const createTimeout = (timeout: number): NodeJS.Timeout => {
        return setTimeout(() => {
          abortController.abort();
        }, timeout * 1000);
      };

      const connectTimeout = createTimeout(request.connectTimeout);

      // eslint-disable-next-line functional/no-let
      let fetchRes: Response;
      // eslint-disable-next-line functional/no-try-statement
      try {
        fetchRes = await fetch(request.url, {
          ...requesterOptions,
          method: request.method,
          headers: {
            ...(requesterOptions.headers || {}),
            ...request.headers,
          },
          body: request.data || null,
          mode: 'cors',
          redirect: 'manual',
          signal,
        });
      } catch (error) {
        return {
          status: 0,
          content: getErrorMessage(error, 'Connection timeout'),
          isTimedOut: isAbortError(error),
        };
      }

      clearTimeout(connectTimeout);

      createTimeout(request.responseTimeout);

      // eslint-disable-next-line functional/no-try-statement
      try {
        const content = await fetchRes.text();

        return {
          content,
          isTimedOut: false,
          status: fetchRes.status,
        };
      } catch (error) {
        return {
          status: 0,
          content: getErrorMessage(error, 'Socket timeout'),
          isTimedOut: isAbortError(error),
        };
      }
    },
  };
}
