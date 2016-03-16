import debug from 'debug';

export default function createRequester({
  appId,
  apiKey,
  hosts,
  readProtocol,
  requester,
  timeouts
}) {
  return function request({
    method,
    path,
    pathParams,
    qs,
    body,
    forceReadHost
  }) {
    const log = debug('createRequester');
    let replaces = 0;
    path = path.replace(/%s/g, () => pathParams[replaces++]);

    log('new request %j', {
      method,
      path,
      qs
    });

    return new Promise((resolve, reject) => {
      requester({
        body,
        headers: {
          'x-algolia-application-id': appId,
          'x-algolia-api-key': apiKey
        },
        hostname: hosts.write[0],
        method,
        onNetworkError: reject,
        onSuccess: body => {
          log('');
          resolve(body);
        },
        port: 443,
        path,
        protocol: 'https:'
      });
    });

    // here should go the switch from sending API key in headers
    // to sending them in body
    // specific headers (per requester should be computed in requester itself)
  };
}
