#!/bin/bash

# Break on non-zero code
set -e

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null && pwd)"
# Move to the root (easier to locate other scripts)
cd ${DIR}/..

LANGUAGE=$1
CLIENT=$2

# Run the pre generation script if it exists.
run_playground() {
    if [[ $LANGUAGE == 'javascript' ]]; then
        yarn workspace javascript-playground start:$CLIENT
    elif [[ $LANGUAGE == 'java' ]]; then
        ./gradle/gradlew --no-daemon -p playground/java run
    elif [[ $lang == 'php' ]]; then
        cd playground/php
        composer update
        composer dump-autoload
        cd src
        php8 $client.php
    fi
}

run_playground
