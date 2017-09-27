// @flow
import type { Timeouts } from 'algoliasearch-requester';

function computeRegularTimeouts(): Timeouts {
  return {
    connect: 1 * 1000, // 500ms connect is GPRS latency
    read: 2 * 1000,
    write: 30 * 1000,
  };
}

export default class TimeoutGenerator {
  timeouts: Timeouts;
  constructor({ timeouts }: { timeouts: Timeouts }) {
    this.timeouts = {
      ...computeRegularTimeouts(),
      ...timeouts,
    };
  }

  getTimeout({
    retry = 0,
    type,
    extraTimeouts,
  }: {
    retry: number,
    type: $Keys<Timeouts>,
    extraTimeouts?: Timeouts,
  }): number {
    const timeout =
      extraTimeouts && extraTimeouts[type]
        ? extraTimeouts[type]
        : this.timeouts[type];

    return (1 + retry) * timeout;
  }
}
