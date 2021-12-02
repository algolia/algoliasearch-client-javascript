# Common Test Suite

The CTS aims at ensuring minimal working operation for the API clients, by comparing the request formed by sample parameters.
It is automaticaly generated for all languages, from a JSON entry point.

## How to run it

```bash
yarn cts:generate
yarn cts:test
```

If you only want to generate the tests for a set of languages, you can run:

```bash
yarn cts:generate "javascript ruby"
```

## How to add test

The test generation script requires a JSON file name from the `operationId` (e.g. `search.json`), located in the `CTS/<client>/` folder (e.g. `CTS/search/`).

```json
[
  {
    "testName": "the name of the test (e.g. test('search endpoint'))",
    "method": "the method to call (e.g. search)",
    "parameters": [
      "indexName",
      {
        "$objectName": "the name of the object for strongly type language",
        "query": "the string to search"
      }
    ],
    "request": {
      "path": "/1/indexes/indexName/query",
      "method": "POST",
      "data": { "query": "the string to search" }
    }
  }
]
```

And that's it! If the name of the file matches a real `operationId` in the spec, then a test will be generated.

## How to add a new language

- Create a template in `test/CTS/templates/<your language>.mustache` that parse a array of test into your test framework of choice
- Add the language in the array `languages` in `tests/generateCTS.ts`.
