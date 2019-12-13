import { StatefullHost, StatelessHost } from '.';

// If an host is down, it will remain down for 5 mins.
const DOWNTIME = 5 * 60 * 1000;

export function createUnavailableStatefullHost(host: StatelessHost): StatefullHost {
  return {
    ...host,
    downDate: Date.now(),
  };
}

export function createAvailableStatefullHost(host: StatelessHost): StatefullHost {
  return {
    ...host,
    downDate: 0,
  };
}

export function isStatefullHostUp(host: StatefullHost): boolean {
  return host.downDate === 0 || Date.now() - host.downDate > DOWNTIME;
}
