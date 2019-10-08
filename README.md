<p align="center">
  <a href="https://www.algolia.com">
    <img alt="Algolia for JavaScript" src="https://raw.githubusercontent.com/algolia/algoliasearch-client-common/master/banners/javascript.png" >
  </a>

  <h4 align="center">The readme/code you are seeing it's part of upcoming release v4</h4>

</p>

You'd like to contribute? Before start, we want to let you know that your **feedback** is important to us! Please consider start using this `v4` today! Found a bug or see something that can improved? Report it here: [github.com/algolia/algoliasearch-client-javascript/issues](https://github.com/algolia/algoliasearch-client-javascript/issues).

## Requeriments


- **Node** and **Yarn**: you can install both through the Homebrew package manager:

```
brew install node yarn
```


## Setup development locally

First, **clone** Algolia JavaScript API Client:

```bash
git clone https://github.com/algolia/algoliasearch-client-javascript
```

Then, enter inside the repository folder, and **install dependencies**:

```js
yarn install
```

Finally, launch the test suite locally:

> lint, types and unit tests

```js
yarn test:locally
```

Note that, you can run a very specific test doing:

```js
yarn test:unit -t "my test description"
```

## Play with the client

Algolia JavaScript API Client contains 3 builds that you can play with:

- node:

> Edit the file to update the code

```
node playground/node/index.js
```

- browser:

> Use the console of the browser to insert code

```
yarn playground 
```

- browser lite:

```
yarn playground 
```
