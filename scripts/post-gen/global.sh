#!/bin/bash

# Break on non-zero code
set -e

LANGUAGE=$1

if [[ $CI ]]; then
    echo "Not running post-gen/global on CI for $LANGUAGE"

    exit 0
fi

if [[ ! $DOCKER ]]; then
    echo "You should run scripts via the docker container, see README.md"

    exit 1
fi

build_js_utils() {
    echo "> Cleaning JavaScript client utils..."
    yarn workspace algoliasearch-client-javascript clean:utils

    echo "> Building JavaScript client utils..."
    yarn workspace algoliasearch-client-javascript build:utils

    echo ""
}

format_specs() {
    echo "> Formatting specs..."

    CMD="yarn specs:fix"
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

    echo ""
}

format_specs

if [[ $LANGUAGE == 'javascript' || $LANGUAGE == 'all' ]]; then
    build_js_utils
fi
