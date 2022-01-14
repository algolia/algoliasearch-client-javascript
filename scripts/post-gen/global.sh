#!/bin/bash

if [[ $CI ]]; then
    exit 0
fi

if [[ ! $DOCKER ]]; then
    echo "You should run scripts via the docker container, see README.md"

    exit 1
fi

format_specs() {
    echo "> Formatting specs..."
    CMD="yarn specs:format"
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
}

format_specs
