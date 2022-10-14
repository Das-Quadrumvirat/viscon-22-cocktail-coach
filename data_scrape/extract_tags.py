import json

f = open("drinks_raw.json")
j = json.load(f)

tags = set({})

for drink in j:
    taglist = drink['strTags']
    if taglist != None:
        for tag in taglist.split(','):
            tags.add(tag)

print(tags)
