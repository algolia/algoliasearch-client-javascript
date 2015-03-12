#!/usr/bin/env bash

# Use this with `npm run build` so that `./node_modules/.bin` are injected into
# the PATH

license="/*! algoliasearch ${PACKAGE_VERSION} | © 2014, 2015 Algolia SAS | github.com/algolia/algoliasearch-client-js */"

echo 'Building algoliasearch-client-js'

echo '..Browserify'

# cannot use a loop, bundles are different (--standalone)
browserify index.js --standalone algoliasearch > dist/algoliasearch.js
browserify src/algoliasearch.angular.js > dist/algoliasearch.angular.js
browserify src/algoliasearch.jquery.js > dist/algoliasearch.jquery.js

echo '..Uglify'

bundles=( algoliasearch algoliasearch.angular algoliasearch.jquery )

for bundle in "${bundles[@]}"
do
  uglifyjs dist/"$bundle".js --mangle --compress=warnings=false > dist/"$bundle".min.js
done

echo '..Prepend license'

# http://www.cyberciti.biz/faq/bash-prepend-text-lines-to-file/
for bundle in "${bundles[@]}"
do
  echo "$license" | cat - dist/"$bundle".js > /tmp/out && mv /tmp/out dist/"$bundle".js
  echo "$license" | cat - dist/"$bundle".min.js > /tmp/out && mv /tmp/out dist/"$bundle".min.js
done

echo 'Done'
