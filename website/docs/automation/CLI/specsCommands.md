---
title: Specs commands
---

# Specs commands

The Specs commands are used to [`build`](#build), [`lint`](#lint) and validate the REST API specs.

## Usage

> `client` defaults to `all`

```bash
yarn docker build specs <client | all>
```

### Available options

| Option      | Command           | Description                                                   |
| ----------- | :---------------- | :------------------------------------------------------------ |
| verbose     | -v, --verbose     | Make the process verbose, display logs from third party tools |
| interactive | -i, --interactive | Open prompt to query parameters                               |
| skip cache  | -s, --skip-cache  | Skip cache checking to force building specs                   |

## Build

### Build all specs

```bash
yarn docker build specs
```

### Build specific spec

```bash
yarn docker build specs recommend
```

## Lint

### Fix specs

> Automatically done when building specs

```bash
yarn specs:fix
```

### Check specs

If you just want to check the format (not override the files)

```bash
yarn specs:lint <client>
yarn specs:lint search
```
