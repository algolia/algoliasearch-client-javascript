#!/bin/bash

# Break on non-zero code
set -e

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null && pwd)"
# Move to the root (easier to locate other scripts)
cd ${DIR}/..

lang=$1
client=$2

# Run the pre generation script if it exists.
run_pre_gen() {
    pregen="./scripts/pre-gen/${lang}.sh"

    if [[ -f "$pregen" ]]; then
        echo "> Running pre-gen script for ${lang}-${client}..."
        $pregen $client
    fi
}

generate_client() {
    set +e

    echo "> Generating code for ${lang}-${client}..."

    log=$(yarn openapi-generator-cli generate --generator-key "${lang}-${client}")

    if [[ $? != 0 ]]; then
        echo "$log"
        exit 1
    fi

    set -e
}

# Run the post generation script if it exists.
run_post_gen() {
    postgen="./scripts/post-gen/${lang}.sh"

    if [[ -f "$postgen" ]]; then
        echo "> Running post-gen script for ${lang}-${client}..."
        $postgen "${lang}-${client}"
    fi
}

run_pre_gen
generate_client
run_post_gen
