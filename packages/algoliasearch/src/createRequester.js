import debug from './debug.js';
const log = debug('algolia:src/createRequester');

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
    // const start = Date.now();

    let replaces = 0;

    // replace place holders like /%s/%s/ (most of the time, the indexName)
    path = path.replace(/%s/g, () => encodeURIComponent(pathParams[replaces++]));

    // add potential query string parameters to the path
    if (qs !== undefined) {
      path += `?${stringifyQueryStringObject(qs)}`;
    }

    log('%s %s', method, path);
    // console.log(body)

    return new Promise((resolve, reject) => {
      requester({
        body: JSON.stringify(body),
        headers: {
          'x-algolia-application-id': appId,
          'x-algolia-api-key': apiKey
        },
        hostname: hosts.write[0],
        method,
        onNetworkError: reject,
        onSuccess: res => {
          // console.log('it took ' + (Date.now() - start) + 'ms');
          resolve(JSON.parse(res.body));
        },
        port: 443,
        path,
        protocol: 'https:'
      });
    });

    // here should go the sw
    // to sending them in body
    // specific headers (per requester should be computed in requester itself)
  };
}

function stringifyQueryStringObject(qs) {
  return Object
    .keys(qs)
    .reduce((out, keyName, index) => {
      const value = qs[keyName];

      if (value === undefined || value === '') {
        return out;
      }

      return `${out}${index > 0 ? '&' : ''}${keyName}=${stringifyQueryStringValue(value)}`;
    }, '');
}

function stringifyQueryStringValue(value) {
  return encodeURIComponent(Array.isArray(value) ? JSON.stringify(value) : value);
}
