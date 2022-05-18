import type { EchoResponse, EndRequest, Request, Response } from './types';

export type UrlParams = {
  host: string;
  algoliaAgent: string;
  searchParams: EchoResponse['searchParams'];
};

export type EchoRequesterParams = {
  getUrlParams: (url: string) => UrlParams;
  status?: number;
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function createEchoRequester({
  getUrlParams,
  status = 200,
}: EchoRequesterParams) {
  function send(
    { headers, url, connectTimeout, responseTimeout }: EndRequest,
    { data, ...originalRequest }: Request
  ): Promise<Response> {
    const { host, searchParams, algoliaAgent } = getUrlParams(url);
    const originalData =
      data && Object.entries(data).length > 0 ? data : undefined;

    return Promise.resolve({
      content: JSON.stringify({
        ...originalRequest,
        host,
        headers,
        connectTimeout,
        responseTimeout,
        algoliaAgent: algoliaAgent ? encodeURI(algoliaAgent) : undefined,
        searchParams,
        data: originalData,
      }),
      isTimedOut: false,
      status,
    });
  }

  return { send };
}
