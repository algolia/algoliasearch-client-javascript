#!/bin/bash

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null && pwd)/../.."

cd $ROOT

NODE_VERSION=$(cat .nvmrc)

docker build --build-arg NODE_VERSION=$NODE_VERSION -t api-clients-automation .
