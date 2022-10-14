import json

f = open("drinks_raw.json")
j = json.load(f)

categories = set({})

for drink in j:
    categories.add(drink['strCategory'])

print(categories)
