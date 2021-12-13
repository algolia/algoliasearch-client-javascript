#!/bin/bash

export GENERATOR=$1
export CLIENT=$(cat openapitools.json | jq -r --arg generator "$GENERATOR" '."generator-cli".generators[$generator].output' | sed 's/#{cwd}\///g')

echo "> Exporting utils for ${GENERATOR}..."
mkdir -p $CLIENT/utils

cp -R clients/algoliasearch-client-javascript/utils/ $CLIENT/utils

echo "> Linting ${GENERATOR}..."
eslint --ext=ts ${CLIENT} --fix
