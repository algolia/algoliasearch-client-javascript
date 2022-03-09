---
title: Release process
---

# Release process

## Part 1

You need a `GITHUB_TOKEN` in your [`.env`](https://github.com/algolia/api-clients-automation/blob/main/.env.example) file at the root of the repository. You can generate one from the [personal access token page](https://github.com/settings/tokens/new) with `Repo (Full control of private repositories)` scope.

```
GITHUB_TOKEN=<YOUR-PERSONAL-ACCESS-TOKEN>
```

Once setup, you can run

```bash
yarn release
```

It will create [a release issue](https://github.com/algolia/api-clients-automation/issues/220).

## Part 2

You need to review the release issue, in two parts:

1.  version changes
2.  CHANGELOGs

Any changes applied in the issue will be taken into account by the release process.

Clicking "Approved" to approve the release, and closing it, will trigger the [Part 3](#part-3).

## Part 3

The [GitHub action release](https://github.com/algolia/api-clients-automation/blob/main/.github/workflows/process-release.yml) is triggered. It generates clients and push changes to each language repository on their `next` branch.

This Part 3 runs conditionally according to what has been done in Part 2. Under "Version Changes" section of the release issue, if a language is checked, this Part 3 will creates a commit like `chore: release v<NEXT-VERSION>` in each repository. If it is not checked, it will create a commit like `chore: update repo <DATE-STAMP>`.

Each language repository should have their own release process, and should run only when the latest commit starts with `chore: release`. By doing so, we have a way to just update the repository, for example READMEs, without having to release.
