#!/usr/bin/env bash

kill -9 `ps aux | grep test-server-for-timeouts | awk '{print $2}'` 2> /dev/null || : && node scripts/test-server-for-timeouts.js &
