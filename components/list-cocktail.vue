<template>
    <a :href="`/cocktail/${cocktail.slug}`" class="hero group transition-[background-size] bg-[length:100%_auto] hover:bg-[length:105%_auto]" :style="{ 'background-image': 'url(' + cocktail.drinkThumb + ')' }" v-for="cocktail in cocktails" :key="cocktail">
        <div class="hero-overlay transition-[background-opacity] bg-opacity-60 group-hover:bg-opacity-80"></div>
        <div class="hero-content text-neutral-content w-full">
            <div class="w-1/2 text-right">
                <h1 class="text-5xl font-bold my-8">{{ cocktail.name }}</h1>
            </div>
            <div class="w-1/2 text-left">
                <div class="mr-1 badge select-none">{{ cocktail.category }}</div>
                <div class="badge badge-error select-none" v-if="cocktail.alcoholic">Alcoholic</div>
                <div class="badge badge-success select-none" v-else>Non-Alcoholic</div>
            </div>
        </div>
    </a>
</template>

<script>
    export default {
        name: "list-cocktail",
        props: ["cocktails"]
    }
</script>
