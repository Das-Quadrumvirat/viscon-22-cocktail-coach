import json

f = open("drinks_raw.json")
j = json.load(f)

glasses = set({})

for drink in j:
    glasses.add(drink['strGlass'])

print(glasses)
