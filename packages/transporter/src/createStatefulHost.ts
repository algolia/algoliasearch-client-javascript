import { HostStatusType, StatefulHost, StatelessHost } from '.';
import { HostStatusEnum } from './types';

// By default, API Clients at Algolia have expiration delay
// of 5 mins. In the JavaScript client, we have 2 mins.
const EXPIRATION_DELAY = 2 * 60 * 1000;

export function createStatefulHost(
  host: StatelessHost,
  status: HostStatusType = HostStatusEnum.Up
): StatefulHost {
  return {
    ...host,
    status,
    lastUpdate: Date.now(),
  };
}

export function isStatefulHostUp(host: StatefulHost): boolean {
  return host.status === HostStatusEnum.Up || Date.now() - host.lastUpdate > EXPIRATION_DELAY;
}

export function isStatefulHostTimeouted(host: StatefulHost): boolean {
  return (
    host.status === HostStatusEnum.Timeouted && Date.now() - host.lastUpdate <= EXPIRATION_DELAY
  );
}
