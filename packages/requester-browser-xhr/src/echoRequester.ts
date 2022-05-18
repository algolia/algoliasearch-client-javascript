import { createEchoRequester } from '@experimental-api-clients-automation/client-common';
import type { UrlParams } from '@experimental-api-clients-automation/client-common';

function getUrlParams(url: string): UrlParams {
  const { host, searchParams: urlSearchParams } = new URL(url);
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
      Object.entries(searchParams).length === 0 ? undefined : searchParams,
  };
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function echoRequester(status: number = 200) {
  return createEchoRequester({ getUrlParams, status });
}
