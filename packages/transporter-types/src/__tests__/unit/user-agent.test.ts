import { UserAgent } from '../../UserAgent';

describe('UserAgent', () => {
  it('contains a default value', () => {
    expect(UserAgent.create('1.0.0').value).toEqual('Algolia for Javascript (1.0.0)');
  });

  it('allows to add other api clients', () => {
    expect(
      UserAgent.create('1.0.0').with({
        segment: 'React Native',
        version: '2.0.0',
      }).value
    ).toEqual('Algolia for Javascript (1.0.0); React Native (2.0.0)');
  });
});
