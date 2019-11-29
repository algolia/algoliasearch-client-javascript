import { CallEnum, createHost } from '../..';

describe('host', () => {
  it('handles uptime', () => {
    const host = createHost({
      url: 'foo',
      accept: CallEnum.Any,
    });

    expect(host.isUp()).toBe(true);

    host.setAsDown();

    expect(host.isUp()).toBe(false);
  });

  it('is up if TTL was expired', () => {
    const host = createHost({
      url: 'foo',
      accept: CallEnum.Any,
    });

    host.setAsDown();

    host.downDate = host.downDate - 300 * 1000 + 10; // not up yet.

    expect(host.isUp()).toBe(false);
    expect(host.up).toBe(false);

    host.downDate -= 20; // must be up now.

    expect(host.isUp()).toBe(true);
    expect(host.up).toBe(true);
  });
});
