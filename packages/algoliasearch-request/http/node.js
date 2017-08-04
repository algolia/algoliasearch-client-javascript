/* @flow */
import https from 'https';
import zlib from 'zlib';

import type { Response, RequesterArgs } from '../types';

// $FlowIssue doesn't have Agent in https
const agent: https.Agent = new https.Agent({
  keepAlive: true,
  keepAliveMsecs: 3000,
});

export default function requester({
  // agent,
  body,
  headers,
  method,
  url: { protocol, hostname, port, pathname: path },
}: RequesterArgs): Promise<Response> {
  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname,
      headers: {
        'accept-encoding': 'gzip,deflate',
        connection: 'keep-alive',
        accept: 'application/json',
        ...headers,
      },
      method,
      port,
      path,
      protocol,
      agent,
    });

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

      res.on('data', onData).on('end', () => onEnd(res));
    }

    req.once('error', reject);
    req.once('response', onResponse);

    if (body !== undefined) {
      req.write(body);
    }

    req.end();
  });
}
