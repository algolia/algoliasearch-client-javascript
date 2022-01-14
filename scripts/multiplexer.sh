#!/bin/bash
# Call this script with multiplexer.sh <cmd> <lang | all> <client | all>
# to run the cmd for all the required lang-client combination

if [[ ! $CI ]] && [[ ! $DOCKER ]]; then
    echo "You should run scripts via the docker container, see README.md"

    exit 1
fi

# Break on non-zero code
set -e

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null && pwd)"
# Move to the root (easier to locate other scripts)
cd ${DIR}/..

CMD=${@:1:$#-2} # all arguments but the last 2
LANGUAGE=${@: -2:1} # before last argument
CLIENT=${@: -1} # last argument

if [[ $CMD == "./scripts/playground.sh" ]] && ([[ $LANGUAGE == "all" ]] || [[ $CLIENT == "all" ]]); then
    echo "You cannot use 'all' when running the playground, please specify the language and client"

    exit 1
fi

if [[ $CMD == "./scripts/runCTS.sh" ]]; then
    if [[ $CLIENT == "all" ]]; then
        CLIENT=search # dummy client to only run once
    else
        echo "You must use 'all' clients when testing the CTS, as they all run at the same time"

        exit 1
    fi
fi

LANGUAGES=()
CLIENTS=()

GENERATORS=()

find_clients_and_languages() {
    echo "> Searching for available languages and clients..."

    GENERATORS=( $(cat openapitools.json | jq '."generator-cli".generators' | jq -r 'keys[]') )

    for generator in "${GENERATORS[@]}"; do
        local lang=${generator%%-*}
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
            echo ""
        fi
    done
done
