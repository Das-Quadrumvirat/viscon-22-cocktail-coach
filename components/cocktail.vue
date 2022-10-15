<template>
    <div class="hero min-h-screen" :style="{
        'background-image': 'url(' + cocktail.drinkThumb + ')'
    }">
        <div class="hero-overlay bg-opacity-70"></div>
        <div class="hero-content text-center text-white">
            <div class="max-w-md">
                <h1 class="mb-2 text-7xl font-bold">{{ cocktail.name }}</h1>
                <div class="mr-1 badge select-none">{{ cocktail.category }}</div>
                <div class="badge badge-error select-none" v-if="cocktail.alcoholic">Alcoholic</div>
                <div class="badge badge-success select-none" v-else>Non-Alcoholic</div>
                <div class="divider before:bg-white/50 after:bg-white/50"></div>
                <h2 class="mb-3 text-2xl font-bold">Ingredients</h2>
                <div class="flex flex-wrap justify-center">
                    <template v-for="({ingredient, measure}, index) in cocktail.ingredients">
                        <div class="flex flex-col mx-5" :class="{'mb-5': index < cocktail.ingredients.length - 1 }">
                            <p class="opacity-60">{{ measure }}</p>
                            <p>{{ ingredient.name }}</p>
                        </div>
                    </template>
                </div>
                <div class="divider before:bg-white/50 after:bg-white/50"></div>
                <h2 class="mb-2 text-2xl font-bold">Instructions</h2>
                <p>{{ cocktail.instructions[0].content }}</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "cocktail",
        props: ["cocktail"]
    }
</script>
