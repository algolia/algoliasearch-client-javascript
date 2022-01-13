#!/bin/bash

BASE_CHANGED=$1
BASE_BRANCH=$2

specs='{"client":[]}'
generators=( $(cat openapitools.json | jq '."generator-cli".generators' | jq -r 'keys[]') )

for generator in "${generators[@]}"; do
    client=${generator#*-}
    if [[ ! ${specs[*]} =~ $client ]]; then
        changed=$(git diff --shortstat origin/$BASE_BRANCH..HEAD -- specs/$client | wc -l)
        if [[ $BASE_CHANGED == "true" || $changed > 0 ]]; then
            specs=$(echo $specs | jq --arg client $client '.client |= .+ [$client]')
        fi
    fi
done

# Convert the array to json for the matrix
if [[ $(echo $specs | jq '.client | length') == 0 ]]; then
    # client cannot be empty or the matrix will fail
    matrix='{"client":["no-run"]}'
else
    matrix=$(echo $specs | jq -c)
fi

echo $matrix
