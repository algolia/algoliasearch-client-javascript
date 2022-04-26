---
title: Commit and Pull-request
---

# Commit and Pull-request

## Commit

If you accidentally include generated files in your commit, the `pre-commit` hook will automatically unstage them.

We create commits on the CI as well, and in that case, we skip this unstaging behavior with the environment variable `CI=true` given.

If you want to change the patterns of generated file paths, see [config/generation.config.js](https://github.com/algolia/api-clients-automation/blob/main/config/generation.config.js).

## Pull-request

Semantic title is required. It's validated by [GitHub Action](https://github.com/deepakputhraya/action-pr-title). See [pr-title.yml](https://github.com/algolia/api-clients-automation/blob/main/.github/workflows/pr-title.yml) for the complete regular expressions.
