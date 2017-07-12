// @flow
import type { AppId } from '../algoliasearch/src/types';

type Hosts = {| read: string[], write: string[] |};

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

export default class RequestHosts {
  hosts: Hosts;
  readIndex: Number;
  writeIndex: Number;

  constructor(appId: AppId, extraHosts: Hosts) {
    const regularHosts = computeRegularHosts(appId);
    this.hosts = {
      read: [...regularHosts.read, ...extraHosts.read],
      write: [...regularHosts.write, ...extraHosts.write],
    };
    this.readIndex = 0;
    this.writeIndex = 0;
  }
  // to fix
  get read() {
    return this.hosts.read[this.readIndex];
  }

  get write() {
    return this.hosts.write[this.writeIndex];
  }
}
