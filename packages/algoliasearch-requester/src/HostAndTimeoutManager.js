// @flow

import createStore from '../../universal-store';
import type { Hosts, Timeouts, RequestType } from 'algoliasearch-requester';
import type { AppId } from 'algoliasearch';

type ManagerData = {
  hosts: Hosts,
  timeouts: Timeouts,
  currentHostIndices: {|
    [key: RequestType]: number,
  |},
  timeoutFailures: number,
};

const store = createStore('algoliasearch-host-and-timeouts');

function noHostsRemaining({ appID, timeoutFailures }) {
  initHostAndTimeouts({ appID });
  throw new Error(`There are no hosts remaining for this app. 

You can retry this search, and it will try the hosts again. 

appID: ${appID}

see: https://alg.li/client#no-hosts-remaining`);
}

const DEFAULT_TIMEOUTS: Timeouts = {
  connect: 1 * 1000, // 500ms connect is GPRS latency
  read: 2 * 1000,
  write: 30 * 1000,
};

function computeRegularHosts(appID: AppId): Hosts {
  const readWriteHosts = [
    `${appID}-1.algolianet.com`,
    `${appID}-2.algolianet.com`,
    `${appID}-3.algolianet.com`,
  ];

  return {
    read: [`${appID}-dsn.algolia.net`, ...readWriteHosts],
    write: [`${appID}.algolia.net`, ...readWriteHosts],
  };
}

export function initHostAndTimeouts({
  hosts: providedHosts,
  timeouts,
  appID,
  timeoutFailures = 0,
}: {
  hosts?: Hosts,
  timeouts?: Timeouts,
  appID: AppId,
  timeoutFailures?: number,
}): ManagerData {
  const hosts = providedHosts || computeRegularHosts(appID);

  const data = {
    hosts,
    timeouts: { ...DEFAULT_TIMEOUTS, ...timeouts },
    currentHostIndices: {
      read: 0,
      write: 0,
    },
    timeoutFailures,
  };
  store.set(appID, data);
  return store.get(appID);
}

export function getParams({
  appID,
  requestType,
}: {
  appID: AppId,
  requestType: RequestType,
}) {
  const savedParams = store.get(appID);
  const data: ManagerData = savedParams || initHostAndTimeouts({ appID });
  if (requestType === undefined) {
    throw new Error(
      'the request requestType (`requestType`) must be `read` or `write`'
    );
  }

  const { hosts, currentHostIndices, timeouts, timeoutFailures } = data;

  const timeout = timeouts[requestType] * (timeoutFailures + 1);
  const connectTimeout = timeouts.connect * (timeoutFailures + 1);

  const hostIndex = currentHostIndices[requestType];
  const hostnames = hosts[requestType];
  if (Array.isArray(hostnames) && hostIndex > hostnames.length) {
    noHostsRemaining(appID);
  }
  const hostname = hostnames[hostIndex];

  return { hostname, timeout, connectTimeout };
}

export function hostDidTimeout({
  appID,
  requestType,
}: {
  appID: AppId,
  requestType: RequestType,
}) {
  const savedParams = store.get(appID);
  const data: ManagerData = savedParams || initHostAndTimeouts({ appID });
  data.timeoutFailures++;
  store.set(data);
  hostDidFail({ appID, requestType });
  return data;
}

export function hostDidFail({
  appID,
  requestType,
}: {
  appID: AppId,
  requestType: RequestType,
}) {
  const savedParams = store.get(appID);
  const data: ManagerData = savedParams || initHostAndTimeouts({ appID });
  const index = data.currentHostIndices[requestType] + 1;
  if (
    data.hosts.hasOwnProperty(requestType) &&
    index >= data.hosts[requestType].length
  ) {
    noHostsRemaining({ appID, timeoutFailures: data.timeoutFailures });
  }
  data.currentHostIndices[requestType] = index;
  store.set(data);
  return data;
}
