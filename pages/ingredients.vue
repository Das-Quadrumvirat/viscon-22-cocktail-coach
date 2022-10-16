<template>
    <div class="sticky top-0 navbar bg-base-100 mb-8 border-b-[0.5px] px-8 py-4 z-50"
    >
        <div class="flex-grow">
            <button @click="back" class="btn btn-ghost">
                <font-awesome-icon icon="fa-solid fa-house" />
            </button>
            <h1 class="text-2xl ml-2">Ingredients</h1>
        </div>
        <div class="form-control">
            <input
                type="text"
                placeholder="Search Cocktail"
                class="input input-bordered text-white focus:outline-none"
                @focus="search"
            />
        </div>
    </div>
    <div class="container mx-auto px-4">
        <h2 class="text-center mb-2 text-2xl">
            Select the ingredients you have available
        </h2>
        <p class="text-center text-md">
            Don't worry about saving them, we are taking care of that
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
                            <template
                                v-for="{ slug, name } in items"
                                v-bind:key="slug"
                            >
                                <IngredientSelectItem
                                    v-if="selected.includes(slug)"
                                    :slug="slug"
                                    :name="name"
                                    :selected="true"
                                />
                            </template>
                        </div>
                        <div class="divider"></div>
                        <div class="flex flex-wrap justify-evenly">
                            <template
                                v-for="{ slug, name } in items"
                                v-bind:key="slug"
                            >
                                <IngredientSelectItem
                                    v-if="!selected.includes(slug)"
                                    :slug="slug"
                                    :name="name"
                                    :selected="false"
                                />
                            </template>
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
    AisConfigure,
} from 'vue-instantsearch/vue3/es'
import { useStore } from '~/stores/state'

const store = useStore()

const client = useMeilisearchClient()

const selected = computed(() => store.selectedIngredients)

function search(event) {
    document.location.pathname = '/search'
}

function back(event) {
    document.location.pathname = '/'
}
</script>
