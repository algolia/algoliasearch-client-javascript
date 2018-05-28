First of all, thanks for contributing to `algoliasearch`, our API client for JavaScript. Don't hesitate to reach out in an issue if there's any questions you have while contributing.

### Requirements

To run this project, you will need:

- Node.js >= v7, but it's easier use nvm - [install instructions](https://github.com/creationix/nvm#install-script)
- Yarn >= v0.23.4 - [install instructions](https://yarnpkg.com/en/docs/install#alternatives-tab)

## Development

All development of new features, fixes or documentation should be done in separate branches from `develop`. You should also include tests in `/test/spec/**/test-cases` if any of the arguments changed. Unit tests should go in the adjacent folders, and integration tests in `run-integration.js`.

## Code

The code for `algoliasearch` is within `src`. In there we also have specific folders for build entry points on React Native, Node, Parse, Angular (1), jQuery and a lite version.

## Building

This library uses Browserify to build multiple UMD entry points, one per build. Note that it runs twice on all except `/lite` for the purpose of the `src/browser/migration-layer`.

```sh
yarn build
# or
yarn watch
```

## Test

We have unit tests written with [tap](https://github.com/tapjs/node-tap):

Single run and linting:

```sh
yarn test
```

For integration tests you'll need Algolia credentials as environment variables:

```sh
ALGOLIA_APP_ID=XXX ALGOLIA_API_KEY=XXX PLACES_APPID=XXX PLACES_APIKEY=XXX node test/run-integration.js
```

You can also run the tests in your browser, rather than in node (**note that these tests are currently not passing while ran in local browsers**):

```sh
ALGOLIA_APP_ID=XXX ALGOLIA_API_KEY=XXX PLACES_APPID=XXX PLACES_APIKEY=XXX yarn dev
```

or

```sh
ALGOLIA_APP_ID=XXX ALGOLIA_API_KEY=XXX PLACES_APPID=XXX PLACES_APIKEY=XXX yarn dev-integration
```

## Lint

```sh
yarn lint
```

Files are __not__ automatically formatted with prettier.

## Release

Releasing is done by following the internal "release API clients" document for now; but a contribution that extracts this into a script would be really nice. 

Note to definitely check the examples before actually releasing:

```sh
yarn examples
# and open localhost:8080/examples
```
