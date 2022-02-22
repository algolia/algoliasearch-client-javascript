#!/bin/bash

# Break on non-zero code
set -e

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null && pwd)"
# Move to the root (easier to locate other scripts)
cd ${DIR}/..

LANGUAGE=$1

# Run the pre generation script if it exists.
run_cts() {
    if [[ $LANGUAGE == 'javascript' ]]; then
        yarn workspace javascript-tests test
    elif [[ $LANGUAGE == 'php' ]]; then
        if [[ $CI ]]; then
            PHP="php"
        else
            PHP="php8"
        fi
        $PHP ./clients/algoliasearch-client-php/vendor/bin/phpunit ./
    elif [[ $LANGUAGE == 'java' ]]; then
        ./gradle/gradlew --no-daemon -p tests/output/java test
    else
        echo "Skipping unknown language $LANGUAGE to run the CTS"
        exit 0
    fi
}

run_cts
