#!/bin/sh
curl \
        -X POST 'http://cocktailcoach.vypxl.io:7700/indexes/drinks/documents' \
        -H 'Content-Type: application/json' \
        -H "Authorization: Bearer ${MEILIKEY}" \
        --data-binary @drinks-meili.json
