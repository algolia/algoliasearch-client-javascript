#!/bin/bash

LANGUAGE=$1
BASE_CHANGED=$2
BASE_BRANCH=$3

clients=$(cat openapitools.json | jq --arg lang $LANGUAGE -c '."generator-cli".generators 
                                | with_entries(
                                    if (.key | test($lang + "-.*")) then 
                                        ({key:.key,value:.value}) 
                                    else 
                                        empty 
                                    end
                                ) 
                                | to_entries 
                                | map({
                                    name:.key | sub($lang + "-";""),
                                    folder:.value.output | sub("#{cwd}/";"")
                                }) 
                                | .[]')

to_test='{"client": []}'
for pair in $clients; do
    name=$(echo $pair | jq '.name')
    folder=$(echo $pair | jq '.folder')
    spec_changed=$(git diff --shortstat origin/$BASE_BRANCH..HEAD -- specs/$name | wc -l)
    client_changed=$(git diff --shortstat origin/$BASE_BRANCH..HEAD -- $folder | wc -l)
    if [[ $BASE_CHANGED == "true" || $spec_changed > 0 || $client_changed > 0 ]]; then
        to_test=$(echo $to_test | jq --argjson pair $pair '.client |= .+ [$pair]')
    fi
done

# Convert the array to json for the matrix
if [[ $(echo $to_test | jq '.client | length') == 0 ]]; then
    # client cannot be empty or the matrix will fail
    matrix='{"client":["no-run"]}'
else
    matrix=$(echo $to_test | jq -c)
fi

echo $matrix
