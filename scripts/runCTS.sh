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
    elif [[ $LANGUAGE == 'java' ]]; then
        mvn clean test -f tests/output/java/pom.xml
    else
        echo "Cannot run CTS on unknown language $LANGUAGE"
        exit 1
    fi
}

run_cts
