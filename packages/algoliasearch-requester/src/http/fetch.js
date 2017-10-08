// @flow

// todo: don't disable when doing it properly later
/* eslint-disable */

import parseOptions from '../parseOptions.js';
import type {
  Response,
  RequesterArgs,
  RequesterError
} from 'algoliasearch-requester';

export default function httpRequester({
  body,
  method,
  url,
  requestOptions,
  timeout: originalTimeout,
  requestType
}: RequesterArgs): Promise<Response> {
  const { queryStringOrBody, headers: extraHeaders, timeouts } = parseOptions(
    requestOptions
  );
  const timeout = timeouts[requestType] || originalTimeout;

  const controller = new FetchController();

  return fetch;
}
