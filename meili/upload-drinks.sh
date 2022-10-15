#!/bin/sh
curl \
        -X POST 'http://localhost:7700/indexes/drinks/documents' \
        -H 'Content-Type: application/json' \
        --data-binary @drinks-meili.json
