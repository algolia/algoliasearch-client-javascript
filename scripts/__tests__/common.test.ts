import execa from 'execa';

import { gitCommit } from '../common';

jest.mock('execa');

describe('gitCommit', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('commits with message', () => {
    gitCommit({ message: 'chore: does something' });
    expect(execa).toHaveBeenCalledTimes(1);
    expect(execa).toHaveBeenCalledWith(
      'git',
      ['commit', '-m', 'chore: does something'],
      { cwd: expect.any(String) }
    );
  });

  it('commits with co-author', () => {
    gitCommit({
      message: 'chore: does something',
      coauthor: { name: 'some', email: 'random@person.com' },
    });
    expect(execa).toHaveBeenCalledTimes(1);
    expect(execa).toHaveBeenCalledWith(
      'git',
      [
        'commit',
        '-m',
        'chore: does something\n\n\nCo-authored-by: some <random@person.com>',
      ],
      { cwd: expect.any(String) }
    );
  });
});
