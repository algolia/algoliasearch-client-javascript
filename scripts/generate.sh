#!/bin/bash

# Break on non-zero code
set -e

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null && pwd)"
# Move to the root (easier to locate other scripts)
cd ${DIR}/..

lang=$1
client=$2
generator="$1-$2"

# build spec before generating client
build_spec() {
    yarn build:specs $client
}

# Run the pre generation script if it exists.
run_pre_gen() {
    pregen="./scripts/pre-gen/${lang}.sh"

    if [[ -f "$pregen" ]]; then
        echo "> Running pre-gen script for $generator..."
        $pregen $client
    fi
}

generate_client() {
    echo "> Generating code for $generator..."
    CMD="yarn openapi-generator-cli generate --generator-key $generator"
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

# Run the post generation script if it exists.
run_post_gen() {
    postgen="./scripts/post-gen/${lang}.sh"

    if [[ -f "$postgen" ]]; then
        echo "> Running post-gen script for $generator..."
        $postgen "$generator"
    fi
}

if [[ ! $CI ]]; then
    build_spec
fi

run_pre_gen
generate_client
run_post_gen
