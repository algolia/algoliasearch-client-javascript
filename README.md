# How to run

## Install and setup env

```bash
nvm use && yarn
```

## Generate clients based on the [`specs`](./specs/)

### All clients

```bash
yarn generate
```

Generic command:
```bash
yarn generate <language | all> <client | all>
```

### Search client

```bash
yarn generate all search
```

### Recommend client

```bash
yarn generate all recommend
```

## Build generated clients

```bash
yarn client:build
```

# Testing clients

The clients can be tested inside the [`playground`](./playground) folder

## JavaScript

```bash
yarn playground:js
```

# Troubleshooting

> `Error: The operation couldn’t be completed. Unable to locate a Java Runtime.`

Java is not located in your PATH, either source the right `.bash_profile`, `.zshrc`, etc. file or do the following command in this repository:

```bash
echo 'export PATH="/usr/local/opt/openjdk/bin:$PATH"' > .bash_profile && source .bash_profile
```
