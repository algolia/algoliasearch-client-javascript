import https from 'https';
import zlib from 'zlib';

const agent = new https.Agent({
  keepAlive: true,
  keepAliveMsecs: 30 * 1000
});

export default function nodejsRequester({
  // agent,
  body,
  headers,
  hostname,
  method,
  onNetworkError,
  onSuccess,
  // onTimeout,
  port,
  path,
  protocol,
  // timeout,
}) {
  const chunks = [];
  const req = https.request({
    hostname,
    headers: {
      'accept-encoding': 'gzip,deflate',
      connection: 'keep-alive',
      accept: 'application/json',
      ...headers
    },
    method,
    port,
    path,
    protocol,
    agent
  });

  req.once('error', onNetworkError);
  req.once('response', res => {
    // either the proxy or Algolia can decide
    // to not gzip the response (very small responses)
    // so we always need to double check
    if (res.headers['content-encoding'] === 'gzip' ||
      res.headers['content-encoding'] === 'deflate') {
      res = res.pipe(zlib.createUnzip());
    }

    res
      .on('data', chunk => chunks.push(chunk))
      .on('end', () => onSuccess({
        body: Buffer.concat(chunks),
        statusCode: res.statusCode
      }));
  });

  if (body !== undefined) {
    req.write(body);
  }

  req.end();
}
