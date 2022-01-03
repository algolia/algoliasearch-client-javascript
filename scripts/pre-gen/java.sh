#!/bin/bash

# Remove the oneOf in the spec until it's supported (https://github.com/OpenAPITools/openapi-generator/issues/10880).

# Remove the oneOf and only keep the last $ref
perl -0777 -i.bak -pe "s/oneOf[\s\S]*- \$ref(?!.*- \$ref)//g" ./specs/search/paths/search/search.yml
perl -0777 -i.bak -pe "s/oneOf[\s\S]*- \$ref(?!.*- \$ref)//g" ./specs/search/paths/objects/deleteBy.yml
perl -0777 -i.bak -pe "s/oneOf[\s\S]*- \$ref(?!.*- \$ref)//g" ./specs/search/paths/objects/partialUpdate.yml
