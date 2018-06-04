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

You can also run the tests in your browser, rather than in node:

```sh
ALGOLIA_APP_ID=XXX ALGOLIA_API_KEY=XXX PLACES_APPID=XXX PLACES_APIKEY=XXX yarn dev
```

or

```sh
ALGOLIA_APP_ID=XXX ALGOLIA_API_KEY=XXX PLACES_APPID=XXX PLACES_APIKEY=XXX yarn dev-integration
```

## Running tests on SauceLabs

You can also run tests (unit, integration) in real browsers using [Sauce Labs](https://saucelabs.com/).
First you need to [download and install Sauce Connect](https://wiki.saucelabs.com/display/DOCS/Sauce+Connect+Proxy).

Then run it this way:

```sh
SAUCE_USERNAME= SAUCE_ACCESS_KEY= sc --direct-domains *.algolia.biz
```

You will have to create a free [Sauce Labs](https://saucelabs.com/) account to get `SAUCE_USERNAME` and `SAUCE_ACCESS_KEY`.

Then launch the actual tests:

```sh
SAUCE_USERNAME= SAUCE_ACCESS_KEY= TRAVIS_BUILD_NUMBER=3213213213 INTEGRATION_TEST_APPID=test INTEGRATION_TEST_API_KEY= PLACES_APPID=places PLACES_APIKEY= ./scripts/test-browser
```

or:

```sh
SAUCE_USERNAME= SAUCE_ACCESS_KEY= TRAVIS_BUILD_NUMBER=3213213213 INTEGRATION_TEST_APPID=test INTEGRATION_TEST_API_KEY= PLACES_APPID=places PLACES_APIKEY= ./scripts/test-integration
```

`TRAVIS_BUILD_NUMBER` can be anything.

You can configure the browsers that are launched in `zuul.config.js`. You can then follow in your SauceLabs dashboard the tests being run.

## How tests are ran in Sauce Labs

Both integration and unit tests are ran in real browsers using [Sauce Labs](https://saucelabs.com/) on both Pull Requests and branch builds. This is done by [Travis](https://travis-ci.com/).

The way it works is that [zuul](https://github.com/defunctzombie/zuul), our test runner command line, starts a local server that will serve an html page including a JavaScript bundle from browserify whose entry point is run-integration.js or run-browser.js.

Travis also starts a tunnel between Sauce Labs servers and the localhost of the Travis build machine, so that browsers will access http://localhostfix.nossl/__zuul which will actually be proxied to Travis servers and the Node.js http server started by zuul that we explained above.

Then there's a special script included in the bundle that will transfer the [tape](https://github.com/substack/tape) tap results to the zuul command line output that will be used to decide if tests are ok or not.

Once all browsers are passed then we know everything went well.

For collaborators, to debug Sauce Labs, you can login via Okta. Ask for access if you cannot login.

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
