// @flow
/* eslint-disable */
// import 'abortcontroller-polyfill';
import type {
  Response,
  RequesterArgs,
  RequestOptions,
  // AbortController as AbortControllerType,
} from 'algoliasearch-requester';

// todo: import/define this correctly
const parseOptions = (requestOptions: RequestOptions) => ({
  body: {},
  querystring: {},
  headers: {},
});

export default function httpRequester({
  signal: abortSignal,
  body: originalBody,
  method,
  url,
  requestOptions,
  appId,
  apiKey,
  timeout,
  requestType,
}: RequesterArgs): Promise<Response> {
  const { body: extraBody, querystring, headers } = parseOptions({
    requestOptions: { ...requestOptions, appId, apiKey },
    method,
  });

  // todo: use internal controller for timeout
  // const controller = new AbortController();
  // const signal = controller.signal;
  // console.log(controller.signal);
  // abortSignal.addEventListener('abort', () => {
  //   controller.abort();
  // });
  // abort current controller on timeout, reject promise with timeout

  const body = { ...originalBody, ...extraBody };

  return fetch(url + querystring, { headers, body /*, signal*/ });
}
