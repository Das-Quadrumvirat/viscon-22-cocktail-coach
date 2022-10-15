#!/bin/sh
curl \
        -X DELETE 'http://cocktailcoach.vypxl.io:7700/indexes/drinks' \
        -H "Authorization: Bearer ${MEILIKEY}" \

curl \
        -X POST 'http://cocktailcoach.vypxl.io:7700/indexes/drinks/documents' \
        -H 'Content-Type: application/json' \
        -H "Authorization: Bearer ${MEILIKEY}" \
        --data-binary @../data_scrape/drinks.json
