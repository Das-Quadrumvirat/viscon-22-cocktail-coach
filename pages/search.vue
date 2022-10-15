<template>
    <ais-instant-search :search-client="client" index-name="drinks" class="w-full">
      <ais-configure :hits-per-page.camel="10" :distinct="true" :analytics="false" :enable-personalization.camel="true" />
      <div class="sticky top-0 px-5 pb-2 mb-2 bg-base-100 z-50">
        <div class="navbar">
          <div class="dropdown">
            <label tabindex="0" class="btn btn-ghost">
              <font-awesome-icon icon="fa-solid fa-bars" />
            </label>
            <div tabindex="0" class="mt-3 p-2 menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
              <ais-clear-refinements/>
              <ais-refinement-list operator="and" show-more :limit="5" :show-more-limit="15" attribute="ingredients" :class-names="{
                'ais-RefinementList-labelText': 'text-white mx-2'
              }"/>
            </div>
          </div>
          <ais-search-box class="flex-grow">
            <template v-slot="{ currentRefinement, isSearchStalled, refine }">
              <div class="form-control w-full">
                <input type="text" :value="currentRefinement" @input="refine($event.currentTarget.value)" placeholder="Search" class="input input-bordered text-white" />
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
            <a :href="`/cocktail/${cocktail.slug}`" class="hero group transition-[background-size] bg-[length:100%_auto] hover:bg-[length:105%_auto]" :style="{
              'background-image': 'url(' + cocktail.drinkThumb + ')'
          }" v-for="cocktail in items" :key="cocktail.name">
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
const client = useMeilisearchClient()
</script>
