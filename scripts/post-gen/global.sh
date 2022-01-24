#!/bin/bash

# Break on non-zero code
set -e

LANGUAGE=$1

if [[ $CI ]]; then
    exit 0
fi

if [[ ! $DOCKER ]]; then
    echo "You should run scripts via the docker container, see README.md"

    exit 1
fi

build_js_common() {
    echo "> Building @algolia/client-common..."

    yarn workspace @algolia/client-common build

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
    build_js_common
fi
