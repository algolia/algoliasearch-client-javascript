import { StatefullHost, StatelessHost } from '.';

// If an host is down, it will remain down for 5 mins.
const DOWNTIME = 5 * 60 * 1000;

export function createUnavailableStatefullHost(host: StatelessHost): StatefullHost {
  return {
    ...host,
    lastDownDate: Date.now(),
  };
}

export function createAvailableStatefullHost(host: StatelessHost): StatefullHost {
  return {
    ...host,
    lastDownDate: 0,
  };
}

export function isStatefullHostUp(host: StatefullHost): boolean {
  return host.lastDownDate === 0 || Date.now() - host.lastDownDate > DOWNTIME;
}
