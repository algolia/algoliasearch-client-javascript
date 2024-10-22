import { URL } from 'url';

import type { Requester } from '@algolia/client-common';

import { createEchoRequester } from './createEchoRequester';

export function nodeEchoRequester(status: number = 200): Requester {
  return createEchoRequester({ getURL: (url: string) => new URL(url), status });
}

export type { EchoResponse } from './createEchoRequester.ts';
