import { CallType, Host } from '.';

export function createHost(url: string, accept: CallType): Host {
  const ttl = 3000;

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
      if (!host.up && Date.now() - host.downDate > ttl) {
        // eslint-disable-next-line functional/immutable-data
        host.up = true;
      }

      return host.up;
    },
  };

  return host;
}
