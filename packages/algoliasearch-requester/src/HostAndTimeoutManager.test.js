import {
  getParams,
  hostDidFail,
  hostDidTimeout,
} from './HostAndTimeoutManager.js';

it('gets a host and timeout for read', () => {
  const params = getParams({ appId: 'some_app', requestType: 'read' });

  expect(params).toEqual(
    expect.objectContaining({
      hostname: expect.any(String),
      timeout: expect.any(Number),
    })
  );

  expect(params.timeout).toBe(2000);
  expect(params.hostname).toEqual(
    expect.stringMatching(/some_app-(dsn|[1-3])\.algolia\.net/)
  );
});

it('gets a host and timeout for write', () => {
  const params = getParams({ appId: 'some_app', requestType: 'write' });

  expect(params).toEqual(
    expect.objectContaining({
      hostname: expect.any(String),
      timeout: expect.any(Number),
    })
  );

  expect(params.timeout).toBe(30000);
  expect(params.hostname).toEqual(
    expect.stringMatching(/some_app(-[1-3])?\.algolia\.net/)
  );
});

it('gets a different host when you retry', () => {
  const appId = 'some_app';
  const requestType = 'read';
  const params = getParams({ appId, requestType });
  hostDidFail({ appId, requestType });
  const newParams = getParams({ appId, requestType });

  expect(newParams.hostname).not.toEqual(params.hostname);
});

it('gets a different host when you retry (timeout)', () => {
  const appId = 'some_retrying_app';
  const requestType = 'read';
  const params = getParams({ appId, requestType });
  hostDidTimeout({ appId, requestType });
  const newParams = getParams({ appId, requestType });

  expect(newParams.hostname).not.toEqual(params.hostname);
  expect(newParams.timeout).toBe(4000);
});

it('it will throw if the host keeps failing', () => {
  const appId = 'some_throwing_app';
  const requestType = 'read';
  const params = getParams({ appId, requestType });
  hostDidTimeout({ appId, requestType });
  hostDidTimeout({ appId, requestType });
  hostDidTimeout({ appId, requestType });
  // we're out of hosts, thus we throw
  expect(() =>
    hostDidTimeout({ appId, requestType })
  ).toThrowErrorMatchingSnapshot();

  // this should now be the original data
  const newParams = getParams({ appId, requestType });
  expect(newParams).toEqual(params);
});
