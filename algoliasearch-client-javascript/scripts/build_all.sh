#!/bin/bash
set -e

yarn build utils

PACKAGES_EXCEPT_FOR_UTILS=$(ls ./packages | grep -v -E "(client-common|requester-)")

for CLIENT in $PACKAGES_EXCEPT_FOR_UTILS
do
  SKIP_UTILS=true yarn build $CLIENT
done
