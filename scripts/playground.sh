#!/bin/bash

# Break on non-zero code
set -e

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null && pwd)"
# Move to the root (easier to locate other scripts)
cd ${DIR}/..

lang=$1
client=$2

# Run the pre generation script if it exists.
run_playground() {
    if [[ $lang == 'javascript' ]]; then
        yarn workspace javascript-playground start:$client
    elif [[ $lang == 'java' ]]; then
        mvn clean compile exec:java -f playground/java/pom.xml
    fi
}

run_playground
