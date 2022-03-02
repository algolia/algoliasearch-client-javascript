---
title: Specs commands
---

# CLI specs commands

## Usage

```bash
yarn docker build specs <client | all>
```

### Available options

| Option      | Command           | Description                                                   |
| ----------- | :---------------- | :------------------------------------------------------------ |
| verbose     | -v, --verbose     | Make the process verbose, display logs from third party tools |
| interactive | -i, --interactive | Open prompt to query parameters                               |
| skip cache  | -s, --skip-cache  | Skip cache checking to force building specs                   |

## Build all specs

```bash
yarn docker build specs
```

## Build specific spec

```bash
yarn docker build specs recommend
```

## Fix the specs format

This is used by the build script and should not need to be called manually but if you want to format all specs file do:

```bash
yarn specs:fix
```

If you just want to check the format (not override the files), run:

```bash
yarn specs:lint <client>
yarn specs:lint search
```
