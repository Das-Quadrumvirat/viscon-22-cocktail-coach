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
                            <a :href="'/ingredient/' + ingredient.slug">{{ ingredient.name }}</a>
                        </div>
                    </template>
                </div>
                <div class="divider before:bg-white/50 after:bg-white/50"></div>
                <h2 class="mb-2 text-2xl font-bold">Instructions</h2>
                <p>{{ cocktail.instructions[0].content }}</p>
                <div class="btn btn-wide btn-primary mt-8" @click="madeCocktail" v-if="!made_cocktail && loggedIn">Made!</div>
                <div class="btn btn-wide btn-disabled mt-8" v-if="made_cocktail && loggedIn">Made!</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Drink } from '~~/util/types';

const loggedIn = useCookie('user_id')

const props = defineProps<{
    cocktail: Drink
}>()

let cocktail = computed(() => props.cocktail)

let made_cocktail = ref(true)

async function fetchIfMade() {
    try {
        const values = await $fetch("/api/user/drink/made")
        if (values.find((e) => e.slug === props.cocktail.slug)) {
            made_cocktail.value = true
        } else {
            made_cocktail.value = false
        }
    } catch (error) {
        if (error instanceof Error) console.error(error)
        made_cocktail.value = false
    }
}

onMounted(async () => {
    await fetchIfMade()
})

watch(cocktail, async (o, n) => {
    await fetchIfMade()
})


async function madeCocktail() {
    const now_i_made = await $fetch(`/api/user/drink/${props.cocktail.slug}/made`)
    made_cocktail.value = true
}
</script>

<script lang="ts">
export default {
    name: "cocktail",
}
</script>
