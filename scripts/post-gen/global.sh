#!/bin/bash

if [[ $CI ]]; then
    exit 0
fi

format_specs() {
    set +e

    echo "> Formatting specs..."

    log=$(yarn specs:format)

    if [[ $? != 0 ]]; then
        echo "$log"
        exit 1
    fi

    set -e
}

format_specs
