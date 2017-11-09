// @flow
import type { AppId } from 'algoliasearch';
import type { Hosts, Timeouts } from 'algoliasearch-requester';

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

type Args = {|
  appID: AppId,
  extraHosts?: Hosts,
|};

export default class RequestHosts {
  hosts: {
    [key: 'read' | 'write']: {
      val: string[],
      index: number,
    },
  };
  appID: AppId;

  constructor({ appID, extraHosts = {} }: Args) {
    this.appID = appID;

    const regularHosts = computeRegularHosts(appID);
    // $FlowFixMe --> Flow doesn't recognize that I'm catching the undefined here
    const { read = [], write = [] } = extraHosts;

    this.hosts = {
      read: {
        val: [...regularHosts.read, ...read],
        index: 0,
      },
      write: {
        val: [...regularHosts.write, ...write],
        index: 0,
      },
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

    if (this.hosts[type].index > this.hosts[type].val.length) {
      this.hosts[type] = {
        val: computeRegularHosts(this.appID)[type],
        index: 0,
      };

      throw new Error(`There are no hosts remaining for this app. 

You can retry this search, and it will try the hosts again. 

appID: ${this.appID}

see: https://alg.li/client#no-hosts-remaining`);
    }

    if (hostFailed) {
      this.hosts[type].index++;
    }
    return this.hosts[type].val[this.hosts[type].index];
  }
}
