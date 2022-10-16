<template>
    <div>
        <div>
            <div
                class="absolute top-0 navbar mb-8 px-8 py-4 z-50 bg-black bg-opacity-40 shadow-xl"
            >
                <div class="flex w-20">
                    <button @click="back" class="btn btn-ghost">
                        <font-awesome-icon icon="fa-solid fa-house" />
                    </button>
                </div>
                <div class="flex flex-grow justify-center">
                    <h1 class="text-4xl text-bold text-white">
                        Your random Cocktail!
                    </h1>
                </div>
                <div class="w-20 justify-self-end">
                    <button class="btn btn-primary" @click="getRandomCocktail">
                        Next
                    </button>
                </div>
            </div>
        </div>
        <Cocktail v-if="cocktail" :cocktail="cocktail" />
    </div>
</template>

<script setup>
import Cocktail from '~~/components/cocktail.vue'

const cocktail = ref(null)

async function getRandomCocktail() {
    cocktail.value = await $fetch('/api/drink/random')
}

onBeforeMount(() => getRandomCocktail())

function back() {
    document.location.pathname = '/'
}
</script>
