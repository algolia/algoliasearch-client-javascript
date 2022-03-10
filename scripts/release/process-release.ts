/* eslint-disable no-console */
import fsp from 'fs/promises';

import dotenv from 'dotenv';
import execa from 'execa';

import openapitools from '../../openapitools.json';
import {
  ROOT_ENV_PATH,
  toAbsolutePath,
  run,
  exists,
  getGitHubUrl,
} from '../common';
import { getLanguageFolder } from '../config';

import {
  RELEASED_TAG,
  OWNER,
  REPO,
  getMarkdownSection,
  getGitAuthor,
  getTargetBranch,
} from './common';
import TEXT from './text';

dotenv.config({ path: ROOT_ENV_PATH });

if (!process.env.GITHUB_TOKEN) {
  throw new Error('Environment variable `GITHUB_TOKEN` does not exist.');
}

if (!process.env.EVENT_NUMBER) {
  throw new Error('Environment variable `EVENT_NUMBER` does not exist.');
}

function getIssueBody(): string {
  return JSON.parse(
    execa.sync('curl', [
      '-H',
      `Authorization: token ${process.env.GITHUB_TOKEN}`,
      `https://api.github.com/repos/${OWNER}/${REPO}/issues/${process.env.EVENT_NUMBER}`,
    ]).stdout
  ).body;
}

type VersionsToRelease = {
  [lang: string]: {
    current: string;
    next: string;
    dateStamp: string;
  };
};

function getDateStamp(): string {
  return new Date().toISOString().split('T')[0];
}

function getVersionsToRelease(issueBody: string): VersionsToRelease {
  const versionsToRelease: VersionsToRelease = {};
  const dateStamp = getDateStamp();

  getMarkdownSection(issueBody, TEXT.versionChangeHeader)
    .split('\n')
    .forEach((line) => {
      const result = line.match(/- \[x\] (.+): v(.+) -> v(.+)/);
      if (!result) {
        return;
      }
      const [, lang, current, next] = result;
      versionsToRelease[lang] = {
        current,
        next,
        dateStamp,
      };
    });

  return versionsToRelease;
}

function getLangsToUpdateRepo(issueBody: string): string[] {
  return getMarkdownSection(issueBody, TEXT.versionChangeHeader)
    .split('\n')
    .map((line) => {
      const result = line.match(/- \[ \] (.+): v(.+) -> v(.+)/);
      return result?.[1];
    })
    .filter(Boolean) as string[];
}

async function updateOpenApiTools(
  versionsToRelease: VersionsToRelease
): Promise<void> {
  Object.keys(openapitools['generator-cli'].generators).forEach((client) => {
    const lang = client.split('-')[0];
    if (versionsToRelease[lang]) {
      openapitools['generator-cli'].generators[
        client
      ].additionalProperties.packageVersion = versionsToRelease[lang].next;
    }
  });
  await fsp.writeFile(
    toAbsolutePath('openapitools.json'),
    JSON.stringify(openapitools, null, 2)
  );
}

async function configureGitHubAuthor(cwd?: string): Promise<void> {
  await run(`git config user.name "${getGitAuthor().name}"`, { cwd });
  await run(`git config user.email "${getGitAuthor().email}"`, {
    cwd,
  });
}

async function processRelease(): Promise<void> {
  const issueBody = getIssueBody();

  if (
    !getMarkdownSection(issueBody, TEXT.approvalHeader)
      .split('\n')
      .find((line) => line.startsWith(`- [x] ${TEXT.approved}`))
  ) {
    throw new Error('The issue was not approved.');
  }

  const versionsToRelease = getVersionsToRelease(issueBody);
  const langsToUpdateRepo = getLangsToUpdateRepo(issueBody); // e.g. ['javascript', 'php']

  await updateOpenApiTools(versionsToRelease);

  await configureGitHubAuthor();

  // commit openapitools and changelogs
  await run('git add openapitools.json');

  const langsToReleaseOrUpdate = [
    ...Object.keys(versionsToRelease),
    ...langsToUpdateRepo,
  ];

  const willReleaseLibrary = (lang: string): boolean =>
    Boolean(versionsToRelease[lang]);

  for (const lang of langsToReleaseOrUpdate) {
    // prepare the submodule
    console.log(`Generating ${lang} client(s)...`);
    console.log(await run(`yarn cli generate ${lang}`));

    const { current, next, dateStamp } = versionsToRelease[lang];

    // update changelog
    const changelogPath = toAbsolutePath(
      `${getLanguageFolder(lang)}/CHANGELOG.md`
    );
    const existingContent = (await exists(changelogPath))
      ? (await fsp.readFile(changelogPath)).toString()
      : '';
    const changelogHeader = willReleaseLibrary(lang)
      ? `## [v${next}](${getGitHubUrl(lang)}/compare/v${current}...v${next})`
      : `## ${dateStamp}`;
    const newChangelog = getMarkdownSection(
      getMarkdownSection(issueBody, TEXT.changelogHeader),
      `### ${lang}`
    );
    await fsp.writeFile(
      changelogPath,
      [changelogHeader, newChangelog, existingContent].join('\n\n')
    );

    await run(`git add ${changelogPath}`);
  }

  // We push commits from submodules AFTER all the generations are done.
  // Otherwise, we will end up having broken release.
  for (const lang of langsToReleaseOrUpdate) {
    const clientPath = toAbsolutePath(getLanguageFolder(lang));
    const targetBranch = getTargetBranch(lang);

    const gitHubUrl = getGitHubUrl(lang, { token: process.env.GITHUB_TOKEN });
    const tempGitDir = `${process.env.RUNNER_TEMP}/${lang}`;
    await run(`rm -rf ${tempGitDir}`);
    await run(
      `git clone --depth 1 --branch ${targetBranch} ${gitHubUrl} ${tempGitDir}`
    );

    await run(`cp -r ${clientPath}/ ${tempGitDir}`);
    await configureGitHubAuthor(tempGitDir);
    await run(`git add .`, { cwd: tempGitDir });

    const { next, dateStamp } = versionsToRelease[lang];

    if (willReleaseLibrary(lang)) {
      await execa('git', ['commit', '-m', `chore: release ${next}`], {
        cwd: tempGitDir,
      });
      if (process.env.VERSION_TAG_ON_RELEASE === 'true') {
        await execa('git', ['tag', `v${next}`], { cwd: tempGitDir });
        await run(`git push --tags`, { cwd: tempGitDir });
      }
    } else {
      await execa('git', ['commit', '-m', `chore: update repo ${dateStamp}`], {
        cwd: tempGitDir,
      });
    }
    await run(`git push`, { cwd: tempGitDir });
  }

  // Commit and push from the monorepo level.
  await execa('git', ['commit', '-m', `chore: release ${getDateStamp()}`]);
  await run(`git push`);

  // remove old `released` tag
  await run(`git fetch origin refs/tags/released:refs/tags/released`);
  await run(`git tag -d ${RELEASED_TAG}`);
  await run(`git push --delete origin ${RELEASED_TAG}`);

  // create new `released` tag
  await run(`git tag released`);
  await run(`git push --tags`);
}

processRelease();
