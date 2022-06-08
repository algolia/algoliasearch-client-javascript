import { URL } from 'url';

import { createEchoRequester } from '@experimental-api-clients-automation/client-common';
import type { EchoRequester } from '@experimental-api-clients-automation/client-common';

export function echoRequester(status: number = 200): EchoRequester {
  return createEchoRequester({ getURL: (url: string) => new URL(url), status });
}
