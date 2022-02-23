# api-clients-automation

**Make sure to have Docker installed so you don't have to install the tooling for every API clients.**

## Setup repository tooling

```bash
nvm use && yarn
```

## Setup dev environment

You can also execute docker commands one by one, see [Docker commands](#docker)

```bash
yarn docker:setup
```

### Docker

#### Build

Build docker image from [Dockerfile](./Dockerfile)

[How to add a new client](./docs/addNewClient.md) | [How to add a new language](./docs/addNewLanguage.md) | [Common Test Suite](./docs/CTS.md) | [Run the playground](./docs/playground.md)

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

## Contributing

You can make changes locally and run commands through the docker container.

### Build and validate specs

#### Usage

```bash
yarn docker build:specs <client | all>
```

#### Build all specs

```bash
yarn docker build:specs
```

#### Build specific spec

```bash
yarn docker build:specs recommend
```

#### Fix the specs format

This is used by the build script and should not need to be called manually but if you want to format all specs file do:

```bash
yarn docker specs:fix
```

If you just want to check the format (not override the files), run:

```bash
yarn docker specs:lint <client>
yarn docker specs:lint search
```

### Generate clients based on the [`specs`](./specs/)

#### Usage

```bash
yarn docker generate <language | all> <client | all>
```

#### Generate all clients

```bash
yarn docker generate
```

### Generate specific client for specific language

#### Usage

```bash
yarn docker build:clients <language | all> <client | all>
```

### Build specific client for specific language

```bash
yarn docker build:clients java recommend
```

## Testing clients

You can test our generated clients by running:

- The playground [`playground`](./playground) ([Playground README](./docs/playground.md))
- Tests with our [`Common Test Suite`](./tests/) ([CTS README](./docs/CTS.md)).

# Troubleshooting

> `Error: The operation couldn't be completed. Unable to locate a Java Runtime.`

Java is not located in your PATH, either source the right `.bash_profile`, `.zshrc`, etc. file or do the following command in this repository:

```bash
echo 'export PATH="/usr/local/opt/openjdk/bin:$PATH"' > .bash_profile && source .bash_profile
```
