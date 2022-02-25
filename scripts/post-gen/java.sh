#!/bin/bash

# Break on non-zero code
set -e

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null && pwd)"
# Move to the root (easier to locate other scripts)
cd ${DIR}/../..

FOLDER=$1

# Restore the oneOf spec
mv ./specs/search/paths/search/search.yml.bak ./specs/search/paths/search/search.yml
mv ./specs/search/paths/objects/deleteBy.yml.bak ./specs/search/paths/objects/deleteBy.yml
mv ./specs/search/paths/objects/partialUpdate.yml.bak ./specs/search/paths/objects/partialUpdate.yml

# Replace {} (OpenAPI default) with new Object
find "$FOLDER" -type f -name "*.java" | xargs sed -i -e 's~= {}~= new Object()~g'

# Create a special class for the OneOf integer string (not complete yet, juste here for compilation)
echo "package com.algolia.model;public class OneOfintegerstring {}" > $FOLDER/algoliasearch-core/com/algolia/model/OneOfintegerstring.java
echo 'package com.algolia.model;import com.google.gson.annotations.SerializedName;public class OneOfstringbuiltInOperation { @SerializedName("_operation") private String _operation; @SerializedName("value") private String value;public void set_operation(String op){_operation = op;} public void setValue(String value) {this.value=value;} }' > $FOLDER/algoliasearch-core/com/algolia/model/OneOfstringbuiltInOperation.java

# Generate types for the EchoRequester, to be able to keep the correct response type on the API method.

# Extract the normal response to extend it
responses=($(grep -o 'public .*ApiCallback<.*>' $FOLDER/algoliasearch-core/com/algolia/**/*Api.java | sed 's/public.*ApiCallback<//; s/>$//; s/ //; s/^Map</HashMap</; s/^List</ArrayList</'))
operationId=($(grep -o 'public Call .*(' $FOLDER/algoliasearch-core/com/algolia/**/*Api.java | sed 's/public Call //; s/Async(//'))
mustacheData='{"responses": [] }'
for i in "${!responses[@]}"; do
    class="${operationId[$i]^}"
    super=${responses[$i]}

    mustacheData=$(echo $mustacheData | jq --arg class $class --arg super $super '.responses |= .+ [{className:$class,superClass:$super}]')
done

echo $mustacheData | yarn mustache - scripts/post-gen/javaEchoResponse.mustache > $FOLDER/algoliasearch-core/com/algolia/utils/echo/EchoResponse.java
