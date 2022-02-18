#!/bin/bash

# Break on non-zero code
set -e

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null && pwd)"
# Move to the root (easier to locate other scripts)
cd ${DIR}/../..

LANGUAGE=$1
CLIENT=$2
GENERATOR="$LANGUAGE-$CLIENT"
PACKAGE=$(cat openapitools.json | jq -r --arg generator "$GENERATOR" '."generator-cli".generators[$generator].additionalProperties.packageName')

if [[ -z $PACKAGE ]]; then
    echo "Unknown package ${PACKAGE}"
    exit 1
fi

# Commands are based on the LANGUAGE
if [[ $LANGUAGE == 'javascript' ]]; then
    echo "> Cleaning previous build $GENERATOR..."
    yarn workspace $PACKAGE clean

    echo "> Bundling $GENERATOR..."
    CMD="yarn workspace algoliasearch-client-javascript build $PACKAGE"
elif [[ $LANGUAGE == 'php' ]]; then
    # no build needed (for now)
    :
elif [[ $LANGUAGE == 'java' ]]; then
    CMD="./gradle/gradlew --no-daemon -p clients/$PACKAGE assemble"
fi

if [[ $VERBOSE == "true" ]]; then
    $CMD
else
    set +e
    log=$($CMD)

    if [[ $? != 0 ]]; then
        echo "$log"
        exit 1
    fi
    set -e
fi
