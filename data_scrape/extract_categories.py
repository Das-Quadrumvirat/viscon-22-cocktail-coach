import json

f = open("drinks_raw.json")
j = json.load(f)

categories = set({})

for drink in j:
    categories.add(drink['strCategory'])

with open('categories.json', 'w') as f:
    json.dump(list(categories), f, indent=2)
