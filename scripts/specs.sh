#!/bin/bash

# Break on non-zero code
set -e

SPEC=$1
OUTPUT=$2

SPECS=()

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null && pwd)"
# Move to the root (easier to locate other scripts)
cd ${DIR}/..

find_specs() {
    echo "> Searching for available specs..."
    local specs=( $(cat openapitools.json | jq -r '."generator-cli".generators[] | .glob') )

    for spec in "${specs[@]}"; do
        if [[ ! ${SPECS[*]} =~ $spec ]]; then
            SPECS+=($spec)
        fi
    done
}

build_spec() {
    local spec=$1
    local client=$(echo $spec | awk -F / '{ print $(NF-1) }')

    echo "> Building specs: ${client} ${OUTPUT}"

    yarn swagger-cli bundle ${spec} --outfile specs/dist/${client}.${OUTPUT} --type ${OUTPUT}
}

validate_spec() {
    local spec=$1
    local client=$(echo $spec | awk -F / '{ print $(NF-1) }')

    echo "> Validating specs: ${client}"

    yarn swagger-cli validate specs/dist/${client}.${OUTPUT}
}

find_specs

if [[ $SPEC == "all" ]]; then
    SPECS=("${SPECS[@]}")
elif [[ ${SPECS[*]} =~ ${SPEC} ]]; then
    SPECS=("specs/${SPEC}/spec.yml")
else
    echo "Unknown spec ${SPEC}"
    exit 1
fi

if [[ $OUTPUT != "yaml" ]] && [[ $OUTPUT != "json" ]]; then
    echo "Unknown output ${OUTPUT}"
    exit 1
fi

for spec in "${SPECS[@]}"; do
    build_spec $spec
    validate_spec $spec
done
