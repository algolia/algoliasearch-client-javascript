import { Cache } from '@algolia/cache-common';

import { Host } from '..';

export function getAvailableHosts(
  hostsCache: Cache,
  statelessHosts: readonly Host[]
  /* eslint-disable functional/prefer-readonly-type */
): Readonly<Promise<Host[]>> {
  return Promise.all(
    statelessHosts.map(host =>
      hostsCache
        .get({ url: host.url }, () => Promise.resolve(host))
        .then((hit: Host) => {
          // eslint-disable-next-line functional/immutable-data
          return Object.assign(host, {
            downDate: hit.downDate,
            up: hit.up,
          });
        })
    )
  ).then(statefulHosts => statefulHosts.filter(host => host.isUp()).reverse());
}
