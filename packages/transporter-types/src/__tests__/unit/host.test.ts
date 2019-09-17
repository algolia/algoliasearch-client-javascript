import { Host } from '../../Host';
import { Call } from '../../Call';

describe('Host', () => {
  it('Handles uptime', () => {
    const host = new Host({
      url: 'foo',
      accept: Call.Any,
    });

    expect(host.isUp()).toBe(true);

    host.setAsDown();

    expect(host.isUp()).toBe(false);
  });

  it('is up if TTL was expired', () => {
    const host = new Host({
      url: 'foo',
      accept: Call.Any,
    });

    host.setAsDown();

    host.downDate = host.downDate - 3000 + 10; // not up yet.

    expect(host.isUp()).toBe(false);
    expect(host.up).toBe(false);

    host.downDate -= 20; // must be up now.

    expect(host.isUp()).toBe(true);
    expect(host.up).toBe(true);
  });
});
