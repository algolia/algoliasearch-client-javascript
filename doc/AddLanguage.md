# How to add a new language

In order to generate a client for a new language, here is a short guide:

## Extract the template

First you need to find your language in the list of generators:
[list](https://openapi-generator.tech/docs/generators)

Once you find your template you can extract it with the following command:
```bash
openapi-generator author template -g <your language generator> -o templates/<your language>
```

## Customize the template

There are a few components to add before generating the client, mostly:
- Init method
- Retry strategy
- maybe more

### Init method

By default, OpenAPI will put the `AppId` and `ApiKey` in every method, but we want an init method that takes those parameters and put them in the header of every requests, and create the right hosts.
To do this, change the constructor of the client in the `mustache` file to accept and store them.

### Retry strategy

The retry strategy cannot be included in the OpenAPI spec, you need to add a `<your language>` folder inside the `complement` folder and add your retry strategy code in that folder.

TODO finish this when we have more knowledge about the other languages.
