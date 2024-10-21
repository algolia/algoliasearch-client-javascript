<p align="center">
  <a href="https://www.algolia.com">
    <img alt="Algolia for JavaScript" src="https://raw.githubusercontent.com/algolia/algoliasearch-client-common/master/banners/javascript.png" >
  </a>

  <h4 align="center">The perfect starting point to integrate <a href="https://algolia.com" target="_blank">Algolia</a> within your JavaScript project</h4>

  <p align="center">
    <a href="https://npmjs.org/package/algoliasearch"><img src="https://img.shields.io/npm/v/algoliasearch.svg?style=flat-square" alt="NPM version"></img></a>
    <a href="http://npm-stat.com/charts.html?package=algoliasearch"><img src="https://img.shields.io/npm/dm/algoliasearch.svg?style=flat-square" alt="NPM downloads"></a>
    <a href="https://www.jsdelivr.com/package/npm/algoliasearch"><img src="https://data.jsdelivr.com/v1/package/npm/algoliasearch/badge" alt="jsDelivr Downloads"></img></a>
    <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-green.svg?style=flat-square" alt="License"></a>
  </p>
</p>

<p align="center">
  <a href="https://www.algolia.com/doc/libraries/javascript/" target="_blank">Documentation</a>  •
  <a href="https://www.algolia.com/doc/guides/building-search-ui/what-is-instantsearch/js/" target="_blank">InstantSearch</a>  •
  <a href="https://discourse.algolia.com" target="_blank">Community Forum</a>  •
  <a href="http://stackoverflow.com/questions/tagged/algolia" target="_blank">Stack Overflow</a>  •
  <a href="https://github.com/algolia/algoliasearch-client-javascript/issues" target="_blank">Report a bug</a>  •
  <a href="https://www.algolia.com/doc/libraries/javascript/v5/" target="_blank">FAQ</a>  •
  <a href="https://alg.li/support" target="_blank">Support</a>
</p>

## ✨ Features

- Thin & **minimal low-level HTTP client** to interact with Algolia's API
- Works both on the **browser** and **node.js**
- **UMD and ESM compatible**, you can use it with any module loader
- Built with TypeScript

## 💡 Getting Started

To get started, you first need to install algoliasearch (or any other available API client package).
All of our clients comes with type definition, and are available for both browser and node environments.

### With a package manager

```bash
yarn add algoliasearch@5.10.0
# or
npm install algoliasearch@5.10.0
# or
pnpm add algoliasearch@5.10.0
```

### Without a package manager

Add the following JavaScript snippet to the <head> of your website:

```html
// for the full client
<script src="https://cdn.jsdelivr.net/npm/algoliasearch@5.10.0/dist/algoliasearch.umd.js"></script>

// for the lite client
<script src="https://cdn.jsdelivr.net/npm/algoliasearch@5.10.0/dist/lite/builds/browser.umd.js"></script>
```

### Usage

You can now import the Algolia API client in your project and play with it.

```js
import { algoliasearch } from 'algoliasearch';

const client = algoliasearch('YOUR_APP_ID', 'YOUR_API_KEY');

// or with the lite client
import { liteClient } from 'algoliasearch/lite';

const client = liteClient('YOUR_APP_ID', 'YOUR_API_KEY');
```

For full documentation, visit the **[Algolia JavaScript API Client](https://www.algolia.com/doc/libraries/javascript/v5/methods/search/)**.

## ❓ Troubleshooting

Encountering an issue? Before reaching out to support, we recommend heading to our [FAQ](https://www.algolia.com/doc/libraries/javascript/v5/) where you will find answers for the most common issues and gotchas with the client. You can also open [a GitHub issue](https://github.com/algolia/api-clients-automation/issues/new?assignees=&labels=&projects=&template=Bug_report.md)

## 📄 License

The Algolia JavaScript API Client is an open-sourced software licensed under the [MIT license](LICENSE).
