# Cocktailcoach

A project by Das Quadrumvirat. Initially created during VISCON 2022.

An app to list, browse and interact with cocktail and drink recipies.

Using data from [The Cocktail DB](https://www.thecocktaildb.com/)

Available online at [cocktailcoach.vypxl.io](https://cocktailcoach.vypxl.io).

## Development

You will need `Docker`, `nodejs >= 16` and `pnpm`, `python 3` and the pip packages `python-slugify`, `python-dotenv` installed.
To fire up a local development environment, follow these steps:

1. Create a `.env` file and set `POSTGRES_PASSWORD` and `MEILIKEY` to some values and set a postgres and meili database url, e. g.

```bash
POSTGRES_PASSWORD=securepw
DATABASE_URL="postgresql://cocktailcoach:securepw@localhost:5432/db?schema=public"
MEILIKEY=securekey
MEILIURL=http://localhost:7700
```

2. Run `docker compose -f docker-compose-dev.yml up -d` to start up the databases
3. Run `pnpm i --shamefully-hoist` to install the packages
4. Run `pnpm prisma migrate dev` and `pnpm prisma generate` to generate set up the postgres db
5. Insert the data into the db. `./data/insert_data.py`
6. Create a search api key: `curl -X POST "$MEILIURL/keys" -H "Authorization: Bearer $MEILIKEY" -H "Content-Type: application/json" --data-binary '{"actions": ["*"], "indexes": ["*"], "expiresAt": null}'`
7. Save the generated search key into `.env` as `MEILI_SEARCH_KEY`
8. Run `pnpm run dev` to start the dev server
