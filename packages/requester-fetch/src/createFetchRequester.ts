import type { Response as AlgoliaResponse, EndRequest, Requester } from '@algolia/client-common';

function isAbortError(error: unknown): boolean {
  return error instanceof Error && error.name === 'AbortError';
}

function getErrorMessage(error: unknown, abortContent: string): string {
  if (isAbortError(error)) {
    return abortContent;
  }
  return error instanceof Error ? error.message : 'Network request failed';
}

export type FetchRequesterOptions = {
  readonly requesterOptions?: RequestInit;
};

export function createFetchRequester({ requesterOptions = {} }: FetchRequesterOptions = {}): Requester {
  async function send(request: EndRequest): Promise<AlgoliaResponse> {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const createTimeout = (timeout: number): NodeJS.Timeout => {
      return setTimeout(() => {
        abortController.abort();
      }, timeout);
    };

    const connectTimeout = createTimeout(request.connectTimeout);

    let fetchRes: Response;
    try {
      fetchRes = await fetch(request.url, {
        method: request.method,
        body: request.data || null,
        redirect: 'manual',
        signal,
        ...requesterOptions,
        headers: {
          ...requesterOptions.headers,
          ...request.headers,
        },
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
  }

  return { send };
}
