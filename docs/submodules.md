## Add a submodule

```sh
git submodule add git@github.com:algolia/<YOUR_API_CLIENT_REPOSITORY>.git clients/<YOUR_API_CLIENT_REPOSITORY>

(cd clients/<YOUR_API_CLIENT_REPOSITORY> && git checkout -b next)

git add clients/<YOUR_API_CLIENT_REPOSITORY>
git commit -m "chore: add submodule"
```

## How to modify the content of a submodule manually

This repository does not include the actual repository of the submodule. It's just a reference.

```sh
cd clients/<YOUR_API_CLIENT_REPOSITORY>
```

You need to checkout to a specific branch, because it's normally detached.

```sh
git checkout next
```

Then modify something and push to its origin.

```sh
vi README.md
...
git add README.md
git commit -m "docs: update README.md"
git push origin next
```

Then come back to the root directory, and you will see a change.

```sh
cd ../../
git status
```

```
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        modified:   clients/algoliasearch-client-javascript
```

It means the reference (SHA) needs to change.

```sh
git add clients/algoliasearch-client-javascript
git commit -m "chore: update submodule"
git push
```

## How to ignore the change of a submodule

If you generated API clients locally and want to remove the change from `git status`,

go to the directory, clean up, and check out to the proper branch.

```sh
cd clients/algoliasearch-client-javascript
git reset --hard HEAD
git checkout next
```

## How to remove a submodule from the monorepo

https://stackoverflow.com/a/1260982

## Troubleshootings

### When something is weird,

Try `git submodule update` first.
