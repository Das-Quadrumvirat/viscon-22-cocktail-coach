#! /usr/bin/env python
import json
import re

def strfmt(s):
    if not s:
        return None
    s = re.sub('\r', '', s)

    return s

def main():
    with open('ingredients_raw.json', 'r') as f:
        data_raw = json.load(f)
    data_new = []

    for i, x in enumerate(data_raw):
        data_new.append({
                            'type': 'ingredient',
                            'id': i,
                            'name': x['strIngredient'],
                            'description': strfmt(x['strDescription']),
                            'ingredientType': x['strType'],
                            'alcohol': x['strAlcohol'] == 'Yes',
                            'abv': int(x['strABV'] or 0)
                        })
    with open('ingredients.json', 'w', encoding='utf-8') as f:
        json.dump(data_new, f, indent=2, ensure_ascii=False)

    print('done')

if __name__ == "__main__":
    main()
