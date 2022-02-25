#!/bin/bash

# Break on non-zero code
set -e

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null && pwd)"
# Move to the root (easier to locate other scripts)
cd ${DIR}/../..


FOLDER=$1
GENERATOR=$2

# Generator does not allow new files, so we use existing ones to generate
# our `node` and `browser` build files.
destination=$FOLDER/builds

mkdir -p $destination

mv $FOLDER/api.ts $destination/node.ts
mv $FOLDER/src/apis.ts $destination/browser.ts

buildFile=$(cat openapitools.json | jq -r --arg generator "$GENERATOR" '."generator-cli".generators[$generator].additionalProperties.buildFile' | sed 's/#{cwd}\///g')

echo -e "// eslint-disable-next-line import/no-commonjs,import/extensions\nmodule.exports = require('./dist/$buildFile.cjs.node.js');" > $FOLDER/index.js
echo -e "// eslint-disable-next-line import/no-unresolved\nexport * from './dist/builds/node';" > $FOLDER/index.d.ts
