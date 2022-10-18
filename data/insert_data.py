#! /usr/bin/env python

import requests
import json
import os
from dotenv import load_dotenv


SETTINGS_DRINKS = """{
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
      ]}"""

SETTINGS_INGS = """{
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
      ]}"""


def main():
    load_dotenv()
    with open(os.path.join(os.path.dirname(__file__), "../data_scrape/formatted_data.json"), "r") as f:
        data = json.load(f)

    drinks = data["drinks"]
    ings = data["ingredients"]

    url = os.environ["MEILIURL"]
    key = os.environ["MEILIKEY"]

    headers = {'Authorization': f"Bearer: {key}"}
    headers_json = {
        "Authorization": f"Bearer {key}",
        "Content-Type": "application/json",
    }

    requests.delete(f"{url}/indexes/drinks", headers=headers).request.headers
    requests.delete(f"{url}/indexes/ingredients", headers=headers)

    requests.post(f"{url}/indexes/drinks/documents", headers=headers_json, json=drinks)
    requests.post(
        f"{url}/indexes/ingredients/documents", headers=headers_json, json=ings
    )

    requests.patch(
        f"{url}/indexes/drinks/settings", headers=headers_json, data=SETTINGS_DRINKS
    )
    requests.patch(
        f"{url}/indexes/ingredients/settings", headers=headers_json, data=SETTINGS_INGS
    )


if __name__ == "__main__":
    main()
