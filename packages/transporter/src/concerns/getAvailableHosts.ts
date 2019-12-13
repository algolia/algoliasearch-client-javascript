import { Cache } from '@algolia/cache-common';

import { isStatefullHostUp, StatelessHost } from '..';
import { createAvailableStatefullHost } from '../createStatefullHost';
import { createStatelessHost } from '../createStatelessHost';

export function getAvailableHosts(
  hostsCache: Cache,
  statelessHosts: readonly StatelessHost[]
  // eslint-disable-next-line functional/prefer-readonly-type
): Readonly<Promise<StatelessHost[]>> {
  return Promise.all(
    statelessHosts.map(statelessHost => {
      return hostsCache.get(statelessHost, () => {
        return Promise.resolve(createAvailableStatefullHost(statelessHost));
      });
    })
  ).then(statefulHosts => {
    const availableStatelessHosts = statefulHosts
      .filter(host => isStatefullHostUp(host))
      .map(host => createStatelessHost(host));

    if (availableStatelessHosts.length > 0) {
      return availableStatelessHosts;
    }

    // If no hosts availabe we return the original list of hosts.
    return statelessHosts.map(host => host);
  });
}
