// @flow
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import encode from 'querystring-es3/encode';
// import type { RequesterArgs } from 'algoliasearch-requester';

// const httpClient = new HttpClient();
/*
export default function httpRequester({
  // todo: add override possibility
  // abortController,
  body,
  method,
  url,
  requestOptions,
  timeout: originalTimeout,
  requestType,
}: RequesterArgs) {
  let headers = new HttpHeaders();

  headers = headers.set(
    'content-type',
    method === 'POST' ? 'application/x-www-form-urlencoded' : 'application/json'
  );

  headers = headers.set('accept', 'application/json');

  const url = rawUrl + (rawUrl.includes('?') ? '&' : '?') + encode(headers);

  const transferStateKey = makeStateKey(`ngais(${opts.body})`);

  if (transferState.hasKey(transferStateKey)) {
    const resp = JSON.parse(transferState.get(transferStateKey, {}));
    return Promise.resolve({
      statusCode: resp.status,
      body: resp.body,
      headers: resp.headers,
    });
  }

  return new Promise((resolve, reject) => {
    httpClient
      .request(opts.method, url, {
        headers,
        body: opts.body,
        observe: 'response',
      })
      .subscribe(
        resp => {
          transferState.set(transferStateKey, JSON.stringify(resp));
          resolve({
            statusCode: resp.status,
            body: resp.body,
            headers: resp.headers,
          });
        },
        resp =>
          reject({
            statusCode: resp.status,
            body: resp.body,
            headers: resp.headers,
          })
      );
  });
}
*/
