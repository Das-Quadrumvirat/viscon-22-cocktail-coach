<template>
    <div class="container mx-auto px-4">
        <h1 class="text-center text-5xl font-bold my-8">Ingredients</h1>
        <p class="text-center text-2xl">
            Select the ingredients you have available
        </p>
        <div class="container mx-auto max-w-6xl">
            <ais-instant-search
                :search-client="client"
                index-name="ingredients"
                class="mx-auto"
            >
                <ais-configure :hits-per-page.camel="1234567890" />
                <div class="hero my-8 w-xs">
                    <ais-search-box
                        placeholder="Type here to filter…"
                        class="searchbox w-full max-w-screen-md"
                    ></ais-search-box>
                </div>
                <ais-hits>
                    <template v-slot="{ items }">
                        <div class="flex flex-wrap justify-evenly">
                            <IngredientSelectItem
                                v-for="{ name, slug } in items"
                                v-bind:key="name"
                                :name="name"
                                :slug="slug"
                            />
                        </div>
                    </template>
                </ais-hits>
            </ais-instant-search>
        </div>
    </div>
</template>

<script setup>
import {
    AisInstantSearch,
    AisHits,
    AisSearchBox,
    AisConfigure
} from 'vue-instantsearch/vue3/es'

const client = useMeilisearchClient()
</script>
