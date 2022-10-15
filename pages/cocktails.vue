<template>
    <NuxtLink :to="`/cocktail/${cocktail.id}`" class="hero group" :style="{
        'background-image': 'url(' + cocktail.drinkThumb + ')'
    }" v-for="cocktail in cocktails">
        <div class="hero-overlay bg-opacity-60 group-hover:bg-opacity-80"></div>
        <div class="hero-content text-neutral-content w-full">
            <div class="w-1/2 text-right">
                <h1 class="text-5xl font-bold my-8">{{ cocktail.name }}</h1>
            </div>
            <div class="w-1/2 text-left">
                <div class="mr-1 badge select-none">{{ cocktail.category.name }}</div>
                <div class="badge badge-error select-none" v-if="cocktail.alcoholic">Alcoholic</div>
                <div class="badge badge-success select-none" v-else>Non-Alcoholic</div>
            </div>
        </div>
    </NuxtLink>
</template>

<script setup>
    const {data: cocktails} = await useFetch('/api/drink')
</script>
