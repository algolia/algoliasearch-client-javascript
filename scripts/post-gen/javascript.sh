#!/bin/bash

export GENERATOR=$1
export CLIENT=$(cat openapitools.json | jq -r --arg generator "$GENERATOR" '."generator-cli".generators[$generator].output' | sed 's/#{cwd}\///g')

echo "> Exporting utils for ${GENERATOR}..."
mkdir -p $CLIENT/utils

cp -R clients/algoliasearch-client-javascript/utils/ $CLIENT/

lint_client() {
    set +e

    echo "> Linting ${GENERATOR}..."

    log=$(eslint --ext=ts ${CLIENT} --fix)

    if [[ $? != 0 ]]; then
        # jsdoc/require-hyphen-before-param-description fails to lint more than
        # 6 parameters, we re-run the script if failed to lint the rest
        eslint --ext=ts ${CLIENT} --fix

        if [[ $? != 0 ]]; then
            exit 1
        fi
    fi

    set -e

}

lint_client
