// @flow

import type { Method } from '../algoliasearch/src/types';

type Response = { body: Buffer, statusCode: number };
export type HttpModule = ({
  body: Object,
  headers: Object,
  method: Method,
  url: URL,
}) => Promise<Response>;
