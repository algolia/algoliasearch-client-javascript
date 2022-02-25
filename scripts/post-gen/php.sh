#!/bin/bash
set -e

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null && pwd)"
# Move to the root (easier to locate other scripts)
cd ${DIR}/../..

FOLDER=$1

#Move Configuration file
mv ./$FOLDER/lib/Configuration.php ./$FOLDER/lib/Configuration/

