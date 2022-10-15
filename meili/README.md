# Meilisearch

currently MS only contains a modified dump of the drinks.json file (type field removed and id increased to match prismas entries)

## Get Started
- install meilisearch and run `./meilisearch` (it creates the database in your current working directory)

- then upload the data by running `./upload-drinks.sh`, note that you might need to `chmod +x upload-drinks.sh` first

## Example Filter:
make ingredients filterable: 
```sh
curl \
        -X PATCH 'http://cocktailcoach.vypxl.io:7700/indexes/drinks/settings' \
        -H 'Content-Type: application/json' \
        -H "Authorization: Bearer ${MEILIKEY}" \
        --data-binary '{
      "filterableAttributes": [
        "ingredients"
      ]}'
```
get all cocktails where Lime is an ingredients

```sh
curl \
        -X POST 'http://cocktailcoach.vypxl.io:7700/indexes/drinks/search' \
        -H 'Content-Type: application/json' \
        -H "Authorization: Bearer ${MEILIKEY}" \
        --data-binary '{ "filter": "ingredients = Lime", "limit": 574}'
```
