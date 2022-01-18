#!/bin/bash

if [[ ! $CI ]] && [[ ! $DOCKER ]]; then
    echo "You should run scripts via the docker container, see README.md"

    exit 1
fi

# Break on non-zero code
set -e

SPEC=$1
OUTPUT=$2

SPECS=()
CLIENT=""

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null && pwd)"
# Move to the root (easier to locate other scripts)
cd ${DIR}/../..

find_specs() {
    echo "> Searching for available specs..."

    SPECS=($(find specs/*/spec.yml))

    echo ""
}

check_format_spec() {
    local spec=$1

    echo "> Checking format of input spec file ${spec}"

    yarn eslint --ext=yml ${spec}

    echo ""
}

build_spec() {
    local spec=$1

    yarn openapi bundle ${spec} -o specs/dist/${CLIENT}.${OUTPUT} --ext ${OUTPUT}

    echo ""
}

validate_spec() {
    local spec=$1

    yarn openapi lint specs/dist/${CLIENT}.${OUTPUT}

    echo ""
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

if [[ $OUTPUT != "yml" ]] && [[ $OUTPUT != "json" ]]; then
    echo "Unknown output ${OUTPUT}"
    exit 1
fi

for spec in "${SPECS[@]}"; do
    CLIENT=$(echo $spec | awk -F / '{ print $(NF-1) }')

    check_format_spec $spec
    build_spec $spec
    validate_spec $spec
done
