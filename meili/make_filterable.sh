#!/bin/sh

curl \
        -X PATCH 'http://cocktailcoach.vypxl.io:7700/indexes/drinks/settings' \
        -H 'Content-Type: application/json' \
        -H "Authorization: Bearer ${MEILIKEY}" \
        --data-binary '{
      "filterableAttributes": [
        "id",
        "name",
        "slug",
        "tags",
        "category",
        "iba",
        "alcoholic",
        "glass",
        "instructions",
        "ingredients"
      ],
      "sortableAttributes": [
        "id",
        "name",
        "slug",
        "tags",
        "category",
        "iba",
        "alcoholic",
        "glass",
        "instructions",
        "ingredients"
      ]}'

curl \
        -X PATCH 'http://cocktailcoach.vypxl.io:7700/indexes/ingredients/settings' \
        -H 'Content-Type: application/json' \
        -H "Authorization: Bearer ${MEILIKEY}" \
        --data-binary '{
      "filterableAttributes": [
        "id",
        "name",
        "slug",
        "description",
        "ingredientType",
        "alcohol",
        "ABV"
      ],
      "sortableAttributes": [
        "id",
        "name",
        "slug",
        "description",
        "ingredientType",
        "alcohol",
        "ABV"
      ]}'
