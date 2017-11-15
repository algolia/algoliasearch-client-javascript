import {
  getParams,
  hostDidFail,
  hostDidTimeout,
} from './HostAndTimeoutManager';

it('gets a host and timeout for read', () => {
  const params = getParams({ appID: 'some_app', requestType: 'read' });

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
  const params = getParams({ appID: 'some_app', requestType: 'write' });

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
  const appID = 'some_app';
  const requestType = 'read';
  const params = getParams({ appID, requestType });
  const probably = hostDidFail({ appID, requestType });
  const newParams = getParams({ appID, requestType });

  expect(newParams.hostname).not.toEqual(params.hostname);
});

it('gets a different host when you retry (timeout)', () => {
  const appID = 'some_retrying_app';
  const requestType = 'read';
  const params = getParams({ appID, requestType });
  hostDidTimeout({ appID, requestType });
  const newParams = getParams({ appID, requestType });

  expect(newParams.hostname).not.toEqual(params.hostname);
  expect(newParams.timeout).toBe(4000);
});

it('it will throw if the host keeps failing', () => {
  const appID = 'some_throwing_app';
  const requestType = 'read';
  const params = getParams({ appID, requestType });
  hostDidTimeout({ appID, requestType });
  hostDidTimeout({ appID, requestType });
  hostDidTimeout({ appID, requestType });
  // we're out of hosts, thus we throw
  expect(() =>
    hostDidTimeout({ appID, requestType })
  ).toThrowErrorMatchingSnapshot();

  // this should now be the original data
  const newParams = getParams({ appID, requestType });
  expect(newParams).toEqual(params);
});
