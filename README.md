# How to run

## Install and setup env

```bash
nvm use && yarn && export PACKAGE_VERSION='4.11.0' TS_POST_PROCESS_FILE='yarn prettier --write .'
```

## Generate client based on `spec.yml`

```bash
yarn generate
```

## Build generated client

```bash
yarn client:build
```

## Test built client response

```bash
yarn client:test
```
