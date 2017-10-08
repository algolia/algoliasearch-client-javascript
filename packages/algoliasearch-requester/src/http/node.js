/* eslint prefer-promise-reject-errors: off */
// @flow

import https from 'https';
import zlib from 'zlib';

import parseOptions from '../parseOptions';
import type {
  Response,
  RequesterArgs,
  RequesterError,
} from 'algoliasearch-requester';

const agent: https.Agent = new https.Agent({
  keepAlive: true,
  keepAliveMsecs: 3000,
});

export default function httpRequester({
  // agent,
  body,
  method,
  url,
  requestOptions,
  timeout: originalTimeout,
  requestType,
}: RequesterArgs): Promise<Response> {
  const { protocol = 'https', hostname, port = '80', pathname: path } = url;
  const { queryStringOrBody, headers: extraHeaders, timeouts } = parseOptions(
    requestOptions
  );

  return new Promise((resolve, reject: RequesterError => void) => {
    const req = https.request({
      hostname,
      headers: {
        'accept-encoding': 'gzip,deflate',
        connection: 'keep-alive',
        accept: 'application/json',
        ...extraHeaders,
      },
      method,
      port,
      path,
      protocol,
      agent,
    });

    const timeout = timeouts[requestType] || originalTimeout;
    req.setTimeout(timeout);

    const chunks: Buffer[] = [];
    const onData = (chunk: Buffer) => chunks.push(chunk);
    function onEnd(res) {
      resolve(
        ({
          body: Buffer.concat(chunks),
          statusCode: res.statusCode,
        }: Response)
      );
    }
    function onResponse(response) {
      // either the proxy or Algolia can decide
      // to not gzip the response (very small responses)
      // so we always need to double check
      const res =
        response.headers['content-encoding'] === 'gzip' ||
        response.headers['content-encoding'] === 'deflate'
          ? response.pipe(zlib.createUnzip())
          : response;

      res.on('data', onData);
      res.on('end', () => onEnd(res));
    }
    function onTimeout() {
      reject({
        reason: 'timeout',
        more: {
          currentTimeout: timeout,
        },
        test: false,
      });
    }

    req.once('error', reject);
    req.once('response', onResponse);
    req.once('timeout', onTimeout);

    if (body !== undefined) {
      req.write(body);
    }

    req.end();
  });
}
