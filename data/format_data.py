#! /usr/bin/env python
import json
import re
from slugify import slugify
import urllib.parse


def strfmt(s):
    if not s:
        return None
    s = re.sub("\r", "", s)

    return s


def load_ingredients():
    with open("ingredients_raw.json", "r") as f:
        data_raw = json.load(f)
    ings = []
    for x in data_raw:
        ing = {
            "name": x["strIngredient"],
            "slug": slugify(x["strIngredient"]),
            "description": strfmt(x["strDescription"]),
            "ingredientType": x["strType"],
            "alcohol": x["strAlcohol"] == "Yes",
            "abv": int(x["strABV"] or 0),
            "ingThumb": 'https://thecocktaildb.com/images/ingredients/' + urllib.parse.quote(x['strIngredient'] + '.png')
        }
        ings.append(ing)

    ings.append(
        {
            "name": "Carrot",
            "slug": slugify("carrot"),
            "description": "Carrot",
            "ingredientType": "Carrot",
            "alcohol": True,
            "abv": 100,
            "ingThumb": 'https://thecocktaildb.com/images/ingredients/carrot.png'
        }
    )

    ings.sort(key=lambda x: x['slug'])
    i = 1
    for x in ings:
        x['id'] = i
        i += 1

    return ings


def load_drinks():
    with open("drinks_raw.json", "r") as f:
        drinks_raw = json.load(f)
    drinks = []
    tags = set()
    ibas = set()
    glasses = set()
    categories = set()

    for x in drinks_raw:
        instrs = [
            {
                "type": "instructions",
                "language": l or "en",
                "content": strfmt(x[f"strInstructions{l.upper()}"]),
            }
            for l in ["", "de", "fr", "es", "it"]
        ]
        instrs = [a for a in instrs if a["content"]]
        ings = [slugify(a) for a in [x[f"strIngredient{n}"] for n in range(1, 16)] if a]
        msrs = [a.strip() for a in [x[f"strMeasure{n}"] for n in range(1, 16)] if a]

        drink = {
            "name": x["strDrink"],
            "slug": slugify(x["strDrink"]),
            "tags": [t.strip() for t in (x["strTags"] or "").split(",")],
            "category": x["strCategory"],
            "iba": x["strIBA"],
            "alcoholic": x["strAlcoholic"].lower() == "alcoholic",
            "glass": x["strGlass"],
            "instructions": instrs,
            "drinkThumb": x["strDrinkThumb"],
            "imageSource": x["strImageSource"],
            "imageAttribution": x["strImageAttribution"],
            "ingredients": ings,
            "measures": msrs,
        }

        drinks.append(drink)

        for t in drink["tags"]:
            if t:
                tags.add(t)

        if drink["iba"]:
            ibas.add(drink["iba"])
        glasses.add(drink["glass"])
        categories.add(drink["category"])

    drinks.sort(key=lambda d: re.sub(r'^[^a-z]+', '', d['slug']))
    i = 1
    for d in drinks:
        d['id'] = i
        i += 1

    data = {
        "tags": list(sorted(tags)),
        "categories": list(sorted(categories)),
        "ibas": list(sorted(ibas)),
        "glasses": list(sorted(glasses)),
        "drinks": drinks,
    }

    return data


def main():
    data = load_drinks()
    data["ingredients"] = load_ingredients()

    with open("formatted_data.json", "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)


if __name__ == "__main__":
    main()
