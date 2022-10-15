#!/bin/sh
curl \
        -X DELETE 'http://cocktailcoach.vypxl.io:7700/indexes/ingredients' \
        -H "Authorization: Bearer ${MEILIKEY}" \

curl \
        -X POST 'http://cocktailcoach.vypxl.io:7700/indexes/ingredients/documents' \
        -H 'Content-Type: application/json' \
        -H "Authorization: Bearer ${MEILIKEY}" \
        --data-binary @../data_scrape/ingredients.json
