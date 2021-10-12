In this page you will find our recommended way of installing Docker on your machine. 
This guide is made for macOS users.

## Install docker

Install [Docker Desktop](https://docs.docker.com/get-docker/).

## Build the image

```bash
docker build -t algolia-js --build-arg NODE_IMAGE=node:$(cat .nvmrc)-alpine .
```

## Run the image

You need to provide few environment variables at runtime to be able to run the [Common Test Suite](https://github.com/algolia/algoliasearch-client-specs/tree/master/common-test-suite).
You can set them up directly in the command:

```bash
docker run -it --rm --env ALGOLIA_APP_ID=XXXXXX [...] -v $PWD:/app -v /app/node_modules -w /app algolia-js bash
```

However, we advise you to export them in your `.bashrc` or `.zshrc`. That way, you can use [Docker's shorten syntax](https://docs.docker.com/engine/reference/commandline/run/#set-environment-variables--e---env---env-file) to set your variables.

```bash
### This is needed only to run the full test suite
docker run -it --rm --env ALGOLIA_APPLICATION_ID_1 \
                    --env ALGOLIA_ADMIN_KEY_1 \
                    --env ALGOLIA_SEARCH_KEY_1 \
                    --env ALGOLIA_APPLICATION_ID_2 \
                    --env ALGOLIA_ADMIN_KEY_2 \
                    --env ALGOLIA_APPLICATION_ID_MCM \
                    --env ALGOLIA_ADMIN_KEY_MCM \
-v $PWD:/app -v /app/node_modules -w /app algolia-js bash
```

Once your container is running, any changes you make in your IDE are directly reflected in the container, except for the `node_modules` folder.  
If you want to add or remove packages, you will have to rebuild the image, this is because the `node_modules` folder is installed in a different folder to improve performance.

To launch the tests, you can use one of the following commands
```shell script
# run only the unit tests
yarn test:unit

# run a single test
yarn test:unit nameOfYourTest
```

You can find more commands in the `package.json` file.

Feel free to contact us if you have any questions.
