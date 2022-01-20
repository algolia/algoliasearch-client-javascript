#!/bin/bash

export GENERATOR=$1
export CLIENT=$(cat openapitools.json | jq -r --arg generator "$GENERATOR" '."generator-cli".generators[$generator].output' | sed 's/#{cwd}\///g')

# Restore the oneOf spec
mv ./specs/search/paths/search/search.yml.bak ./specs/search/paths/search/search.yml
mv ./specs/search/paths/objects/deleteBy.yml.bak ./specs/search/paths/objects/deleteBy.yml
mv ./specs/search/paths/objects/partialUpdate.yml.bak ./specs/search/paths/objects/partialUpdate.yml

# Replace {} (OpenAPI default) with new Object
find "$CLIENT" -type f -name "*.java" | xargs sed -i -e 's~= {}~= new Object()~g'

# Create a special class for the OneOf integer string (not complete yet, juste here for compilation)
echo "package com.algolia.model;public class OneOfintegerstring {}" > $CLIENT/algoliasearch-core/com/algolia/model/OneOfintegerstring.java
echo "package com.algolia.model;public class OneOfstringbuiltInOperation {}" > $CLIENT/algoliasearch-core/com/algolia/model/OneOfstringbuiltInOperation.java

# Generate types for the EchoRequester, to be able to keep the correct response type on the API method.

# Extract the normal response to extend it
responses=($(grep -o 'public .*ApiCallback<.*>' $CLIENT/algoliasearch-core/com/algolia/**/*Api.java | sed 's/public.*ApiCallback<//; s/>$//; s/ //; s/^Map</HashMap</; s/^List</ArrayList</'))
operationId=($(grep -o 'public Call .*(' $CLIENT/algoliasearch-core/com/algolia/**/*Api.java | sed 's/public Call //; s/Async(//'))
mustacheData='{"responses": [] }'
for i in "${!responses[@]}"; do
    class="${operationId[$i]^}"
    super=${responses[$i]}

    mustacheData=$(echo $mustacheData | jq --arg class $class --arg super $super '.responses |= .+ [{className:$class,superClass:$super}]')
done

echo $mustacheData | yarn mustache - scripts/post-gen/javaEchoResponse.mustache > $CLIENT/algoliasearch-core/com/algolia/utils/echo/EchoResponse.java

format_client() {
    echo "> Formatting $GENERATOR..."

    # Download the formatter if not present and run it
    javaFormatter="google-java-format-1.13.0-all-deps.jar"

    if [[ ! -f "dist/$javaFormatter" ]]; then
        echo "Downloading formatter dependency"
        mkdir dist
        curl -L "https://github.com/google/google-java-format/releases/download/v1.13.0/$javaFormatter" > dist/$javaFormatter
    fi

    find $CLIENT -type f -name "*.java" | xargs java --add-exports jdk.compiler/com.sun.tools.javac.api=ALL-UNNAMED \
                                                     --add-exports jdk.compiler/com.sun.tools.javac.file=ALL-UNNAMED \
                                                     --add-exports jdk.compiler/com.sun.tools.javac.parser=ALL-UNNAMED \
                                                     --add-exports jdk.compiler/com.sun.tools.javac.tree=ALL-UNNAMED \
                                                     --add-exports jdk.compiler/com.sun.tools.javac.util=ALL-UNNAMED \
                                                     -jar dist/$javaFormatter -r

    CMD="yarn prettier --write $CLIENT"
    if [[ $VERBOSE == "true" ]]; then
        $CMD
    else
        set +e
        log=$($CMD)

        if [[ $? != 0 ]]; then
            echo "$log"
            exit 1
        fi
        set -e
    fi
}

format_client
