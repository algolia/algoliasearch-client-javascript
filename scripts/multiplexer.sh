#!/bin/bash
# Call this script with multiplexer.sh <lang | all> <client | all> <cmd>
# to run the cmd for all the required lang-client combination

# Break on non-zero code
set -e

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null && pwd)"
# Move to the root (easier to locate other scripts)
cd ${DIR}/..

CMD=$1
LANGUAGE=$2
CLIENT=$3

LANGUAGES=(javascript)
CLIENTS=(search recommend personalization)

if [[ $LANGUAGE == "all" ]]; then
    LANGUAGE=("${LANGUAGES[@]}")
elif [[ " ${LANGUAGES[*]} " =~ " ${LANGUAGE} " ]]; then
    LANGUAGE=($LANGUAGE)
else
    echo "Unknown language ${LANGUAGE}"
    exit 1
fi

if [[ $CLIENT == "all" ]]; then
    CLIENT=("${CLIENTS[@]}")
elif [[ " ${CLIENTS[*]} " =~ " ${CLIENT} " ]]; then
    CLIENT=($CLIENT)
else
    echo "Unknown client ${CLIENT}"
    exit 1
fi

for lang in "${LANGUAGE[@]}"; do
    for client in "${CLIENT[@]}"; do
        $CMD $lang $client
    done
done
