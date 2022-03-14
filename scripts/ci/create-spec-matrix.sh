#!/bin/bash

BASE_CHANGED=$1
BASE_BRANCH=$2

GENERATORS=( $(cat openapitools.json | jq '."generator-cli".generators' | jq -r 'keys[]') )
SPECS=()

to_check='{"client":[]}'
for generator in "${GENERATORS[@]}"; do
    client=${generator#*-}
    if [[ ! ${SPECS[*]} =~ $client ]]; then
        changed=$(git diff --shortstat $BASE_BRANCH..HEAD -- specs/$client | wc -l)
        SPECS+=($client)
        if [[ $BASE_CHANGED == "true" || $changed > 0 ]]; then
            to_check=$(echo $to_check | jq --arg client $client '.client |= .+ [$client]')
        fi
    fi
done

# Convert the array to json for the matrix
if [[ $(echo $to_check | jq '.client | length') == 0 ]]; then
    # client cannot be empty or the matrix will fail
    matrix='{"client":["no-run"]}'
else
    matrix=$(echo $to_check | jq -c)
fi

echo $matrix
