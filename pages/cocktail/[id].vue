<template>
    <div class="hero min-h-screen" :style="{
        'background-image': 'url(' + cocktail.strDrinkThumb + ')'
    }">
        <div class="hero-overlay bg-opacity-60"></div>
        <div class="hero-content text-center text-neutral-content">
            <div class="max-w-md">
                <h1 class="mb-2 text-7xl font-bold">{{ cocktail.strDrink }}</h1>
                <div class="mr-1 badge">{{ cocktail.strCategory }}</div>
                <div class="badge badge-error" v-if="cocktail.strAlcoholic === 'Alcoholic'">Alcoholic</div>
                <div class="badge badge-success" v-else>Non-Alcoholic</div>
                <div class="divider"></div>
                <h2 class="mb-2 text-2xl font-bold">Ingredients</h2>
                <div class="flex flex-wrap space-x-4 justify-center">
                    <div v-for="ingredient in ingredients">{{ ingredient }}</div>
                </div>
                <div class="divider"></div>
                <h2 class="mb-2 text-2xl font-bold">Instructions</h2>
                <p>{{ cocktail.strInstructions }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
    const route = useRoute()
    console.log(route.params.id)

    const cocktail = {
      "idDrink": "13196",
      "strDrink": "Long vodka",
      "strDrinkAlternate": null,
      "strTags": null,
      "strVideo": null,
      "strCategory": "Ordinary Drink",
      "strIBA": null,
      "strAlcoholic": "Alcoholic",
      "strGlass": "Highball glass",
      "strInstructions": "Shake a tall glass with ice cubes and Angostura, coating the inside of the glass. Pour the vodka onto this, add 1 slice of lime and squeeze juice out of remainder, mix with tonic, stir and voila you have a Long Vodka.",
      "strInstructionsES": null,
      "strInstructionsDE": "Sch\\u00fctteln Sie ein hohes Glas mit Eisw\\u00fcrfeln und Angostura und beschichten Sie so die Innenseite des Glases. Den Wodka dar\\u00fcber gie\\u00dfen, 1 Scheibe Limette hinzuf\\u00fcgen und den Saft aus dem Rest herausquetschen, mit Tonic mischen, umr\\u00fchren und voila, Sie haben einen langen Wodka.",
      "strInstructionsFR": null,
      "strInstructionsIT": "Agitare un bicchiere alto con cubetti di ghiaccio e angostura, ricoprendo l'interno del bicchiere.\r\nVersare la vodka su questo, aggiungere 1 fetta di lime e spremere il succo dal resto, mescolare con il tonico, mescolare e voil\\u00e0 hai una Long Vodka",
      "strInstructionsZH-HANS": null,
      "strInstructionsZH-HANT": null,
      "strDrinkThumb": "https://www.thecocktaildb.com/images/media/drink/9179i01503565212.jpg",
      "strIngredient1": "Vodka",
      "strIngredient2": "Lime",
      "strIngredient3": "Angostura bitters",
      "strIngredient4": "Tonic water",
      "strIngredient5": "Ice",
      "strIngredient6": null,
      "strIngredient7": null,
      "strIngredient8": null,
      "strIngredient9": null,
      "strIngredient10": null,
      "strIngredient11": null,
      "strIngredient12": null,
      "strIngredient13": null,
      "strIngredient14": null,
      "strIngredient15": null,
      "strMeasure1": "5 cl ",
      "strMeasure2": "1\\/2 ",
      "strMeasure3": "4 dashes ",
      "strMeasure4": "1 dl Schweppes ",
      "strMeasure5": "4 ",
      "strMeasure6": null,
      "strMeasure7": null,
      "strMeasure8": null,
      "strMeasure9": null,
      "strMeasure10": null,
      "strMeasure11": null,
      "strMeasure12": null,
      "strMeasure13": null,
      "strMeasure14": null,
      "strMeasure15": null,
      "strImageSource": null,
      "strImageAttribution": null,
      "strCreativeCommonsConfirmed": "No",
      "dateModified": "2017-08-24 10:00:12"
    }

    const ingredients = Array(15).fill(0).map((_, i) => cocktail['strIngredient' + (i + 1)]).filter(x => x)
</script>
