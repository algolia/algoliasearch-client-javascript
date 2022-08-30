import type { EchoResponse, EndRequest, Requester, Response } from './types';

export type EchoRequesterParams = {
  getURL: (url: string) => URL;
  status?: number;
};

function getUrlParams({
  host,
  searchParams: urlSearchParams,
  pathname,
}: URL): Pick<EchoResponse, 'algoliaAgent' | 'host' | 'path' | 'searchParams'> {
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
    path: pathname,
  };
}

export function createEchoRequester({
  getURL,
  status = 200,
}: EchoRequesterParams): Requester {
  function send(request: EndRequest): Promise<Response> {
    const { host, searchParams, algoliaAgent, path } = getUrlParams(
      getURL(request.url)
    );

    const content: EchoResponse = {
      ...request,
      data: request.data ? JSON.parse(request.data) : undefined,
      path,
      host,
      algoliaAgent: encodeURIComponent(algoliaAgent),
      searchParams,
    };

    return Promise.resolve({
      content: JSON.stringify(content),
      isTimedOut: false,
      status,
    });
  }

  return { send };
}
