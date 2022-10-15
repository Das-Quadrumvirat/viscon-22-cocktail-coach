export type Ingredient = {
  id: number,
  name: String,
  slug: String,
  description: String,
  ingredientType: String,
  alcohol: Boolean,
  ABV: number,
}

export type Drink = {
  id: number,
  slug: String,
  name: String,
  tags: String[],
  category: String | null,
  iba: String | null,
  alcoholic: boolean,
  glass: String,
  instructions: String[],
  drinkThumb: String | null,
  ingredients: {
    ingredient: Ingredient,
    measure: String
  }[],
  imageAttribution: String | null,
  imageSource: String | null,
}

export type SearchResult = {
  drinks: Drink[],
  containedIngredients: {
    ingredient: Ingredient,
    number: Number,
  }[],
  numberOfPages: Number,
}
