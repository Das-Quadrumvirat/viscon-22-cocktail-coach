<template>
    <div class="hero min-h-screen" :style="{
        'background-image': 'url(' + cocktail.drinkThumb + ')'
    }">
        <div class="hero-overlay bg-opacity-70"></div>
        <div class="hero-content text-center text-neutral-content">
            <div class="max-w-md">
                <h1 class="mb-2 text-7xl font-bold">{{ cocktail.name }}</h1>
                <div class="mr-1 badge">{{ cocktail.category.name }}</div>
                <div class="badge badge-error" v-if="cocktail.alcoholic">Alcoholic</div>
                <div class="badge badge-success" v-else>Non-Alcoholic</div>
                <div class="divider"></div>
                <h2 class="mb-2 text-2xl font-bold">Ingredients</h2>
                <div class="flex flex-wrap space-x-4 justify-center">
                    <div v-for="ingredient in cocktail.ingredients">{{ ingredient.name }}</div>
                </div>
                <div class="divider"></div>
                <h2 class="mb-2 text-2xl font-bold">Instructions</h2>
                <p>{{ cocktail.instructions[0].text }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
    const route = useRoute()
    const {data: cocktail} = await useFetch(`/api/drink/${route.params.id}`)

    if (!cocktail.value) {
        throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
    }
</script>
