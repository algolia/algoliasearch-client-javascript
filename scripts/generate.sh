#!/bin/bash

# Break on non-zero code
set -e

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null && pwd)"
# Move to the root (easier to locate other scripts)
cd ${DIR}/..

lang=$1
client=$2

# run the pre generation script if it exists (spec v)
pregen="./scripts/pre-gen/${lang}.sh"
if [[ -f "$pregen" ]]; then
    echo "Pre-gen for ${lang}-${client}"
    $pregen $client
fi

set +e
echo "Generating code for ${lang}-${client}"
log=$(yarn openapi-generator-cli generate --generator-key "${lang}-${client}")
if [[ $? != 0 ]]; then
    echo "$log"
    exit 1
fi
set -e

# run the post generation script if it exists (linting and additional files)
postgen="./scripts/post-gen/${lang}.sh"
if [[ -f "$postgen" ]]; then
    echo "Post-gen for ${lang}-${client}"
    $postgen $client
fi
