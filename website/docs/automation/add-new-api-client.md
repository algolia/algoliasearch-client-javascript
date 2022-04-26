---
title: Add a new API client
---

# Add a new API client

Adding an API client requires a manual steps in order to setup the tooling, generation scripts and properly generate the code. We recommend getting inspirations from existing clients such as `javascript-recommend`.

:::info

Make sure to first [setup the repository tooling](/docs/automation/setup-repository) to ease your journey!

:::

## 1. Writing specs

We recommend to have a look at [existing spec files](https://github.com/algolia/api-clients-automation/blob/main/specs/). The `bundled` folder is automatically generated, manual changes shouldn't be done in these files.

### `common` spec folder

[This folder](https://github.com/algolia/api-clients-automation/blob/main/specs/common/) hosts properties that are common to Algolia or used in multiple clients.

### `<clientName>` spec folder

> Example with the [search client spec](https://github.com/algolia/api-clients-automation/blob/main/specs/search/)

#### `spec.yml` file

This file is the entry point of the client spec, it contains `servers`, `paths` and other specific imformations of the API. We recommend to copy an existing [`spec.yml` file](https://github.com/algolia/api-clients-automation/blob/main/specs/search/spec.yml) to get started.

#### `<clientName>`/common folder

Properties that are common to the client, for properties common to all clients, check the [common folder](#common-spec-folder)

#### `<clientName>`/paths folder

Path definition of the paths defined in the [spec file](#specyml-file)

#### Guidelines

- **Endpoints**: Each file in the `paths` folder should contain `operationId`s for a single endpoint, but multiple methods are allowed.
- **Name**: If the path file only contain one method, we name the file same as the `operationId`, but we try to make it less specific if there is multiple methods.
- **Description/Summary**: `operationId`s must have both description and summary.
- **Complex objects**: Complex objects (nested arrays, nested objects, , `oneOf`, `allOf`, etc.) must be referenced (`$ref`) in the `operantionId` file and not inlined. This is required to provide a accurate naming and improve readability.

## 2. Configuring the environment

> The generator follows its own configuration file named `openapitools.json`

### Generation config

[openapitools.json](https://github.com/algolia/api-clients-automation/blob/main/openapitools.json) hosts the configuration of all of the generated clients with their available languages.

#### `generators`

Generators are referenced by key with the following pattern `<languageName>-<clientName>`. You can copy an existing object of a client and replace the `<clientName>` value with the one you'd like to generate.

Below are the options you need to **make sure to define for your client**, other options are automatically added in the [`setDefaultOptions` script](https://github.com/algolia/api-clients-automation/blob/main/scripts/pre-gen/setDefaultGeneratorOptions.ts) and the generators.

| Option              |  Type  |  Language  |             Example             | Definition                                                                                                           |
| ------------------- | :----: | :--------: | :-----------------------------: | :------------------------------------------------------------------------------------------------------------------- |
| output              | string |   Common   | `path/to/client/client-sources` | The output path of the client.                                                                                       |
| gitRepoId           | string |   Common   |  `algoliasearch-client-java-2`  | The name of the repository under the Algolia org.                                                                    |
| packageName         | string |   common   |         `AlgoliaSearch`         | Name of the API package, used in [CTS](/docs/automation/testing/common-test-suite).                                  |
| packageVersion      | string | JavaScript |             `1.2.3`             | The version you'd like to publish the first iteration of the generated client. It will be automatically incremented. |
| utilsPackageVersion | string | JavaScript |             `0.1.2`             | The version you'd like to publish the first iteration of the utils package. It will be automatically incremented.    |

### GitHub actions

The built clients are cached with the [Cache GitHub Action](https://github.com/algolia/api-clients-automation/blob/main/.github/actions/cache/action.yml) to avoid unnecessary CI tasks.

You can copy [an existing client caching step](https://github.com/algolia/api-clients-automation/blob/main/.github/actions/cache/action.yml) or edit the following example:

```yaml
- name: Restore built <languageName> <clientName> client
  if: ${{ inputs.job == 'cts' || inputs.job == 'codegen' }}
  uses: actions/cache@v2
  with:
    path: <PATH_TO_CLIENT_FOLDER>
    key: |
      ${{ env.CACHE_VERSION }}-${{
      hashFiles(
        <clientName_FILES>,
        'specs/bundled/<clientName>.yml',
        'templates/<languageName>/**',
        'generators/src/**'
      )}}
```

## 3. Generate new client

> You can find all the commands in the [CLI > clients commands page](/docs/automation/CLI/clients-commands) and [CLI > specs commands page](/docs/automation/CLI/specs-commands).

```bash
yarn docker generate <languageName> <clientName>
```

## 4. Implementing the Common Test Suite

Clients needs to be tested, you can read more in the [Common Test Suite](/docs/automation/testing/common-test-suite) guide.
