---
title: Playground
---

# Playground

All of the existing clients should have an active playground for you to test generated clients, if it's not the case, consider contributing or letting us know!

## Usage

```bash
yarn docker playground <languageName> <clientName>
```

### JavaScript

```bash
yarn docker playground javascript search
```

### Java

```bash
yarn docker playground java search
```

## Add new playground

To add a new supported language to the playground, you need to:

- Create a new folder with your `<languageName>` in [the playground folder](https://github.com/algolia/api-clients-automation/blob/main/playground)
- Edit the [playground script](https://github.com/algolia/api-clients-automation/blob/main/scripts/playground.sh) with the command to run it.
