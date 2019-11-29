import { CallType, Host } from '.';

// If an host is down, it will remain down for 5 mins.
const DOWNTIME = 5 * 60 * 1000;

export function createHost(url: string, accept: CallType): Host {
  const host: Host = {
    url,
    accept,
    downDate: 0,
    up: true,
    setAsDown(): void {
      // eslint-disable-next-line functional/immutable-data
      host.downDate = Date.now();
      // eslint-disable-next-line functional/immutable-data
      host.up = false;
    },

    isUp(): boolean {
      if (!host.up && Date.now() - host.downDate > DOWNTIME) {
        // eslint-disable-next-line functional/immutable-data
        host.up = true;
      }

      return host.up;
    },
  };

  return host;
}
