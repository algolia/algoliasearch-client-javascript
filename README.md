<p align="center">
  <a href="https://www.algolia.com">
    <img alt="Algolia for JavaScript" src="https://raw.githubusercontent.com/algolia/algoliasearch-client-common/master/banners/javascript.png" >
  </a>

  <h4 align="center">The readme is meant for Algolia employees</h4>

</p>

You'd like to contribute? Before start, we want to let you know that your **feedback** is important to us! Please consider start using this `v4` today! Found a bug or see something that can improved? Report it here: [github.com/algolia/algoliasearch-client-javascript/issues](https://github.com/algolia/algoliasearch-client-javascript/issues).

## Requirements

- **Node** and **Yarn**: you can install both through the Homebrew package manager:

```
brew install node yarn
```

## Setup development locally

First, **clone** Algolia JavaScript API Client:

```bash
git clone https://github.com/algolia/algoliasearch-client-javascript
cd algoliasearch-client-javascript
git checkout release/v4.0.0
```

Then, **install the dependencies**:

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

## Playground

- Node:

```
# Edit the file `playground/node/index.js`, then execute it:
node playground/node/index.js
```

Browser:

```
yarn playground
# Visit `http://localhost:5000`
# Visit `http://localhost:5000/lite` for the lite version
```
