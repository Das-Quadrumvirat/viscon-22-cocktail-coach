<template>
    <div class="hero min-h-screen" :style="{
        'background-image': 'url(' + cocktail.drinkThumb + ')'
    }">
        <div class="hero-overlay bg-opacity-70"></div>
        <div class="hero-content text-center text-neutral-content">
            <div class="max-w-md">
                <h1 class="mb-2 text-7xl font-bold">{{ cocktail.name }}</h1>
                <div class="mr-1 badge select-none">{{ cocktail.category }}</div>
                <div class="badge badge-error select-none" v-if="cocktail.alcoholic">Alcoholic</div>
                <div class="badge badge-success select-none" v-else>Non-Alcoholic</div>
                <div class="divider before:bg-white/50 after:bg-white/50"></div>
                <h2 class="mb-2 text-2xl font-bold">Ingredients</h2>
                <div class="flex flex-wrap space-x-6 justify-center">
                    <template v-for="(ingredient, index) in cocktail.ingredients">
                        <div>{{ ingredient }}</div>
                    </template>
                </div>
                <div class="divider before:bg-white/50 after:bg-white/50"></div>
                <h2 class="mb-2 text-2xl font-bold">Instructions</h2>
                <p>{{ cocktail.instructions[0].content }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
    const route = useRoute()
    const {data: cocktail} = await useFetch(`/api/drink/${route.params.slug}`)

    if (!cocktail.value) {
        throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
    }
</script>
