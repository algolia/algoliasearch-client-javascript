import { run } from '../common';

/**
 * Returns the number of diff between a `branch` and its `HEAD` for the given `path`.
 * Head defaults to `HEAD`, providing `null` will check unstaged changes.
 */
export async function getNbGitDiff({
  branch,
  head = 'HEAD',
  path,
}: {
  branch: string;
  head?: string | null;
  path: string;
}): Promise<number> {
  const checkHead = head === null ? '' : `...${head}`;

  return parseInt(
    (
      await run(`git diff --shortstat ${branch}${checkHead} -- ${path} | wc -l`)
    ).trim(),
    10
  );
}
