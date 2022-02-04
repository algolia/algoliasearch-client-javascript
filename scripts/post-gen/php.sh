#!/bin/bash
set -e
FOLDER=$1

#Move Configuration file
mv ./$FOLDER/lib/Configuration.php ./$FOLDER/lib/Configuration/

