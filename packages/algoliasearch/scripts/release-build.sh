echo $(pwd)
sed -i '' -e 's/"packages\//"@algolia\//g' dist/types.d.ts
sed -i '' -e 's/"@algolia\/algoliasearch/"algoliasearch/g' dist/types.d.ts 
cat types.d.ts >> dist/types.d.ts
