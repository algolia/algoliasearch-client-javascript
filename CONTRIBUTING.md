# algoliasearch contributing guide

Hello and welcome to the contributing guide for algoliasearch. Thanks for considering participating in our project 🙇

If this guide does not contain what you are looking for and thus prevents you from contributing, don't hesitate to leave a message on the [community forum](https://discourse.algolia.com/) or to [open an issue](https://github.com/algolia/algoliasearch-client-javascript/issues).

## Reporting an issue

Opening an issue is very effective way to contribute because many users might also be impacted. We'll make sure to fix it quickly if it's technically feasible and doesn't have important side effects for other users.

Before reporting an issue, first check that there is not an already open issue for the same topic using the [issues page](https://github.com/algolia/algoliasearch-client-javascript/issues). Don't hesitate to thumb up an issue that corresponds to the problem you have.

Another element that will help us go faster at solving the issue is to provide a reproducible test case.

## The code contribution process

algoliasearch is developed in TypeScript. For any code contribution, you need to:

- Fork and clone the project
- Create a new branch for what you want to solve (fix/_issue-number_, feat/_name-of-the-feature_)
- Make your changes
- Open a pull request

Depending on what you're working on, you might consider different [base branches](#branch-organization).

Then:

- Peer review of the pull request (by at least one of the core contributors)
- Automatic checks (tests, [commits](#commit-conventions), [linters](#linting))
- When everything is green, your contribution is merged 🚀

## Commit conventions

This project follows the [conventional changelog](https://conventionalcommits.org/) approach. This means that all commit messages should be formatted using the following scheme:

```
type(scope): description
```

In most cases, we use the following types:

- `fix`: for any resolution of an issue (identified or not)
- `feat`: for any new feature
- `refactor`: for any code change that neither adds a feature nor fixes an issue
- `docs`: for any documentation change or addition
- `chore`: for anything that is not related to the library itself (doc, tooling)

Even though the scope is optional, we try to fill it in as it helps us better understand the impact of a change. We either use the name of the widget/connector/component impacted or we use impact topic (e.g. `docs`, `tooling`, `deps`, `ci`).

Finally, if your work is based on an issue on GitHub, please add in the body of the commit message "fix #1234" if it solves the issue #1234 (read "[Closing issues using keywords](https://help.github.com/en/articles/closing-issues-using-keywords)").

Some examples of valid commit messages (used as first lines):

> - fix(searchbox): increase magnifying glass size
> - chore(deps): update dependency rollup-plugin-babel to v3.0.7
> - fix(connectRefinementList): set default value for limit
> - chore: reword contributions guides

## Branch organization

The project is based on the classic GitHub flow:

- `master` for the current version being worked on – Pull requests for bugs and feature related to the current major version should be created against this branch
- `vX` for each major version (`X` being a number) – Pull requests for critical bug fixes should be created against this branch

Most of the time, your pull requests should target the `master` branch.

_Note that no new features will be developed or backported for the `vX` branches._

## Requirements

### Docker

If you don't want to install dependencies on your host machine, you can follow this [guide](https://github.com/algolia/algoliasearch-client-javascript/blob/master/DOCKER_README.MD) to run code inside a docker container but keep the source files on your favorite IDE.

### Host machine

To run this project, you will need:

- Node.js ≥ 12 (current stable version) – [nvm](https://github.com/creationix/nvm#install-script) is recommended
- [Yarn](https://yarnpkg.com)

## Linting

Linters are static checkers for code. They help us maintain a consistent code base. They are used for JavaScript and TypeScript files.

If your editor support them, then you will see the errors directly there. You can also run them using your command line:

```sh
yarn lint
```

TypeScript files are validated using a combination of [Prettier](https://github.com/prettier/prettier) (strict syntax form) and [ESLint](https://github.com/eslint/eslint) rules (for common mistakes and patterns). We also use [API extractor](https://api-extractor.com) to validate the correct exported types.

## Release

### Main version

To release a stable version, [generate a personal Github token](https://github.com/settings/tokens/new) with the `repo` scope from your logged-in Github account, go on the `master` branch (`git checkout master`) and use:

```sh
export GITHUB_TOKEN=XXX # You can add this to your .env or .bashrc/.zshrc configuration file.
yarn release
```

This will create a new Github PR proposing a PR to be made. Once merged, the CI will take care of publishing the new version on NPM registry.

If you're part of the Algolia team, you can read more details [here](https://algolia.atlassian.net/wiki/spaces/DX/pages/2034925622/JavaScript+v4+release+process).
