import { Host } from '../../Host';
import { CallType } from '../../CallType';

describe('Host', () => {
  it('Handles uptime', () => {
    const host = new Host({
      url: 'foo',
      accept: CallType.Any,
    });

    expect(host.isUp()).toBe(true);

    host.setAsDown();

    expect(host.isUp()).toBe(false);

    // @todo test is up mocking the global date.
  });
});
