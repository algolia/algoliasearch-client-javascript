/* @flow */
import https from 'https';
import zlib from 'zlib';

// $FlowIssue doesn't have Agent in https
const agent: https.Agent = new https.Agent({
  keepAlive: true,
  keepAliveMsecs: 3000,
});

type Method = 'POST' | 'GET';
type Response = {| body: Buffer, statusCode: number |};

export default function requester({
  // agent,
  body,
  headers,
  method,
  url: { protocol, hostname, port, pathname: path },
}: {
  body: Object,
  headers: Object,
  method: Method,
  url: URL,
}): Promise<Response> {
  return new Promise((resolve: Response => mixed, reject: Error => mixed) => {
    const chunks: Buffer[] = [];
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
    req.once('error', reject);
    req.once('response', response => {
      // either the proxy or Algolia can decide
      // to not gzip the response (very small responses)
      // so we always need to double check

      const res =
        response.headers['content-encoding'] === 'gzip' ||
        response.headers['content-encoding'] === 'deflate'
          ? response.pipe(zlib.createUnzip())
          : response;

      res.on('data', (chunk: Buffer) => chunks.push(chunk)).on('end', () =>
        resolve(
          ({
            body: Buffer.concat(chunks),
            statusCode: res.statusCode,
          }: Response)
        )
      );
    });

    if (body !== undefined) {
      req.write(body);
    }

    req.end();
  });
}
