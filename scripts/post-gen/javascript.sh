client=$1

export CLIENT=$(cat openapitools.json | yarn json "generator-cli.generators.javascript-${client}.output" | sed 's/#{cwd}\///g')
mkdir -p $CLIENT/utils
cp -R clients/algoliasearch-client-javascript/utils/ $CLIENT/utils

eslint --ext=ts ${CLIENT} --fix
