<p align="center">
  <a href="https://www.algolia.com">
    <img alt="Algolia for JavaScript" src="https://raw.githubusercontent.com/algolia/algoliasearch-client-common/master/banners/javascript.png" >
  </a>

  <h4 align="center">The perfect starting point to integrate <a href="https://algolia.com" target="_blank">Algolia</a> within your JavaScript project</h4>

  <p align="center">
    <a href="https://npmjs.org/package/algoliasearch"><img src="https://img.shields.io/npm/v/algoliasearch.svg?style=flat-square" alt="NPM version"></img></a>
    <a href="http://npm-stat.com/charts.html?package=algoliasearch"><img src="https://img.shields.io/npm/dm/algoliasearch.svg?style=flat-square" alt="NPM downloads"></a>
    <a href="https://www.jsdelivr.com/package/npm/algoliasearch"><img src="https://data.jsdelivr.com/v1/package/npm/algoliasearch/badge" alt="jsDelivr Downloads"></img></a>
    <a href="LICENSE.md"><img src="https://img.shields.io/badge/license-MIT-green.svg?style=flat-square" alt="License"></a>
  </p>
</p>

<p align="center">
  <a href="https://www.algolia.com/doc/api-client/getting-started/install/javascript/" target="_blank">Documentation</a>  •
  <a href="https://www.algolia.com/doc/guides/building-search-ui/what-is-instantsearch/js/" target="_blank">InstantSearch</a>  •
  <a href="https://discourse.algolia.com" target="_blank">Community Forum</a>  •
  <a href="http://stackoverflow.com/questions/tagged/algolia" target="_blank">Stack Overflow</a>  •
  <a href="https://github.com/algolia/algoliasearch-client-javascript/issues" target="_blank">Report a bug</a>  •
  <a href="https://www.algolia.com/doc/api-client/troubleshooting/faq/javascript/" target="_blank">FAQ</a>  •
  <a href="https://www.algolia.com/support" target="_blank">Support</a>
</p>

**Migration note from v3.x to v4.x**

> In February 2020, we released v4 of our JavaScript client. If you are using version 3.x of the client, read the [migration guide to version 4.x](https://www.algolia.com/doc/api-client/getting-started/upgrade-guides/javascript/). Version 3.x will **no longer** be under active development.

## ✨ Features

- Thin & **minimal low-level HTTP client** to interact with Algolia's API
- Works both on the **browser** and **node.js**
- **UMD compatible**, you can use it with any module loader
- Built with TypeScript

## ⏭ Next

The [`next` branch](https://github.com/algolia/algoliasearch-client-javascript/tree/next) hosts the code of the new major version (`v5`). This version is generated from the [`API Clients Automation` monorepo](https://github.com/algolia/api-clients-automation/) which is where you can follow the development and make contributions.

## 💡 Getting Started

First, install Algolia JavaScript API Client via the [npm](https://www.npmjs.com/get-npm) package manager:

```bash
npm install algoliasearch
```

Then, create objects on your index:

```js
const algoliasearch = require('algoliasearch');

const client = algoliasearch('YourApplicationID', 'YourAdminAPIKey');
const index = client.initIndex('your_index_name');

const objects = [
  {
    objectID: 1,
    name: 'Foo',
  },
];

index
  .saveObjects(objects)
  .then(({ objectIDs }) => {
    console.log(objectIDs);
  })
  .catch(err => {
    console.log(err);
  });
```

Finally, let's actually search using the `search` method:

```js
index
  .search('Fo')
  .then(({ hits }) => {
    console.log(hits);
  })
  .catch(err => {
    console.log(err);
  });
```

For the full documentation, visit the **[online documentation](https://www.algolia.com/doc/api-client/getting-started/install/javascript/)**.

## ❓ Troubleshooting

Encountering an issue? Before reaching out to support, we recommend heading to our [FAQ](https://www.algolia.com/doc/api-client/troubleshooting/faq/javascript/) where you will find answers for the most common issues and gotchas with the client.

## 📄 License

Algolia JavaScript API Client is an open-sourced software licensed under the [MIT license](LICENSE.md).
