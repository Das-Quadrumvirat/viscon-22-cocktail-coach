<template>
    <div>
        <div class="card w-96 bg-neutral text-neutral-content mx-auto m-3">
            <div class="card-body items-center text-center">
                <h2 class="card-title">Lucky Cocktail</h2>
                <p>A random cocktail just for you.</p>
                <div class="card-actions justify-end">
                    <button class="btn btn-primary" @click="getRandomCocktail">Go!</button>
                </div>
            </div>
        </div>

        <a :href="`/cocktail/${cocktail.slug}`" v-if="cocktail">
            <Cocktail :cocktail="cocktail" v-if="cocktail" />
        </a>
    </div>
</template>

<script setup>
import Cocktail from '~~/components/cocktail.vue';
</script>
<script>
export default {
    data() {
        return {
            cocktail: null,
        }
    },
    methods: {
        async getRandomCocktail() {
            const hit = await $fetch("/api/drink/random")
            console.log(hit)
            this.cocktail = hit
        }
    }
}
</script>
