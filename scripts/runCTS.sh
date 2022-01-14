#!/bin/bash

# Break on non-zero code
set -e

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null && pwd)"
# Move to the root (easier to locate other scripts)
cd ${DIR}/..

lang=$1

# Run the pre generation script if it exists.
run_cts() {
    if [[ $lang == 'javascript' ]]; then
        yarn workspace javascript-tests test
    elif [[ $lang == 'java' ]]; then
        mvn clean compile exec:java -f tests/output/java/pom.xml
    fi
}

run_cts
