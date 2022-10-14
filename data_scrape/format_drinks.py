#! /usr/bin/env python
import json
import re

def strfmt(s):
    if not s:
        return None
    s = re.sub('\r', '', s)

    return s

def main():
    with open('drinks_raw.json', 'r') as f:
        data_raw = json.load(f)
    data_new = []

    for i, x in enumerate(data_raw):
        instrs = [{ 'type': "instructions", 'language': l or 'en', 'content': strfmt(x[f"strInstructions{l.upper()}"])} for l in ['', 'de', 'fr', 'es', 'it']]
        instrs = [a for a in instrs if a['content']]
        ings = [a for a in [x[f"strIngredient{n}"] for n in range(1,16)] if a]
        msrs = [a.strip() for a in [x[f"strMeasure{n}"] for n in range(1,16)] if a]

        data_new.append({
                            'type': 'drink',
                            'id': i,
                            'name': x['strDrink'],
                            'tags': (x['strTags'] or "").split(','),
                            'category': x['strCategory'],
                            'iba': x['strIBA'],
                            'alcoholic': x['strAlcoholic'].lower() == 'alcoholic',
                            'glass': x['strGlass'],
                            'instructions': instrs,
                            'drinkThumb': x['strDrinkThumb'],
                            'imageSource': x['strImageSource'],
                            'imageAttribution': x['strImageAttribution'],
                            'ingredients': ings,
                            'measures': msrs,
                        })
    with open('drinks.json', 'w', encoding='utf-8') as f:
        json.dump(data_new, f, indent=2, ensure_ascii=False)

    print('done')

if __name__ == "__main__":
    main()
