// @flow
import type { AppId } from 'types/Algolia';
import type { Hosts, Timeouts } from 'algoliasearch-requester';

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

function computeRegularTimeouts(): Timeouts {
  return {
    connect: 1 * 1000, // 500ms connect is GPRS latency
    read: 2 * 1000,
    write: 30 * 1000,
  };
}

type Args = {|
  appId: AppId,
  extraHosts?: Hosts,
  timeouts?: Timeouts,
|};

export default class RequestHosts {
  hosts: Hosts;
  timeouts: Timeouts;
  appId: AppId;

  constructor({ appId, extraHosts = {}, timeouts: extraTimeouts = {} }: Args) {
    this.appId = appId;

    const regularHosts = computeRegularHosts(appId);
    // $FlowFixMe --> Flow doesn't recognize that I'm catching the undefined here
    const { read = [], write = [] } = extraHosts;

    this.hosts = {
      read: [...regularHosts.read, ...read],
      write: [...regularHosts.write, ...write],
    };

    const regularTimeouts = computeRegularTimeouts();
    this.timeouts = {
      ...regularTimeouts,
      ...extraTimeouts,
    };
  }

  getHost({
    type,
    extraHosts,
  }: {
    type: 'read' | 'write',
    extraHosts?: Hosts,
  }): string {
    //  extraHosts ? use(extraHosts) : use(this.hosts)
    if (type !== 'read' && type !== 'write') {
      throw new Error(
        `You requested a host of type ${type}, but only 'read' or 'write' is a valid type.`
      );
    }
    const extra = extraHosts && extraHosts[type] ? extraHosts[type] : [];
    const hosts = [...extra, ...this.hosts[type]];

    if (hosts.length === 1) {
      const regularHosts = computeRegularHosts(this.appId)[type];
      this.hosts[type] = [...this.hosts[type], ...regularHosts];
    }

    // use a counter with modulo instead of modifying
    return hosts.shift();
  }

  getTimeout({
    retry = 0,
    type,
    extraTimeouts,
  }: {
    retry: number,
    type: $Keys<Timeouts>,
    extraTimeouts?: Timeouts,
  }): number {
    const timeout =
      extraTimeouts && extraTimeouts[type]
        ? extraTimeouts[type]
        : this.timeouts[type];

    return (1 + retry) * timeout;
  }
}
