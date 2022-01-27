#!/bin/bash

# Break on non-zero code
set -e

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null && pwd)"
# Move to the root (easier to locate other scripts)
cd ${DIR}/..

LANGUAGE=$1
CLIENT=$2
GENERATOR="$1-$2"

compute_hash() {
    cacheSpec=$(find specs/$CLIENT -type f -print0 | xargs -0 sha1sum | sha1sum | tr -d ' ')
    cacheCommon=$(find specs/common -type f -print0 | xargs -0 sha1sum | sha1sum | tr -d ' ')
    echo "$cacheSpec$cacheCommon"
}

# build spec before generating client
build_spec() {
    # check if file and cache exist
    cacheFile="specs/dist/$CLIENT.cache"
    if [[ -f specs/dist/$CLIENT.yml ]]; then
        cache=$(compute_hash)
        # compare with stored cache
        if [[ -f $cacheFile && $(cat $cacheFile) == $cache ]]; then
            echo "> Skipped building spec because the files did not change..."
            return
        fi
    fi
    yarn build:specs $CLIENT

    # store hash
    cache=$(compute_hash)
    echo $cache > $cacheFile
}

# Run the pre generation script if it exists.
run_pre_gen() {
    pregen="./scripts/pre-gen/${LANGUAGE}.sh"

    if [[ -f "$pregen" ]]; then
        echo "> Running pre-gen script for $GENERATOR..."
        $pregen $CLIENT
    fi
}

generate_client() {
    echo "> Generating code for $GENERATOR..."
    CMD="yarn openapi-generator-cli generate --generator-key $GENERATOR"
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
    postgen="./scripts/post-gen/${LANGUAGE}.sh"

    folder=$(cat openapitools.json | jq -r --arg generator "$GENERATOR" '."generator-cli".generators[$generator].output' | sed 's/#{cwd}\///g')

    if [[ -f "$postgen" ]]; then
        echo "> Running post-gen script for $GENERATOR..."
        $postgen $folder $GENERATOR
    fi

    ./scripts/formatter.sh $LANGUAGE $folder
}

if [[ ! $CI ]]; then
    build_spec
fi

run_pre_gen
generate_client
run_post_gen
