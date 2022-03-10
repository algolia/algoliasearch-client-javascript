/* eslint-disable no-console */
import { Octokit } from '@octokit/rest';
import dotenv from 'dotenv';
import semver from 'semver';

import { GENERATORS, LANGUAGES, ROOT_ENV_PATH, run } from '../common';

import { RELEASED_TAG, MAIN_BRANCH, OWNER, REPO } from './common';
import TEXT from './text';

dotenv.config({ path: ROOT_ENV_PATH });

type Version = {
  current: string;
  next?: string | null;
  noCommit?: boolean;
  skipRelease?: boolean;
};

type Versions = {
  [lang: string]: Version;
};

function readVersions(): Versions {
  const versions = {};

  Object.values(GENERATORS).forEach((gen) => {
    if (!versions[gen.language]) {
      versions[gen.language] = {
        current: gen.additionalProperties?.packageVersion,
        next: undefined,
      };
    }
  });
  return versions;
}

export function getVersionChangesText(versions: Versions): string {
  return LANGUAGES.map((lang) => {
    const { current, next, noCommit, skipRelease } = versions[lang];

    if (noCommit) {
      return `- ~${lang}: v${current} (${TEXT.noCommit})~`;
    }

    if (!current) {
      return `- ~${lang}: (${TEXT.currentVersionNotFound})~`;
    }

    const checked = skipRelease ? ' ' : 'x';
    return [
      `- [${checked}] ${lang}: v${current} -> v${next}`,
      skipRelease && TEXT.descriptionForSkippedLang,
    ]
      .filter(Boolean)
      .join('\n');
  }).join('\n');
}

type PassedCommit = {
  hash: string;
  type: string;
  lang: string;
  message: string;
  raw: string;
};

type Commit =
  | PassedCommit
  | { error: 'missing-language-scope' }
  | { error: 'unknown-language-scope' };

export function parseCommit(commit: string): Commit {
  const hash = commit.slice(0, 7);
  let message = commit.slice(8);
  let type = message.slice(0, message.indexOf(':'));
  const matchResult = type.match(/(.+)\((.+)\)/);
  if (!matchResult) {
    return {
      error: 'missing-language-scope',
    };
  }
  message = message.slice(message.indexOf(':') + 1).trim();
  type = matchResult[1];
  const lang = matchResult[2];

  if (!LANGUAGES.includes(lang)) {
    return { error: 'unknown-language-scope' };
  }

  return {
    hash,
    type, // `fix` | `feat` | `chore` | ...
    lang, // `javascript` | `php` | `java` | ...
    message,
    raw: commit,
  };
}

export function decideReleaseStrategy({
  versions,
  commits,
}: {
  versions: Versions;
  commits: PassedCommit[];
}): Versions {
  const ret: Versions = { ...versions };

  LANGUAGES.forEach((lang) => {
    const commitsPerLang = commits.filter((commit) => commit.lang === lang);
    const currentVersion = versions[lang].current;

    if (commitsPerLang.length === 0) {
      ret[lang].next = currentVersion;
      ret[lang].noCommit = true;
      return;
    }

    if (semver.prerelease(currentVersion)) {
      // if version is like 0.1.2-beta.1, it increases to 0.1.2-beta.2, even if there's a breaking change.
      ret[lang].next = semver.inc(currentVersion, 'prerelease');
      return;
    }

    if (
      commitsPerLang.some((commit) =>
        commit.message.includes('BREAKING CHANGE')
      )
    ) {
      ret[lang].next = semver.inc(currentVersion, 'major');
      return;
    }

    const commitTypes = new Set(commitsPerLang.map(({ type }) => type));
    if (commitTypes.has('feat')) {
      ret[lang].next = semver.inc(currentVersion, 'minor');
      return;
    }

    ret[lang].next = semver.inc(currentVersion, 'patch');
    if (!commitTypes.has('fix')) {
      ret[lang].skipRelease = true;
    }
  });

  return ret;
}

async function createReleaseIssue(): Promise<void> {
  if (!process.env.GITHUB_TOKEN) {
    throw new Error('Environment variable `GITHUB_TOKEN` does not exist.');
  }

  if ((await run('git rev-parse --abbrev-ref HEAD')) !== MAIN_BRANCH) {
    throw new Error(
      `You can run this script only from \`${MAIN_BRANCH}\` branch.`
    );
  }

  if (await run('git status --porcelain')) {
    throw new Error(
      'Working directory is not clean. Commit all the changes first.'
    );
  }

  await run(`git rev-parse --verify refs/tags/${RELEASED_TAG}`, {
    errorMessage: '`released` tag is missing in this repository.',
  });

  console.log('Pulling from origin...');
  run(`git pull`);

  console.log('Pushing to origin...');
  run(`git push`);

  const commitsWithUnknownLanguageScope: string[] = [];
  const commitsWithoutLanguageScope: string[] = [];

  // Reading commits since last release
  const latestCommits = (
    await run(`git log --oneline ${RELEASED_TAG}..${MAIN_BRANCH}`)
  )
    .split('\n')
    .filter(Boolean)
    .map((commitMessage) => {
      const commit = parseCommit(commitMessage);

      if ('error' in commit) {
        if (commit.error === 'missing-language-scope') {
          commitsWithoutLanguageScope.push(commitMessage);
          return undefined;
        }

        if (commit.error === 'unknown-language-scope') {
          commitsWithUnknownLanguageScope.push(commitMessage);
          return undefined;
        }
      }

      return commit;
    })
    .filter(Boolean) as PassedCommit[];

  console.log('[INFO] Skipping these commits due to lack of language scope:');
  console.log(
    commitsWithoutLanguageScope.map((commit) => `  ${commit}`).join('\n')
  );

  console.log('');
  console.log('[INFO] Skipping these commits due to unknown language scope:');
  console.log(
    commitsWithUnknownLanguageScope.map((commit) => `  ${commit}`).join('\n')
  );

  const versions = decideReleaseStrategy({
    versions: readVersions(),
    commits: latestCommits,
  });

  const versionChanges = getVersionChangesText(versions);

  const changelogs = LANGUAGES.filter(
    (lang) => !versions[lang].noCommit && versions[lang].current
  )
    .flatMap((lang) => {
      if (versions[lang].noCommit) {
        return [];
      }

      return [
        `### ${lang}`,
        ...latestCommits
          .filter((commit) => commit.lang === lang)
          .map((commit) => `- ${commit.raw}`),
      ];
    })
    .join('\n');

  const body = [
    TEXT.header,
    TEXT.versionChangeHeader,
    versionChanges,
    TEXT.descriptionVersionChanges,
    TEXT.changelogHeader,
    TEXT.changelogDescription,
    changelogs,
    TEXT.approvalHeader,
    TEXT.approval,
  ].join('\n\n');

  const octokit = new Octokit({
    auth: `token ${process.env.GITHUB_TOKEN}`,
  });

  octokit.rest.issues
    .create({
      owner: OWNER,
      repo: REPO,
      title: `chore: release ${new Date().toISOString().split('T')[0]}`,
      body,
    })
    .then((result) => {
      const {
        data: { number, html_url: url },
      } = result;

      console.log('');
      console.log(`Release issue #${number} is ready for review.`);
      console.log(`  > ${url}`);
    });
}

if (require.main === module) {
  createReleaseIssue();
}
