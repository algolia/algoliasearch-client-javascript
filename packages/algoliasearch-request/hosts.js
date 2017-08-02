// @flow
import type { AppId } from '../algoliasearch/src/types';

export type Hosts = {|
  read: string[],
  write: string[],
|};
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

export type Timeouts = {
  connect: number,
  read: number,
  write: number,
};
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

export default class requestHosts {
  hosts: Hosts;
  timeouts: Timeouts;
  appId: AppId;

  constructor({ appId, extraHosts, timeouts: extraTimeouts }: Args) {
    this.appId = appId;

    const regularHosts = computeRegularHosts(appId);
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

  getHost({ type }: { type: 'read' | 'write' }): string {
    if (type !== 'read' && type !== 'write') {
      throw new Error(
        `You requested a host of type ${type}, but only 'read' or 'write' is a valid type.`
      );
    }
    const hosts = this.hosts[type];

    if (hosts.length === 1) {
      const regularHosts = computeRegularHosts(this.appId)[type];
      this.hosts[type] = [...hosts, ...regularHosts];
    }

    return hosts.shift();
  }

  getTimeout({
    retry,
    type,
  }: {
    retry: number,
    type: $Keys<Timeouts>,
  }): number {
    // return switch (type) {
    //   case 'connect':

    //     break;

    //   default:
    //     break;
    // }
    return retry * this.timeouts[type];
  }
}
