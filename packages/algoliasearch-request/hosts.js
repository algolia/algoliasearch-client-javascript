// @flow
import type { AppId } from '../algoliasearch/src/types';

export type Hosts = {|
  read: string[],
  write: string[],
|};
export type Timeouts = {|
  connect: number,
  read: number,
  write: number,
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

const computeRegularTimeouts = () => ({
  connect: 1 * 1000, // 500ms connect is GPRS latency
  read: 2 * 1000,
  write: 30 * 1000,
});

type Args = {|
  appId: AppId,
  extraHosts?: Hosts,
  timeouts?: Timeouts,
|};

export default class requestHosts {
  hosts: Hosts;
  timeouts: Timeouts;

  constructor({ appId, extraHosts, timeouts: extraTimeouts }: Args) {
    const regularHosts = computeRegularHosts(appId);
    this.hosts = {
      read: [...regularHosts.read, ...extraHosts.read],
      write: [...regularHosts.write, ...extraHosts.write],
    };

    const regularTimeouts = computeRegularTimeouts();
    this.timeouts = {
      ...regularTimeouts,
      ...extraTimeouts,
    };
  }

  *readHost() {
    const reset = yield {
      host: this.hosts.read.shift(),
      timeout: this.timeouts.timeouts.read,
    };
    if (reset === true) {
      constructor();
    }
  }

  *writeHost() {
    const reset = yield {
      host: this.hosts.write.shift(),
      timeout: this.timeouts.timeouts.write,
    };
    if (reset === true) {
      constructor();
    }
  }
}
