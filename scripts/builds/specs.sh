#!/bin/bash

if [[ ! $CI ]] && [[ ! $DOCKER ]]; then
    echo "You should run scripts via the docker container, see README.md"

    exit 1
fi

# Break on non-zero code
set -e

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null && pwd)"
# Move to the root (easier to locate other scripts)
cd ${DIR}/../..

CLIENT=$1
OUTPUT=$2

check_format_spec() {
    local client=$1
    echo "> Checking format of $client spec"
    yarn specs:lint $client
    echo ""
}

build_spec() {
    local client=$1
    yarn openapi bundle specs/${client}/spec.yml -o specs/dist/${client}.${OUTPUT} --ext ${OUTPUT}
    echo ""
}

validate_output_spec() {
    local client=$1
    yarn openapi lint specs/dist/${client}.${OUTPUT}
    echo ""
}

CLIENTS=$(find specs/*/spec.yml | awk -F / '{ print $(NF-1) }')

if [[ $CLIENT == "all" ]]; then
    CLIENTS=("${CLIENTS[@]}")
elif [[ ${CLIENTS[*]} =~ ${CLIENT} ]]; then
    CLIENTS=($CLIENT)
else
    echo "Unknown spec ${CLIENT}"
    exit 1
fi

if [[ $OUTPUT != "yml" ]] && [[ $OUTPUT != "json" ]]; then
    echo "Unknown output ${OUTPUT}"
    exit 1
fi

for client in "${CLIENTS[@]}"; do
    check_format_spec $client
    build_spec $client
    validate_output_spec $client
done
