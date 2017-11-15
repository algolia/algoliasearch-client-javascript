/* eslint prefer-promise-reject-errors: off */

import createRequester from './createRequester';

jest.useFakeTimers();

it('requires the right arguments', () => {
  const falseInvocations = [
    () =>
      createRequester({
        apiKey: '',
      }),
    () =>
      createRequester({
        appID: '',
      }),
    () =>
      createRequester({
        appID: '',
        apiKey: '',
        httpRequester: {},
      }),
  ];

  falseInvocations.map(invocation =>
    expect(invocation).toThrowErrorMatchingSnapshot()
  );

  expect(() =>
    createRequester({
      appID: '',
      apiKey: '',
      httpRequester: () => {},
    })
  ).not.toThrow();
});

it('first read request uses first host', () => {
  const httpRequester = jest.fn(() => Promise.resolve());
  const requester = createRequester({
    appID: 'the_read_app',
    apiKey: '',
    httpRequester,
  });

  requester({
    requestType: 'read',
  });

  const firstArgs = httpRequester.mock.calls[0];
  const { url: { hostname } } = firstArgs[0];
  expect(hostname).toEqual('the_read_app-dsn.algolia.net');
});

it('first write request uses first host', () => {
  const httpRequester = jest.fn(() => Promise.resolve());
  const requester = createRequester({
    appID: 'the_write_app',
    apiKey: '',
    httpRequester,
  });

  requester({
    requestType: 'write',
  });

  const firstArgs = httpRequester.mock.calls[0];
  const { url: { hostname } } = firstArgs[0];
  expect(hostname).toEqual('the_write_app.algolia.net');
});

it('uses a different host when the request needs to be retried', async () => {
  const httpRequester = jest.fn(
    () =>
      httpRequester.mock.calls.length === 1
        ? Promise.reject({ reason: 'network' })
        : Promise.resolve()
  );
  const requester = createRequester({
    appID: 'the_crazy_app',
    apiKey: '',
    httpRequester,
  });

  await requester({
    requestType: 'read',
  }); // retries

  const usedHosts = httpRequester.mock.calls.map(
    ([{ url: { hostname } }]) => hostname
  );

  expect(usedHosts).toMatchSnapshot();

  expect(usedHosts[0]).toEqual('the_crazy_app-dsn.algolia.net'); // first try
  expect(usedHosts[1]).toEqual('the_crazy_app-1.algolianet.com'); // second try
});

it('uses the "up" host on second request when first fails', async () => {
  const httpRequester = jest.fn(
    () =>
      httpRequester.mock.calls.length === 1
        ? Promise.reject({ reason: 'network' })
        : Promise.resolve()
  );
  const requester = createRequester({
    appID: 'the_crazy_app',
    apiKey: '',
    httpRequester,
  });

  await requester({
    requestType: 'read',
  }); // retries
  await requester({
    requestType: 'read',
  });

  const usedHosts = httpRequester.mock.calls.map(
    ([{ url: { hostname } }]) => hostname
  );

  expect(usedHosts).toMatchSnapshot();

  expect(usedHosts[0]).toEqual('the_crazy_app-dsn.algolia.net'); // first try
  expect(usedHosts[1]).toEqual('the_crazy_app-1.algolianet.com'); // first retry
  expect(usedHosts[2]).toEqual('the_crazy_app-1.algolianet.com'); // second request
});

it('resolves when the response is successful', () => {
  const httpRequester = jest.fn(() => Promise.resolve({}));
  const requester = createRequester({
    appID: 'the_successful_app',
    apiKey: '',
    httpRequester,
  });

  expect(
    requester({
      requestType: 'write',
    })
  ).resolves.toEqual({});
});

it("retries when there's a server error", async () => {
  const httpRequester = jest.fn(
    () =>
      httpRequester.mock.calls.length === 1
        ? Promise.reject({
            reason: 'server',
          })
        : Promise.resolve({ cool: 'turbo' })
  );
  const requester = createRequester({
    appID: 'the_app_app',
    apiKey: '',
    httpRequester,
  });

  // it eventually resolves
  await expect(
    requester({
      requestType: 'write',
    })
  ).resolves.toEqual({ cool: 'turbo' });

  // requester was called twice
  expect(httpRequester.mock.calls).toHaveLength(2);
});

it("retries when there's a network error", async () => {
  const httpRequester = jest.fn(
    () =>
      httpRequester.mock.calls.length === 1
        ? Promise.reject({
            reason: 'network',
          })
        : Promise.resolve({})
  );
  const requester = createRequester({
    appID: 'the_network_app',
    apiKey: '',
    httpRequester,
  });

  // it eventually resolves
  await expect(
    requester({
      requestType: 'write',
    })
  ).resolves.toEqual({});

  // requester was called twice
  expect(httpRequester.mock.calls).toHaveLength(2);
});

it("retries when there's a dns error", async () => {
  const httpRequester = jest.fn(
    () =>
      httpRequester.mock.calls.length === 1
        ? Promise.reject({
            reason: 'dns',
          })
        : Promise.resolve({})
  );
  const requester = createRequester({
    appID: 'the_dns_app',
    apiKey: '',
    httpRequester,
  });

  // it eventually resolves
  await expect(
    requester({
      requestType: 'write',
    })
  ).resolves.toEqual({});

  // requester was called twice
  expect(httpRequester.mock.calls.length).toBe(2);
});

it("retries when there's a timeout", async () => {
  const httpRequester = jest.fn(
    () =>
      httpRequester.mock.calls.length === 1
        ? Promise.reject({
            reason: 'timeout',
          })
        : Promise.resolve({ bingo: true })
  );
  const requester = createRequester({
    appID: 'the_retry_app',
    apiKey: '',
    httpRequester,
  });

  // it eventually resolves
  await expect(
    requester({
      requestType: 'write',
    })
  ).resolves.toEqual({ bingo: true });

  // requester was called twice
  expect(httpRequester.mock.calls.length).toBe(2);
});

it('second try after a timeout has increments the timeout (write)', async () => {
  const httpRequester = jest.fn(
    () =>
      httpRequester.mock.calls.length === 1
        ? Promise.reject({
            reason: 'timeout',
          })
        : Promise.resolve({})
  );
  const requester = createRequester({
    appID: 'the_fun_app',
    apiKey: '',
    httpRequester,
  });

  await requester({
    requestType: 'write',
  });

  const timeouts = httpRequester.mock.calls.map(([{ timeout }]) => timeout);

  expect(timeouts).toMatchSnapshot();

  expect(timeouts[1]).toBeGreaterThan(timeouts[0]);
});

it('second try after a timeout has increments the timeout (read)', async () => {
  const httpRequester = jest.fn(
    () =>
      httpRequester.mock.calls.length === 1
        ? Promise.reject({
            reason: 'timeout',
          })
        : Promise.resolve({})
  );
  const requester = createRequester({
    appID: 'the_fun_app',
    apiKey: '',
    httpRequester,
  });

  await requester({
    requestType: 'read',
  });

  const timeouts = httpRequester.mock.calls.map(([{ timeout }]) => timeout);

  expect(timeouts).toMatchSnapshot();

  expect(timeouts[1]).toBeGreaterThan(timeouts[0]);
});

it('rejects when all timeouts are reached', async () => {
  const httpRequester = jest.fn(
    () =>
      httpRequester.mock.calls.length <= 4
        ? Promise.reject({
            reason: 'timeout',
          })
        : Promise.resolve({})
  );
  const requester = createRequester({
    appID: 'the_timeout_app',
    apiKey: '',
    httpRequester,
  });

  await expect(
    requester({
      requestType: 'write',
    }) // eventually it will fail because it runs out of hosts
  ).rejects.toMatchSnapshot();

  await requester({ requestType: 'write' });

  const timeouts = httpRequester.mock.calls.map(([{ timeout }]) => timeout);
  const hosts = httpRequester.mock.calls.map(
    ([{ url: { hostname } }]) => hostname
  );
  expect(timeouts).toMatchSnapshot();

  const firstTimeout = timeouts[0];
  const lastTimeout = timeouts[timeouts.length - 1];

  expect(lastTimeout).toBe(firstTimeout);
});

it('rejects when all hosts are used', () => {
  const httpRequester = jest.fn(() =>
    Promise.reject({
      reason: 'network',
    })
  );
  const requester = createRequester({
    appID: 'the_host_app',
    apiKey: '',
    httpRequester,
  });

  // eventually it will fail because there are no more hosts
  expect(
    requester({
      requestType: 'write',
    })
  ).rejects.toMatchSnapshot('rejects when all hosts are used');
});

it.skip('uses the first host again after running out of hosts', async () => {
  const httpRequester = jest.fn(
    () =>
      httpRequester.mock.calls.length < 5 /* the request completely fails */
        ? Promise.reject({
            reason: 'network',
          })
        : Promise.resolve({})
  );
  const requester = createRequester({
    appID: 'the_other_host_app',
    apiKey: '',
    httpRequester,
  });

  // eventually it will fail because there are no more hosts
  await expect(
    requester({
      requestType: 'write',
    })
  ).rejects.toMatchSnapshot();

  await requester({
    requestType: 'write',
  }); // this request works

  const calls = httpRequester.mock.calls;
  const firstHost = calls[0][0].hostname;
  const lastHost = calls[calls.length - 1][0].hostname;

  expect(lastHost).toBe(firstHost);
});

it.skip('two instances of createRequester share the same host index', async () => {
  const httpRequester = jest.fn(
    () =>
      httpRequester.mock.calls.length === 1
        ? Promise.reject({ reason: 'network' })
        : Promise.resolve()
  );

  const firstRequester = createRequester({
    appID: 'the_same_app',
    apiKey: '',
    httpRequester,
  });
  const secondRequester = createRequester({
    appID: 'the_same_app',
    apiKey: '',
    httpRequester,
  });

  await firstRequester({
    requestType: 'read',
  }); // retries
  await secondRequester({
    requestType: 'read',
  });

  const usedHosts = httpRequester.mock.calls.map(
    ([{ url: { hostname } }]) => hostname
  );

  expect(usedHosts).toMatchSnapshot();

  expect(usedHosts[0]).toEqual('the_same_app-dsn.algolia.net'); // first try
  expect(usedHosts[1]).toEqual('the_same_app-1.algolianet.com'); // first retry
  expect(usedHosts[2]).toEqual('the_same_app-1.algolianet.com'); // second request
});
