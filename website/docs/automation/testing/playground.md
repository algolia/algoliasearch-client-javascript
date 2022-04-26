---
title: Playground
---

# Playground

All of the existing clients should have an active playground for you to test generated clients, if it's not the case, consider contributing or letting us know!

:::info

Make sure to first [setup the repository tooling](/docs/automation/setup-repository) to ease your journey!

:::

## Usage

> `language` and `client` defaults to `all`

```bash
yarn docker playground <languageName> <clientName>
```

### JavaScript

You can also find [sandboxes for all our clients](https://codesandbox.io/search?refinementList%5Btags%5D=&page=1&configure%5BhitsPerPage%5D=12&query=shortcuts%20generated%20api%20clients%20algolia%20javascript)

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
