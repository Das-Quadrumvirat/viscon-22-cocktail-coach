<template>
    <ais-instant-search :search-client="client" :search-function="searchFunction" index-name="drinks" class="w-full">
      <ais-configure :hits-per-page.camel="10" :distinct="true" :analytics="false" :enable-personalization.camel="true" />
      <div class="sticky top-0 px-5 py-2 bg-base-100 z-50 border-b-[0.5px]">
        <div class="navbar">
          <div>
            <button @click="back" class="btn btn-ghost">
              <font-awesome-icon icon="fa-solid fa-arrow-left" />
            </button>
          </div>
          <div class="dropdown">
            <label tabindex="0" class="btn btn-ghost">
              <font-awesome-icon icon="fa-solid fa-bars" />
            </label>
            <div tabindex="0" class="mt-3 p-2 menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
              <ais-clear-refinements
                operator="or" show-more :limit="5" :show-more-limit="15" attribute="ingredients" :class-names="{
                'ais-RefinementList-labelText': 'text-white mx-2'
              }" />
            </div>
          </div>
          <ais-search-box class="flex-grow">
            <template v-slot="{ currentRefinement, isSearchStalled, refine }">
              <div class="form-control w-full">
                <input type="text" :value="currentRefinement" @input="refine($event.currentTarget.value)" placeholder="Search" class="input input-bordered text-white" autofocus />
              </div>
            </template>
          </ais-search-box>
          <ais-voice-search class="ml-5">
            <template v-slot="{toggleListening, isListening}">
              <button @click="toggleListening">
                <font-awesome-icon v-if="!isListening" icon="fa-microphone" class="hover:scale-125"/>
                <font-awesome-icon icon="fa-solid fa-stop" v-else class="hover:scale-125"/>
              </button>
            </template>
          </ais-voice-search>
        </div>
        <ais-stats :class-names="{ 'ais-Stats-text': 'text-white', }"/>
      </div>
      <ais-hits>
        <template v-slot="{ items }">
          <div class="mb-5">
            <ListCocktail :cocktails="items"/>
          </div>
        </template>
      </ais-hits>
      <ais-pagination>
        <template v-slot="{ currentRefinement, nbPages, pages, isFirstPage, isLastPage, refine }">
          <footer class="footer footer-center">
            <div :class="`btn-group grid grid-flow-col grid-cols-${pages.length + 2} gap-0 mb-5`" v-if="nbPages > 1">
              <button class="btn" :class="{'btn-disabled': isFirstPage}" @click="refine(0)">
                <font-awesome-icon icon="fa-solid fa-backward" />
              </button>
              <button class="btn" :class="{'btn-active': page === currentRefinement}" @click="refine(page)" v-for="page in pages" :key="page">
                {{ page + 1 }}
              </button>
              <button class="btn" :class="{'btn-disabled': isLastPage}" @click.prevent="refine(nbPages)">
                <font-awesome-icon icon="fa-solid fa-forward" />
              </button>
            </div>
          </footer>
        </template>
      </ais-pagination>
    </ais-instant-search>
</template>

<script>
export default {
    data() {
      return {
        searchFunction(helper) {
          console.log('Foo')

          helper.search()
        },
      }
    }
}
</script>

<script setup>
import {
  AisInstantSearch,
  AisHits,
  AisSearchBox,
  AisRefinementList,
  AisPagination,
  AisClearRefinements,
  AisStats,
  AisVoiceSearch,
  AisConfigure
} from 'vue-instantsearch/vue3/es'
import { useStore } from '~/stores/state'

import ListCocktail from '~~/components/list-cocktail.vue'

const client = useMeilisearchClient()
const store = useStore()

const selected = computed(() => store.selectedIngredients)

function back(event) {
    document.location.pathname = '/'
}
</script>
