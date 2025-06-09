import type { EndRequest, Request, Requester, Response } from '@algolia/client-common';

export type EchoResponse = Omit<EndRequest, 'data'> &
  Pick<Request, 'data' | 'path'> & {
    host: string;
    algoliaAgent: string;
    searchParams?: Record<string, string> | undefined;
  };

type BasicURL = {
  host: string;
  search: string;
  pathname: string;
};

export type EchoRequesterParams = {
  getURL: (url: string) => BasicURL;
  status?: number | undefined;
};

function getUrlParams({
  host,
  search,
  pathname,
}: BasicURL): Pick<EchoResponse, 'algoliaAgent' | 'host' | 'path' | 'searchParams'> {
  const urlSearchParams = search.split('?');
  if (urlSearchParams.length === 1) {
    return {
      host,
      algoliaAgent: '',
      searchParams: undefined,
      path: pathname,
    };
  }

  const splitSearchParams = urlSearchParams[1].split('&');
  let algoliaAgent = '';
  const searchParams: Record<string, string> = {};

  if (splitSearchParams.length > 0) {
    splitSearchParams.forEach((param) => {
      const [key, value] = param.split('=');
      if (key === 'x-algolia-agent') {
        algoliaAgent = value;
        return;
      }

      searchParams[key] = value;
    });
  }

  return {
    host,
    algoliaAgent,
    searchParams: Object.keys(searchParams).length === 0 ? undefined : searchParams,
    path: pathname,
  };
}

export function createEchoRequester({ getURL, status = 200 }: EchoRequesterParams): Requester {
  function send(request: EndRequest): Promise<Response> {
    const { host, searchParams, algoliaAgent, path } = getUrlParams(getURL(request.url));

    const content: EchoResponse = {
      ...request,
      data: request.data ? JSON.parse(request.data) : undefined,
      path,
      host,
      algoliaAgent,
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
