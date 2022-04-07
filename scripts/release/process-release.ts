/* eslint-disable no-console */
import fsp from 'fs/promises';

import dotenv from 'dotenv';
import execa from 'execa';
import { copy } from 'fs-extra';
import semver from 'semver';
import type { ReleaseType } from 'semver';

import openapitools from '../../openapitools.json';
import {
  ROOT_ENV_PATH,
  toAbsolutePath,
  run,
  exists,
  getGitHubUrl,
  gitCommit,
  emptyDirExceptForDotGit,
} from '../common';
import { getLanguageFolder } from '../config';

import {
  RELEASED_TAG,
  OWNER,
  REPO,
  TEAM_SLUG,
  getMarkdownSection,
  configureGitHubAuthor,
  cloneRepository,
  getOctokit,
  MAIN_PACKAGE,
} from './common';
import TEXT from './text';
import type {
  VersionsToRelease,
  BeforeClientGenerationCommand,
  BeforeClientCommitCommand,
} from './types';

dotenv.config({ path: ROOT_ENV_PATH });

const BEFORE_CLIENT_GENERATION: {
  [lang: string]: BeforeClientGenerationCommand;
} = {
  javascript: async ({ releaseType, dir }) => {
    await run(`yarn release:bump ${releaseType}`, { cwd: dir });
  },
};

const BEFORE_CLIENT_COMMIT: { [lang: string]: BeforeClientCommitCommand } = {
  javascript: async ({ dir }) => {
    // https://github.com/yarnpkg/berry/issues/2948
    await run(`YARN_ENABLE_IMMUTABLE_INSTALLS=false yarn`, { cwd: dir }); // generate `yarn.lock` file
  },
};

async function getIssueBody(): Promise<string> {
  const octokit = getOctokit(process.env.GITHUB_TOKEN!);
  const {
    data: { body },
  } = await octokit.rest.issues.get({
    owner: OWNER,
    repo: REPO,
    issue_number: Number(process.env.EVENT_NUMBER),
  });

  if (!body) {
    throw new Error(
      `Unexpected \`body\` of the release issue: ${JSON.stringify(body)}`
    );
  }
  return body;
}

function getDateStamp(): string {
  return new Date().toISOString().split('T')[0];
}

export function getVersionsToRelease(issueBody: string): VersionsToRelease {
  const versionsToRelease: VersionsToRelease = {};

  getMarkdownSection(issueBody, TEXT.versionChangeHeader)
    .split('\n')
    .forEach((line) => {
      const result = line.match(/- \[x\] (.+): v(.+) -> `(.+)`/);
      if (!result) {
        return;
      }
      const [, lang, current, releaseType] = result;
      if (!['major', 'minor', 'patch', 'prerelease'].includes(releaseType)) {
        throw new Error(
          `\`${releaseType}\` is unknown release type. Allowed: major, minor, patch, prerelease`
        );
      }
      versionsToRelease[lang] = {
        current,
        releaseType: releaseType as ReleaseType,
      };
    });

  return versionsToRelease;
}

async function updateOpenApiTools(
  versionsToRelease: VersionsToRelease
): Promise<void> {
  const nextUtilsPackageVersion = semver.inc(
    openapitools['generator-cli'].generators[MAIN_PACKAGE.javascript]
      .additionalProperties.utilsPackageVersion,
    versionsToRelease.javascript?.releaseType
  );

  Object.keys(openapitools['generator-cli'].generators).forEach((client) => {
    const lang = client.split('-')[0];
    if (versionsToRelease[lang]) {
      const additionalProperties =
        openapitools['generator-cli'].generators[client].additionalProperties;
      const releaseType = versionsToRelease[lang].releaseType;

      const newVersion = semver.inc(
        additionalProperties.packageVersion,
        releaseType
      );
      if (!newVersion) {
        throw new Error(
          `Failed to bump version ${additionalProperties.packageVersion} by ${releaseType}.`
        );
      }
      additionalProperties.packageVersion = newVersion;

      // In case we're not releasing javascript package,
      // we shouldn't bump the utils version.
      // At that time `nextUtilsPackageVersion` is undefined, and the following branch is skipped.
      if (lang === 'javascript' && nextUtilsPackageVersion) {
        additionalProperties.utilsPackageVersion = nextUtilsPackageVersion;
      }
    }
  });
  await fsp.writeFile(
    toAbsolutePath('openapitools.json'),
    JSON.stringify(openapitools, null, 2)
  );
}

async function updateChangelog({
  lang,
  issueBody,
  current,
  next,
}: {
  lang: string;
  issueBody: string;
  current: string;
  next: string;
}): Promise<void> {
  const changelogPath = toAbsolutePath(
    `${getLanguageFolder(lang)}/CHANGELOG.md`
  );
  const existingContent = (await exists(changelogPath))
    ? (await fsp.readFile(changelogPath)).toString()
    : '';
  const changelogHeader = `## [v${next}](${getGitHubUrl(
    lang
  )}/compare/v${current}...v${next})`;
  const newChangelog = getMarkdownSection(
    getMarkdownSection(issueBody, TEXT.changelogHeader),
    `### ${lang}`
  );
  await fsp.writeFile(
    changelogPath,
    [changelogHeader, newChangelog, existingContent].join('\n\n')
  );
}

async function isAuthorizedRelease(): Promise<boolean> {
  const octokit = getOctokit(process.env.GITHUB_TOKEN!);
  const { data: members } = await octokit.rest.teams.listMembersInOrg({
    org: OWNER,
    team_slug: TEAM_SLUG,
  });

  const { data: comments } = await octokit.rest.issues.listComments({
    owner: OWNER,
    repo: REPO,
    issue_number: Number(process.env.EVENT_NUMBER),
  });

  return comments.some(
    (comment) =>
      comment.body?.toLowerCase().trim() === 'approved' &&
      members.find((member) => member.login === comment.user?.login)
  );
}

async function processRelease(): Promise<void> {
  if (!process.env.GITHUB_TOKEN) {
    throw new Error('Environment variable `GITHUB_TOKEN` does not exist.');
  }

  if (!process.env.EVENT_NUMBER) {
    throw new Error('Environment variable `EVENT_NUMBER` does not exist.');
  }

  if (!(await isAuthorizedRelease())) {
    throw new Error(
      'The issue was not approved.\nA team member must leave a comment "approved" in the release issue.'
    );
  }

  const issueBody = await getIssueBody();
  const versionsToRelease = getVersionsToRelease(issueBody);

  await updateOpenApiTools(versionsToRelease);

  const langsToRelease = Object.keys(versionsToRelease);

  for (const lang of langsToRelease) {
    const { current, releaseType } = versionsToRelease[lang];
    /*
    About bumping versions of JS clients:

    There are generated clients in JS repo, and non-generated clients like `algoliasearch`, `client-common`, etc.
    Now that the versions of generated clients are updated in `openapitools.json`,
    the generation output will have correct new versions.
    
    However, we need to manually update versions of the non-generated (a.k.a. manually written) clients.
    In order to do that, we run `yarn release:bump <releaseType>` in this monorepo first.
    It will update the versions of the non-generated clients which exists in this monorepo.
    After that, we generate clients with new versions. And then, we copy all of them over to JS repository.
    */
    await BEFORE_CLIENT_GENERATION[lang]?.({
      releaseType,
      dir: toAbsolutePath(getLanguageFolder(lang)),
    });

    console.log(`Generating ${lang} client(s)...`);
    console.log(await run(`yarn cli generate ${lang}`));

    const next = semver.inc(current, releaseType);
    await updateChangelog({
      lang,
      issueBody,
      current,
      next: next!,
    });
  }

  // We push commits to each repository AFTER all the generations are done.
  // Otherwise, we will end up having broken release.
  for (const lang of langsToRelease) {
    const { tempGitDir } = await cloneRepository({
      lang,
      githubToken: process.env.GITHUB_TOKEN,
      tempDir: process.env.RUNNER_TEMP!,
    });

    const clientPath = toAbsolutePath(getLanguageFolder(lang));
    await emptyDirExceptForDotGit(tempGitDir);
    await copy(clientPath, tempGitDir, { preserveTimestamps: true });

    await configureGitHubAuthor(tempGitDir);
    await BEFORE_CLIENT_COMMIT[lang]?.({
      dir: tempGitDir,
    });
    await run(`git add .`, { cwd: tempGitDir });

    const { current, releaseType } = versionsToRelease[lang];
    const next = semver.inc(current, releaseType);
    await gitCommit({
      message: `chore: release v${next}`,
      cwd: tempGitDir,
    });
    await execa('git', ['tag', `v${next}`], { cwd: tempGitDir });
    await run(`git push --follow-tags`, { cwd: tempGitDir });
  }

  // Commit and push from the monorepo level.
  await configureGitHubAuthor();
  await run(`git add .`);
  const dateStamp = getDateStamp();
  await gitCommit({
    message: `chore: release ${dateStamp}`,
  });
  await run(`git push`);

  // remove old `released` tag
  await run(
    `git fetch origin refs/tags/${RELEASED_TAG}:refs/tags/${RELEASED_TAG}`
  );
  await run(`git tag -d ${RELEASED_TAG}`);
  await run(`git push --delete origin ${RELEASED_TAG}`);

  // create new `released` tag
  await run(`git tag released`);
  await run(`git push --tags`);
}

// JS version of `if __name__ == '__main__'`
if (require.main === module) {
  processRelease();
}
