// @flow
/* eslint-disable */
import type {
  Response,
  RequesterArgs,
  RequestOptions,
} from 'algoliasearch-requester';

// todo: import/define this correctly
const parseOptions = (requestOptions: RequestOptions) => ({
  queryStringOrBody: {},
  headers: requestOptions,
  timeouts: {},
});

export default function httpRequester({
  body,
  method,
  url,
  requestOptions,
  timeout: originalTimeout,
  requestType,
}: RequesterArgs): Promise<Response> {
  const { queryStringOrBody, headers: extraHeaders, timeouts } = parseOptions(
    requestOptions
  );
  const timeout = timeouts[requestType] || originalTimeout;

  // $FlowFixMe --> this is a global
  const controller = new AbortController();

  return fetch(`https://${url}`);
}
