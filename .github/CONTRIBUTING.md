# Requirements

To run this project, you will need:

* Node.js >= v8.5.0, use nvm - [install instructions](https://github.com/creationix/nvm#install-script)
* Yarn >= v1.0.2 - [install instructions](https://yarnpkg.com/en/docs/install#alternatives-tab)

# Setup you env

```sh
yarn
```

# Tests

```sh
yarn test
yarn test:watch
```

You can add any jest flags to this, like `--notify` or `-u`

# Linting

```sh
yarn lint
yarn lint:fix
yarn typecheck
```

# What will CI run?

```sh
yarn test
# this is the same as:
yarn lint && yarn typecheck && yarn test --verbose
```
