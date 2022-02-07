#!/bin/bash

# Break on non-zero code
set -e

FOLDER=$1

# Generator does not allow new files, so we use existing ones to generate
# our `node` and `browser` build files.

mv $FOLDER/api.ts $FOLDER/node.ts
mv $FOLDER/src/apis.ts $FOLDER/browser.ts
