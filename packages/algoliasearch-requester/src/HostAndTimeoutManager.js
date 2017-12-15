// @flow

import createStore from 'algoliasearch-universal-store';
import type { Hosts, Timeouts, RequestType } from 'algoliasearch-requester';
import type { AppId } from 'algoliasearch';

type ManagerData = {
  hosts: Hosts,
  timeouts: Timeouts,
  currentHostIndices: {|
    // [key: RequestType]: number,
    read: number,
    write: number,
  |},
  timeoutFailures: number,
  expirations: {
    host: number,
    timeout: number,
  },
};

const store = createStore('algoliasearch-host-and-timeouts');

function noHostsRemaining({ appId }) {
  initHostAndTimeouts({ appId });
  throw new Error(`There are no hosts remaining for this app. 

You can retry this search, and it will try the hosts again. 

appId: ${appId}

see: https://alg.li/client#no-hosts-remaining`);
}

const DEFAULT_TIMEOUTS: Timeouts = {
  connect: 1 * 1000, // 500ms connect is GPRS latency
  read: 2 * 1000,
  write: 30 * 1000,
};

const HOST_INVALIDATION = 12000; // 12 seconds
const TIMEOUT_INVALIDATION = 1200000; // 20 minutes

function computeRegularHosts(appId: AppId): Hosts {
  const readWriteHosts = [
    `${appId}-1.algolianet.com`,
    `${appId}-2.algolianet.com`,
    `${appId}-3.algolianet.com`,
  ];

  return {
    read: [`${appId}-dsn.algolia.net`, ...readWriteHosts],
    write: [`${appId}.algolia.net`, ...readWriteHosts],
  };
}

export function initHostAndTimeouts({
  hosts: providedHosts,
  timeouts,
  appId,
  timeoutFailures = 0,
}: {
  hosts?: Hosts,
  timeouts?: Timeouts,
  appId: AppId,
  timeoutFailures?: number,
}): ManagerData {
  const hosts = providedHosts || computeRegularHosts(appId);

  const data: ManagerData = {
    hosts,
    timeouts: { ...DEFAULT_TIMEOUTS, ...timeouts },
    currentHostIndices: {
      read: 0,
      write: 0,
    },
    timeoutFailures,
    expirations: {
      host: Date.now() + HOST_INVALIDATION,
      timeout: Date.now() + TIMEOUT_INVALIDATION,
    },
  };

  store.set(appId, data);

  return data;
}

export function getParams({
  appId,
  requestType,
}: {
  appId: AppId,
  requestType: RequestType,
}) {
  if (requestType === undefined) {
    throw new Error(
      'the request requestType (`requestType`) must be `read` or `write`'
    );
  }

  const savedParams = store.get(appId);
  const data: ManagerData = savedParams || initHostAndTimeouts({ appId });

  const { hosts, timeouts, expirations } = data;

  const now = Date.now();
  const timeoutFailures = now < expirations.timeout ? data.timeoutFailures : 0;
  const hostIndices =
    now < expirations.host ? data.currentHostIndices : { read: 0, write: 0 };

  const timeout = timeouts[requestType] * (timeoutFailures + 1);
  const connectTimeout = timeouts.connect * (timeoutFailures + 1);

  const hostIndex = hostIndices[requestType];
  const hostnames = hosts[requestType];
  if (Array.isArray(hostnames) && hostIndex > hostnames.length) {
    noHostsRemaining({ appId });
  }
  const hostname = hostnames[hostIndex];

  return { hostname, timeout, connectTimeout };
}

export function hostDidTimeout({
  appId,
  requestType,
}: {
  appId: AppId,
  requestType: RequestType,
}) {
  const savedParams = store.get(appId);
  const data: ManagerData = savedParams || initHostAndTimeouts({ appId });
  data.timeoutFailures++;
  store.set(appId, data);
  hostDidFail({ appId, requestType });
  return data;
}

export function hostDidFail({
  appId,
  requestType,
}: {
  appId: AppId,
  requestType: RequestType,
}) {
  const savedParams = store.get(appId);
  const data: ManagerData = savedParams || initHostAndTimeouts({ appId });
  const index = data.currentHostIndices[requestType] + 1;
  if (
    data.hosts.hasOwnProperty(requestType) &&
    index >= data.hosts[requestType].length
  ) {
    noHostsRemaining({ appId, timeoutFailures: data.timeoutFailures });
  }
  data.currentHostIndices[requestType] = index;
  store.set(appId, data);
  return data;
}
