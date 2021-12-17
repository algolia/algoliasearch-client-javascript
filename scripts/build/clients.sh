#!/bin/bash

# Break on non-zero code
set -e

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null && pwd)"
# Move to the root (easier to locate other scripts)
cd ${DIR}/../..

lang=$1
client=$2
generator="$lang-$client"
package=$(cat openapitools.json | jq -r --arg generator "$generator" '."generator-cli".generators[$generator].additionalProperties.packageName')

# Commands are based on the lang
build_client(){
    echo "> Building $generator..."

    if [[ $lang == 'javascript' ]]; then
        yarn workspace $package build
    elif [[ $lang == 'java' ]]; then
        set +e

        log=$(mvn clean install -f clients/$package/pom.xml)

        if [[ $? != 0 ]]; then
            echo "$log"
            exit 1
        fi

        set -e
    fi
}



if [[ -z $package ]]; then
    echo "Unknown package ${package}"
    exit 1
fi

build_client
