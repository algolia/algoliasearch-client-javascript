---
title: Setup the repository tooling
---

# Setup the repository tooling

**Make sure to have Docker installed so you don't have to install the tooling for every API clients.**

## Install the dependencies

```bash
nvm use && yarn
```

## Mounting the docker image

> You can also execute docker commands one by one, see [Docker commands](#docker)

```bash
yarn docker:setup
```

### Docker

#### Build

Build docker image from [Dockerfile](https://github.com/algolia/api-clients-automation/blob/main/Dockerfile)

[How to add a new client](/docs/addNewClient) | [How to add a new language](/docs/addNewLanguage) | [Common Test Suite](/docs/commonTestSuite) | [Run the playground](/docs/playground)

```bash
yarn docker:build
```

#### Mount

Mount docker image on `dev` container

```bash
yarn docker:mount
```

#### Clean

Stops `dev` container and clean the built image

```bash
yarn docker:clean
```

## Troubleshooting

:::caution

You should run the commands via the [Docker container](#mounting-the-docker-image) to avoid Java issues.

:::

> `Error: The operation couldn't be completed. Unable to locate a Java Runtime.`

Java is not located in your PATH, either source the right `.bash_profile`, `.zshrc`, etc. file or do the following command in this repository:

```bash
echo 'export PATH="/usr/local/opt/openjdk/bin:$PATH"' > .bash_profile && source .bash_profile
```
