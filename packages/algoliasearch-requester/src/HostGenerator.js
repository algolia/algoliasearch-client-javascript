// @flow
import type { AppId } from 'algoliasearch';
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

type Args = {|
  appId: AppId,
  extraHosts?: Hosts,
|};

export default class RequestHosts {
  hosts: Hosts;
  timeouts: Timeouts;
  appId: AppId;

  constructor({ appId, extraHosts = {} }: Args) {
    this.appId = appId;

    const regularHosts = computeRegularHosts(appId);
    // $FlowFixMe --> Flow doesn't recognize that I'm catching the undefined here
    const { read = [], write = [] } = extraHosts;

    this.hosts = {
      read: [...regularHosts.read, ...read],
      write: [...regularHosts.write, ...write],
    };
  }

  getHost({
    type,
    hostFailed,
  }: {
    type: 'read' | 'write',
    hostFailed: boolean,
  }): string {
    //  extraHosts ? use(extraHosts) : use(this.hosts)
    if (type !== 'read' && type !== 'write') {
      throw new Error(
        `You requested a host of type ${type}, but only 'read' or 'write' is a valid type.`
      );
    }

    if (this.hosts[type].length === 0) {
      this.hosts[type] = computeRegularHosts(this.appId)[type];
      throw new Error(`There are no hosts remaining for this app. 

You can retry this search, and it will try the hosts again. 

appId: ${this.appId}

see: https://alg.li/client#no-hosts-remaining`);
    }

    if (hostFailed) {
      return this.hosts[type].shift();
    } else {
      return this.hosts[type][0];
    }
  }
}
