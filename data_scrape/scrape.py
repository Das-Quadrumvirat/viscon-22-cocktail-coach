#! /usr/bin/env python
from requests import get
import json

def get_id(id):
    try:
        x = get(f"https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i={id}")
        y = x.json().get('drinks')
        if not x:
            return None
        return y[0]
    except:
        return None

def main():
    xs = []
    c = 0
    i = 11000
    
    if input("Do you really want to scrape again? (yes/no): ") != 'yes':
        return

    with open('data.json', 'w') as f:
        f.write('[')
        while len(xs) < 1 or (c < 1000):
            x = get_id(i)
            i += 1

            print(f"querying {i}: {x}")

            if not x:
                c += 1
            else:
                c = 0
                xs.append(x)

            json.dump(x, f, indent=2)
            f.write(",\n")
        f.write(']')

    with open('data2.json', 'w') as f:
        json.dump(xs, f, indent=2)

if __name__ == "__main__":
    main()
