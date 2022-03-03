import { createEchoRequester } from '@algolia/client-common';
import type { UrlParams } from '@algolia/client-common';

function getUrlParams(url: string): UrlParams {
  const { host, searchParams: urlSearchParams } = new URL(url);
  const userAgent = urlSearchParams.get('x-algolia-agent') || '';
  const searchParams = {};

  for (const [k, v] of urlSearchParams) {
    if (k === 'x-algolia-agent') {
      continue;
    }

    searchParams[k] = v;
  }

  return {
    host,
    userAgent,
    searchParams:
      Object.entries(searchParams).length === 0 ? undefined : searchParams,
  };
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function echoRequester(status: number = 200) {
  return createEchoRequester({ getUrlParams, status });
}
