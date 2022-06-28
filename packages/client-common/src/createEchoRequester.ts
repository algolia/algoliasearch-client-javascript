import type { EchoResponse, EndRequest, Request, Response } from './types';

export type EchoRequesterParams = {
  getURL: (url: string) => URL;
  status?: number;
};

function getUrlParams({
  host,
  searchParams: urlSearchParams,
}: URL): Pick<EchoResponse, 'algoliaAgent' | 'host' | 'searchParams'> {
  const algoliaAgent = urlSearchParams.get('x-algolia-agent') || '';
  const searchParams = {};

  for (const [k, v] of urlSearchParams) {
    if (k === 'x-algolia-agent') {
      continue;
    }

    searchParams[k] = v;
  }

  return {
    host,
    algoliaAgent,
    searchParams:
      Object.keys(searchParams).length === 0 ? undefined : searchParams,
  };
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function createEchoRequester({
  getURL,
  status = 200,
}: EchoRequesterParams) {
  function send(
    { headers, url, connectTimeout, responseTimeout }: EndRequest,
    { data, ...originalRequest }: Request
  ): Promise<Response> {
    const { host, searchParams, algoliaAgent } = getUrlParams(getURL(url));
    const originalData =
      data && Object.keys(data).length > 0 ? data : undefined;

    return Promise.resolve({
      content: JSON.stringify({
        ...originalRequest,
        host,
        headers,
        connectTimeout,
        responseTimeout,
        algoliaAgent: encodeURI(algoliaAgent),
        searchParams,
        data: originalData,
      }),
      isTimedOut: false,
      status,
    });
  }

  return { send };
}

export type EchoRequester = ReturnType<typeof createEchoRequester>;
