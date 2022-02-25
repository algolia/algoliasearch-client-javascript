/* eslint-disable no-console */
import fs from 'fs';

import dotenv from 'dotenv';
import execa from 'execa';

import openapitools from '../../openapitools.json';
import { toAbsolutePath, run } from '../common';

import { MAIN_BRANCH, OWNER, REPO, getMarkdownSection } from './common';
import TEXT from './text';

dotenv.config();

if (!process.env.GITHUB_TOKEN) {
  throw new Error('Environment variable `GITHUB_TOKEN` does not exist.');
}

if (!process.env.EVENT_NUMBER) {
  throw new Error('Environment variable `EVENT_NUMBER` does not exist.');
}

async function processRelease(): Promise<void> {
  const issueBody = JSON.parse(
    execa.sync('curl', [
      '-H',
      `Authorization: token ${process.env.GITHUB_TOKEN}`,
      `https://api.github.com/repos/${OWNER}/${REPO}/issues/${process.env.EVENT_NUMBER}`,
    ]).stdout
  ).body;

  if (
    !getMarkdownSection(issueBody, TEXT.approvalHeader)
      .split('\n')
      .find((line) => line.startsWith(`- [x] ${TEXT.approved}`))
  ) {
    throw new Error('The issue was not approved.');
  }

  const versionsToRelease = {};
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
      };
    });

  const langsToUpdateRepo = getMarkdownSection(
    issueBody,
    TEXT.versionChangeHeader
  )
    .split('\n')
    .map((line) => {
      const result = line.match(/- \[ \] (.+): v(.+) -> v(.+)/);
      return result?.[1];
    })
    .filter(Boolean); // e.g. ['javascript', 'php']

  // update versions in `openapitools.json`
  Object.keys(openapitools['generator-cli'].generators).forEach((client) => {
    const lang = client.split('-')[0];
    if (versionsToRelease[lang]) {
      openapitools['generator-cli'].generators[
        client
      ].additionalProperties.packageVersion = versionsToRelease[lang].next;
    }
  });
  fs.writeFileSync(
    toAbsolutePath('openapitools.json'),
    JSON.stringify(openapitools, null, 2)
  );

  // update changelogs
  new Set([...Object.keys(versionsToRelease), ...langsToUpdateRepo]).forEach(
    (lang) => {
      const filePath = toAbsolutePath(`docs/changelogs/${lang}.md`);
      const header = versionsToRelease[lang!]
        ? `## ${versionsToRelease[lang!].next}`
        : `## ${new Date().toISOString().split('T')[0]}`;
      const newChangelog = getMarkdownSection(
        getMarkdownSection(issueBody, TEXT.changelogHeader),
        `### ${lang}`
      );
      const existingContent = fs.readFileSync(filePath).toString();
      fs.writeFileSync(
        filePath,
        [header, newChangelog, existingContent].join('\n\n')
      );
    }
  );

  // commit openapitools and changelogs
  if (process.env.RELEASE_TEST !== 'true') {
    await run('git config user.name "api-clients-bot"');
    await run('git config user.email "bot@algolia.com"');
    await run('git add openapitools.json');
    await run('git add doc/changelogs/*');
    execa.sync('git', ['commit', '-m', TEXT.commitMessage]);
    await run(`git push origin ${MAIN_BRANCH}`);
  }

  // generate clients to release
  for (const lang of Object.keys(versionsToRelease)) {
    console.log(`Generating ${lang} client(s)...`);
    await run(`yarn cli generate ${lang}`);
  }

  // generate clients to just update the repos
  for (const lang of langsToUpdateRepo) {
    console.log(`Generating ${lang} client(s)...`);
    await run(`yarn cli generate ${lang}`, { verbose: true });
  }

  const clientPath = toAbsolutePath(
    'clients/dummy-algoliasearch-client-javascript'
  );
  const runInClient = (command: string, options = {}): Promise<string> =>
    run(command, {
      cwd: clientPath,
      ...options,
    });

  await runInClient(`git checkout next`);
  await run(
    `cp -r clients/algoliasearch-client-javascript/ clients/dummy-algoliasearch-client-javascript`
  );
  await runInClient(`git add .`);
  execa.sync('git', ['commit', '-m', 'chore: release test'], {
    cwd: clientPath,
  });
  await runInClient(`git push origin next`);
}

processRelease();
