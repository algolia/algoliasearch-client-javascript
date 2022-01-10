import type { EndRequest, Request, Response } from '../types';

import { Requester } from './Requester';

type AdditionalContent = {
  headers: Record<string, string>;
  connectTimeout: number;
  responseTimeout: number;
  userAgent?: string;
  searchParams?: Record<string, any>;
};

function searchParamsWithoutUA(
  params: URLSearchParams
): AdditionalContent['searchParams'] {
  const searchParams = {};

  for (const [k, v] of params) {
    if (k === 'x-algolia-agent') {
      continue;
    }

    searchParams[k] = v;
  }

  return Object.entries(searchParams).length === 0 ? undefined : searchParams;
}

export class EchoRequester extends Requester {
  constructor(private status = 200) {
    super();
  }

  send(
    { headers, url, connectTimeout, responseTimeout }: EndRequest,
    { data, ...originalRequest }: Request
  ): Promise<Response> {
    const urlSearchParams = new URL(url).searchParams;
    const userAgent = urlSearchParams.get('x-algolia-agent') || undefined;
    const searchParams = searchParamsWithoutUA(urlSearchParams);
    const additionalContent: AdditionalContent = {
      headers,
      connectTimeout,
      responseTimeout,
      userAgent: userAgent ? encodeURI(userAgent) : undefined,
      searchParams,
    };
    const originalData =
      data && Object.entries(data).length > 0 ? data : undefined;

    return Promise.resolve({
      content: JSON.stringify({
        ...originalRequest,
        ...additionalContent,
        data: originalData,
      }),
      isTimedOut: false,
      status: this.status,
    });
  }
}
