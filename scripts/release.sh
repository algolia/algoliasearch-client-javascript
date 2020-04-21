#!/usr/bin/env bash

GREEN='\033[0;32m'
RED='\e[31m'
NC='\033[0m'

printf "\n"

set -e

if [[ $npm_config_user_agent != npm* ]]; then
  echo "You ran this script differently than with 'npm run release'"
  exit 1
fi

printf "\n${GREEN}You are about the start a release process${NC}\n"

printf "\n${RED}[ACTION]${NC} Changes on changelog are not part of this release process.\n"
read -p "Is the changelog modified and commited separately? If no, do that first manually. (y/n):"
if [[ ! $REPLY =~ ^[Yy]$ ]]; then exit 1; fi

releaseBranch='master'
currentBranch=`git rev-parse --abbrev-ref HEAD` 

if [ "$currentBranch" != "$releaseBranch" ]; then
  printf "\n${RED}[ERROR]${NC} You must be on master branch.\n"
  exit 1
fi

changes=`echo $(git add . && git diff --cached --numstat | wc -l) | sed 's/ *$//g'`

if [[ "$changes" != "0" ]]; then
  printf "\n${RED}[ERROR]${NC} Working tree is not clean.\n"
  exit 1
fi

printf "${GREEN}[INFO]${NC} Update working tree.\n"
git pull origin $releaseBranch
git fetch origin --tags

currentVersion=`cat lerna.json | jq -r '.version'`

printf "\n${RED}[ACTION]${NC} Checking CI status is an manual step! Check here: https://circleci.com/gh/algolia/algoliasearch-client-javascript\n"
read -p "Is the latest commit a success? If yes, are you sure? (y/n): "
if [[ ! $REPLY =~ ^[Yy]$ ]]; then exit 1; fi

printf "\n${GREEN}[INFO]${NC} current version is ${GREEN}$currentVersion${NC}. Please type the new chosen version > " 
read -e newVersion

printf "\n"

if [[ "$newVersion" == "" ]]; then
  printf "\n${RED}[INFO]${NC} The version must be provided.\n"
  exit 1
fi

read -p "Releasing $newVersion - are you sure? (y/n): "
if [[ ! $REPLY =~ ^[Yy]$ ]]; then exit 1; fi

versionFilePath='packages/client-common/src/version.ts'
if [[ ! -f "$versionFilePath" ]]; then
  printf "\n\n${RED}[ERROR]${NC} unable to bump the version at:\n"
  printf "$versionFilePath\n"
  exit 1
fi

# update version in source file
echo "export const version = '$newVersion';" > $versionFilePath;

printf "\n"

# update version in packages & dependencies
yarn lerna version $newVersion --no-git-tag-version --no-push --exact

git add lerna.json packages/algoliasearch/package.json packages/cache-browser-local-storage/package.json packages/cache-common/package.json packages/cache-in-memory/package.json packages/client-account/package.json packages/client-analytics/package.json packages/client-common/package.json packages/client-common/src/version.ts packages/client-search/package.json packages/logger-common/package.json packages/logger-console/package.json packages/requester-browser-xhr/package.json packages/requester-common/package.json packages/requester-node-http/package.json packages/transporter/package.json packages/client-recommendation/package.json

if [[ -n $(git diff --exit-code) ]]; then
  printf "\n${RED}[ERROR]${NC} there is unstaged files.\n"
  exit 1
fi

# build the dist
yarn install --pure-lockfile

if [[ -n $(git diff --exit-code) ]]; then
  printf "\n${RED}[ERROR]${NC} there is unstaged files.\n"
  exit 1
fi

yarn build

printf "${GREEN}[INFO]${NC} Validating declarations files.\n"
yarn test:build-declarations

if [[ -n $(git diff --exit-code) ]]; then
  printf "\n${RED}[ERROR]${NC} there is unstaged files.\n"
  exit 1
fi

printf "\n\n${GREEN}[INFO]${NC} almost done, check everything in another terminal tab if you want.\n"
printf "\n\nAfter this, we are going to push changes, tag them, and publish the package to npm.\n"
read -p "=> when ready, press [Y/y] to push to github and publish the package. (y/n): "
if [[ ! $REPLY =~ ^[Yy]$ ]]; then exit 1; fi

printf "\n${GREEN}[INFO]${NC} Committing changes" 
git commit -m "release: $newVersion" --no-verify

printf "\n${GREEN}[INFO]${NC} Creating tag and pushing it" 
git tag "$newVersion"
git push origin $releaseBranch
git push origin --tags

printf "\n${GREEN}[INFO]${NC} pushing package to NPM\n"
npm run release-publish

printf "\n${GREEN}[INFO]${NC} All done!\n\n"
