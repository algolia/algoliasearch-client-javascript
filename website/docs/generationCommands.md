---
title: Generation commands
---

# CLI generation commands

## Usage

```bash
yarn docker generate <language | all> <client | all>
```

### Available options

| Option      | Command           | Description                                                   |
| ----------- | :---------------- | :------------------------------------------------------------ |
| verbose     | -v, --verbose     | Make the process verbose, display logs from third party tools |
| interactive | -i, --interactive | Open prompt to query parameters                               |

## Generate all clients for all support languages

```bash
yarn docker generate
```

### Generate specific client for specific language

```bash
yarn docker generate java sources
```

## Build all clients for all support languages

```bash
yarn docker build clients
```

### Build specific client for specific language

```bash
yarn docker build clients javascript recommend
```
