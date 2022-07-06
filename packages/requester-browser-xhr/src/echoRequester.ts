import { createEchoRequester } from '@algolia/client-common';
import type { EchoRequester } from '@algolia/client-common';

export function echoRequester(status: number = 200): EchoRequester {
  return createEchoRequester({ getURL: (url: string) => new URL(url), status });
}
