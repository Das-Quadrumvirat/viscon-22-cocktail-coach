#! /usr/bin/env python
import json
import re
from slugify import slugify

def strfmt(s):
    if not s:
        return None
    s = re.sub('\r', '', s)

    return s

def main():
    with open('ingredients_raw.json', 'r') as f:
        data_raw = json.load(f)
    data_new = []
    last = -1
    for i, x in enumerate(data_raw):
        data_new.append({
                            'id': i+1,
                            'name': x['strIngredient'],
                            'slug': slugify(x['strIngredient']),
                            'description': strfmt(x['strDescription']),
                            'ingredientType': x['strType'],
                            'alcohol': x['strAlcohol'] == 'Yes',
                            'abv': int(x['strABV'] or 0)
                        })
        last = i+1

    last =+ 1

    data_new.append({
                    'id': last,
                    'name': 'Carrot',
                    'slug': slugify('carrot'),
                    'description': 'Carrot',
                    'ingredientType': 'Carrot',
                    'alcohol': False,
                    'abv': 100,
                })

    with open('ingredients.json', 'w', encoding='utf-8') as f:
        json.dump(data_new, f, indent=2, ensure_ascii=False)

    print('done')

if __name__ == "__main__":
    main()
