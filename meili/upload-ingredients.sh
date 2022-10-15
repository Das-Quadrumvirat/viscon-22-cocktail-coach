#!/bin/sh
curl \
        -X POST 'http://cocktailcoach.vypxl.io:7700/indexes/ingredients/documents' \
        -H 'Content-Type: application/json' \
        -H "Authorization: Bearer ${MEILIKEY}" \
        --data-binary @ingredients-meili.json
