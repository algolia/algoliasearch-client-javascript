# How to add a new client

Here is a short guide on how to generate a new API client for your language

## Find your default template

Provided templates are a good starting point to generate a client, pick the one you find closer to what you'd like to achieve.

You can pick a default template on the [openapi-generator's "generators" page](https://openapi-generator.tech/docs/generators)

## Extract the template locally

```bash
openapi-generator author template -g <YOUR_TEMPLATE_NAME> -o templates/<YOUR_API_CLIENT_NAME>
```

Example for the JavaScript client

```bash
openapi-generator author template -g typescript-node -o templates/algoliasearch-client-javascript/
```

## Customize the template

API clients require a custom Algolia logic in order to seamlessly work with our engine.

You will need to implement:

- An `init` method
- The `retry strategy` with your custom transporter
- Handle client with different hosts (e.g. `personalization`)
- At least 2 requester:
  - http requester, using the standard library
  - echo requester that send the request back, used by the CTS
- A logger that the user can swap
- More to come...

### Init method

By default, OpenAPI will put the `AppId` and `ApiKey` in every method, but we want an init method that takes those parameters and put them in the header of every requests, and create the right hosts.

To do this, change the constructor of the client in the `mustache` file to accept and store them.

See this PR of the first JavaScript implementation for reference: https://github.com/algolia/api-client-automation-experiment/pull/7

### Retry strategy

The retry strategy cannot be generated and needs to be implemented outside of the generated client folder. You need to add your transporter to the `utils/<your language>` folder, and update the `.mustache` template files accordingly.

See this PR of the first JavaScript implementation for reference: https://github.com/algolia/api-client-automation-experiment/pull/9

### Handle client with different hosts

Algolia search operations targets the default appId host (`${appId}-dsn.algolia.net`, `${appId}.algolia.net`, etc.), while clients like `personalization` have their own `host`.

Since `.mustache` are logicless files, you need to provide the variable yourself in the [`openapitools.json`](../openapitools.json) config file and implement the `if` based logic.

See this PR of the first JavaScript implementation for reference: https://github.com/algolia/api-client-automation-experiment/pull/25
