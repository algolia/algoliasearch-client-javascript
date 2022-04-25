#!/usr/bin/env node
/* eslint-disable no-console */
/* eslint-disable import/no-commonjs */
/* eslint-disable @typescript-eslint/no-var-requires */
const chalk = require('chalk');
const execa = require('execa');
const micromatch = require('micromatch');

const GENERATED_FILE_PATTERNS =
  require('../../../config/generation.config').patterns;

const run = async (command, { cwd } = {}) => {
  return (
    (await execa.command(command, { shell: 'bash', all: true, cwd })).all ?? ''
  );
};

function createMemoizedMicromatchMatcher(patterns = []) {
  const exactMatchers = [];
  const positiveMatchers = [];
  const negativeMatchers = [];

  patterns.forEach((pattern) => {
    if (pattern.startsWith('!')) {
      // Patterns starting with `!` are negated
      negativeMatchers.push(micromatch.matcher(pattern.slice(1)));
    } else if (!pattern.includes('*')) {
      exactMatchers.push(micromatch.matcher(pattern));
    } else {
      positiveMatchers.push(micromatch.matcher(pattern));
    }
  });

  return function matcher(str) {
    if (exactMatchers.some((match) => match(str))) {
      return true;
    }

    // As `some` returns false on empty array, test will always fail if we only
    // provide `negativeMatchers`. We fallback to `true` is it's the case.
    const hasPositiveMatchers =
      Boolean(positiveMatchers.length === 0 && negativeMatchers.length) ||
      positiveMatchers.some((match) => match(str));

    return hasPositiveMatchers && !negativeMatchers.some((match) => match(str));
  };
}

async function preCommit() {
  const stagedFiles = (await run('git diff --name-only --cached')).split('\n');
  const deletedFiles = new Set(
    (await run('git diff --name-only --staged --diff-filter=D')).split('\n')
  );
  const matcher = createMemoizedMicromatchMatcher(GENERATED_FILE_PATTERNS);

  for (const stagedFile of stagedFiles) {
    // keep the deleted files staged even if they were generated before.
    if (deletedFiles.has(stagedFile)) {
      continue;
    }

    if (!matcher(stagedFile)) {
      continue;
    }

    console.log(
      chalk.bgYellow('[INFO]'),
      `Generated file found, unstaging: ${stagedFile}`
    );

    await run(`git restore --staged ${stagedFile}`);
  }
}

if (require.main === module && !process.env.CI) {
  preCommit();
}

module.exports = {
  createMemoizedMicromatchMatcher,
};
