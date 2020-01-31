import { Cache } from '@algolia/cache-common';

import {
  createStatefulHost,
  createStatelessHost,
  isStatefulHostTimeouted,
  isStatefulHostUp,
  StatelessHost,
} from '..';

export type RetryableOptions = {
  readonly statelessHosts: readonly StatelessHost[];
  readonly getTimeout: (retryCount: number, timeout: number) => number;
};

export function createRetryableOptions(
  hostsCache: Cache,
  statelessHosts: readonly StatelessHost[]
): Readonly<Promise<RetryableOptions>> {
  return Promise.all(
    statelessHosts.map(statelessHost => {
      return hostsCache.get(statelessHost, () => {
        return Promise.resolve(createStatefulHost(statelessHost));
      });
    })
  ).then(statefulHosts => {
    const hostsUp = statefulHosts.filter(host => isStatefulHostUp(host));
    const hostsTimeouted = statefulHosts.filter(host => isStatefulHostTimeouted(host));

    /**
     * Note, we put the hosts that previously timeouted on the end of the list.
     */
    const hostsAvailable = [...hostsUp, ...hostsTimeouted];

    const statelessHostsAvailable =
      hostsAvailable.length > 0
        ? hostsAvailable.map(host => createStatelessHost(host))
        : statelessHosts;

    return {
      getTimeout(timeoutsCount: number, baseTimeout: number): number {
        /**
         * Imagine that you have 4 hosts, if timeouts will increase
         * on the following way: 1 (timeouted) > 4 (timeouted) > 5 (200)
         *
         * Note that, the very next request, we start from the previous timeout
         *
         *  5 (timeouted) > 6 (timeouted) > 7 ...
         *
         * This strategy may need to be reviewed, but is the strategy on the our
         * current v3 version.
         */
        const timeoutMultiplier =
          hostsTimeouted.length === 0 && timeoutsCount === 0
            ? 1
            : hostsTimeouted.length + 3 + timeoutsCount;

        return timeoutMultiplier * baseTimeout;
      },
      statelessHosts: statelessHostsAvailable,
    };
  });
}
