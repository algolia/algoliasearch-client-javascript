---
title: Add a new client
---

# Add a new client

Adding a client requires a few manual steps in order to setup the tooling, generation scripts and properly generate the code. We recommend getting inspirations from existing clients such as `javascript-recommend`.

> See the [Setup repository guide](/docs/setupRepository) to [`setup the repository tooling`](/docs/setupRepository#setup-the-repository-tooling).

## 1. Writing specs

We recommend to have a look at [existing spec files](https://github.com/algolia/api-clients-automation/blob/main/specs/). The `bundled` folder is automatically generated, manual changes shouldn't be done in these files.

### [common spec folder](https://github.com/algolia/api-clients-automation/blob/main/specs/common/)

Properties that are common to Algolia or used in multiple clients.

### `<clientName>` spec folder

> Example with the [search client spec](https://github.com/algolia/api-clients-automation/blob/main/specs/search/)

#### `spec.yml` file

This file is the entry point of the client spec, it contains `servers`, `paths` and other specific imformations of the API. We recommend to copy an existing [`spec.yml` file](https://github.com/algolia/api-clients-automation/blob/main/specs/search/spec.yml) to get started.

#### `<clientName>`/common folder

Properties that are common to the client.

#### `<clientName>`/paths folder

Path definition of the paths defined in the [spec file](#specyml-file)

#### Guidelines

- **Endpoints**: Each file should contain `operationId`s for a single endpoint, but multiple methods are allowed.
- **Name**: If the path file only contain one method, we name the file same as the `operationId`, but we try to make it less specific if there is multiple.
- **Description/Summary**: `operationId`s must have both description and summary.
- **Tags**: The `tags` must match the `<clientName>` spec folder.
- **Complex objects**: Complex objects (nested arrays, nested objects, etc.) must be referenced (`$ref`) in the `operantionId` file and not inlined. This is required to provide a great naming.

## 2. Configuring the environment

After setting up the dev environment from [README](/docs/setupRepository) and [writing your spec files](#1-writing-specs), you need to update the configuration files to properly generate clients that are maintainable.

### Generation config

[openapitools.json](https://github.com/algolia/api-clients-automation/blob/main/openapitools.json) hosts the configuration of all of the generated clients with their available languages.

#### `generators`

Generators are referenced by key with the following pattern `<languageName>-<clientName>`.

> TODO: Automate this step.

You can copy an existing object of a client and replace the `<clientName>` value with the one you'd like to generate.

| Option             |  Type   |  Language  |             Example             | Definition                                                                                                                                      |
| ------------------ | :-----: | :--------: | :-----------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------- |
| output             | string  |   Common   | `path/to/client/client-sources` | The output path of the client.                                                                                                                  |
| glob               | string  |   Common   |   `path/to/spec/sources.yml`    | The path of the bundled spec file.                                                                                                              |
| gitRepoId          | string  |   Common   |  `algoliasearch-client-java-2`  | The name of the repository under the Algolia org.                                                                                               |
| apiName            | string  | JavaScript |            `search`             | The lowercase name of the exported API.                                                                                                         |
| capitalizedApiName | string  | JavaScript |            `Search`             | The capitalized name of the exported API.                                                                                                       |
| packageVersion     | string  | JavaScript |             `1.2.3`             | The version you'd like to publish the first iteration of the generated client. It will be automatically incremented.                            |
| packageName        | string  |   common   |         `AlgoliaSearch`         | Name of the API package, used in [CTS](/docs/commonTestSuite).                                                                                  |
| hasRegionalHost    | boolean |   common   |             `false`             | Automatically guessed from `servers` in spec. `undefined` implies that hosts used will required the `appId`, regional hosts are used otherwise. |
| isDeHost           | boolean |   common   |             `false`             | Automatically guessed from `servers` in spec. `undefined` implies that `eu` is the regional host, `de` otherwise.                               |
| host               | string  |   common   |            `crawler`            | Automatically guessed from `servers` in spec.                                                                                                   |
| topLevelDomain     | string  |   common   |              `io`               | Automatically guessed from `servers` in spec.                                                                                                   |

### GitHub actions

The built clients are cached with the [Cache GitHub Action](https://github.com/algolia/api-clients-automation/blob/main/.github/actions/cache/action.yml) to avoid unnecessary CI tasks.

> TODO: Automate this step

You can copy [an existing client caching step](https://github.com/algolia/api-clients-automation/blob/main/.github/actions/cache/action.yml) or edit the following example:

```yaml
- name: Restore built <LANGUAGE> <CLIENT_NAME> client
  if: ${{ inputs.job == 'cts' }}
  uses: actions/cache@v2
  with:
    path: /home/runner/work/api-clients-automation/api-clients-automation/clients/<LANGUAGE_FOLDER>/<CLIENT_NAME>/<CLIENT_BUILD_PATH>
    key: ${{ runner.os }}-${{ env.CACHE_VERSION }}-<LANGUAGE>-<CLIENT_NAME>-${{ hashFiles('clients/<LANGUAGE_FOLDER>/<CLIENT_NAME>/**') }}-${{ hashFiles('specs/bundled/<CLIENT_SPEC>.yml') }}
```

## 3. Generate new client

> You can find more commands in the [CLI > generation commands page](/docs/generationCommands) and [CLI > specs commands page](/docs/specsCommands).

```bash
yarn docker generate <languageName> <clientName>
```

## 4. Implementing the Common Test Suite

See [CTS.md](/docs/commonTestSuite) for more informations.
