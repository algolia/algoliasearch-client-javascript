---
title: Common Test Suite
---

# Common Test Suite

The CTS aims at ensuring minimal working operation for the API clients, by comparing the request formed by sample parameters.
It is automaticaly generated for all languages, from a JSON entry point.

:::info

Common Test Suite requires all clients to be built.

[CLI commands for the Common Test Suite](/docs/automation/CLI/ctsCommands)

:::

## How to add test

The test generation script requires a JSON file name from the `operationId` (e.g. `search.json`), located in the `CTS/<client>/requests/` folder (e.g. `CTS/search/requests/`).

> See the [browse test file for the search client](https://github.com/algolia/api-clients-automation/blob/main/tests/CTS/methods/requests/search/browse.json)

```json
[
  {
    "testName": "the name of the test (e.g. test('search endpoint')) (default: 'method')",
    "method": "the method to call (e.g. search)",
    "parameters": {
      "indexName": "testIndex",
      "searchParam": {
        // query parameters
        "offset": 42,
        "limit": 21,
        // data parameters
        "query": "the string to search"
      }
    },
    "request": {
      "path": "/1/indexes/testIndex/query",
      "method": "POST",
      "data": { "query": "the string to search" },
      "searchParams": {
        "offset": "42",
        "limit": "21"
      }
    }
  }
]
```

And that's it! If the name of the file matches a real `operationId` in the spec, then a test will be generated.

## How to add a new language

Create a template in [`tests/CTS/methods/requests/templates/<languageName>/requests.mustache`](https://github.com/algolia/api-clients-automation/tree/main/tests/CTS/methods/requests/templates) that parses an array of tests into the test framework of choice.

> See [implementation of the JavaScript tests](https://github.com/algolia/api-clients-automation/blob/main/tests/CTS/methods/requests/templates/javascript/requests.mustache)

When writing your template, here is a list of variables accessible from `mustache`:

```js
{
  "import": "the name of the package or library to import",
  "client": "the name of the API Client object to instanciate and import",
  "blocks": [{
    // The list of test to implement
    "operationID": "the name of the endpoint and the cts file to test",
    "tests": [{
      "testName": "the descriptive name test (default to `method`)"
      "method": "the method to call on the API Client",
      "parameters": {
        // Object of all parameters with their name, to be used for languages that require the parameter name
        "parameterName": "value",
        ...
      },
      "parametersWithDataType": [
          {
            "key": "key",
            "value": "value",
            // booleans indicating the data type
            "isDate": "false",
            "isArray": "false",
            "isObject": "true",
            "isString": "false",
            // boolean indicating if it is the last parameter
            "-last": "false",
          }
      ],
      // boolean indicating if the method has parameters, useful for `GET` requests
      "hasParameters": "true",
      "request": {
        "path": "the expected path of the request",
        "method": "the expected method: GET, POST, PUT, DELETE or PATCH",
        "data": {
          // The expected body of the request
        }
      }
    }]
  }]
}
```

## Get the list of remaining CTS to implement

To get the list of `operationId` not yet in the CTS but in the spec, run this command:

```bash
rm -rf ./specs/bundled
comm -3 <(grep -r operationId ./specs | awk -F: '{gsub(/ /,""); print $NF}' | sort) <(find ./tests/CTS/clients -type f -name '*.json' | awk -F/ '{gsub(/.json/,"");print $NF}' | sort)
```
