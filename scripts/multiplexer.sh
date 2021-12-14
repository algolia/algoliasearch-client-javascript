#!/bin/bash
# Call this script with multiplexer.sh <cmd> <lang | all> <client | all>
# to run the cmd for all the required lang-client combination

# Break on non-zero code
set -e

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null && pwd)"
# Move to the root (easier to locate other scripts)
cd ${DIR}/..

CMD=$1
LANGUAGE=$2
CLIENT=$3

LANGUAGES=()
CLIENTS=()

GENERATORS=()

find_clients_and_languages() {
    echo "> Searching for available languages and clients..."

    GENERATORS=( $(cat openapitools.json | jq '."generator-cli".generators' | jq -r 'keys[]') )

    for generator in "${GENERATORS[@]}"; do
        local lang=${generator%-*}
        local client=${generator#*-}

        if [[ ! ${LANGUAGES[*]} =~ $lang ]]; then
            LANGUAGES+=($lang)
        fi

        if [[ ! ${CLIENTS[*]} =~ $client ]]; then
            CLIENTS+=($client)
        fi
    done
}

find_clients_and_languages

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
        if [[ " ${GENERATORS[*]} " =~ " ${lang}-${client} " ]]; then
            $CMD $lang $client
        fi
    done
done
