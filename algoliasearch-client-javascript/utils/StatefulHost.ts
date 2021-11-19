import type { Host } from './types';

const EXPIRATION_DELAY = 2 * 60 * 1000;

export class StatefulHost implements Host {
  url: string;
  accept: 'read' | 'write' | 'readWrite';
  protocol: 'http' | 'https';

  private lastUpdate: number;
  private status: 'up' | 'down' | 'timedout';

  constructor(host: Host, status: StatefulHost['status'] = 'up') {
    this.url = host.url;
    this.accept = host.accept;
    this.protocol = host.protocol;

    this.status = status;
    this.lastUpdate = Date.now();
  }

  isUp(): boolean {
    return this.status === 'up' || Date.now() - this.lastUpdate > EXPIRATION_DELAY;
  }

  isTimedout(): boolean {
    return this.status === 'timedout' && Date.now() - this.lastUpdate <= EXPIRATION_DELAY;
  }
}
