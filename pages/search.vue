<template>
  <div class="flex w-3/4 lg:w-2/3 mx-auto">
    <ais-instant-search :search-client="client" index-name="drinks" class="mx-auto w-full" >
      <ais-configure :hits-per-page.camel="4" :distinct="true" :analytics="false" :enable-personalization.camel="true" />
      <ais-stats class="mx-auto" :class-names="{ 'ais-Stats-text': 'text-white', }"/>
      <div class="flex flex-row items-center my-5">
        <ais-search-box class="flex-grow searchbox" select-none show-loading-indicator placeholder="Search for cocktails here…"></ais-search-box>
        <ais-voice-search class="ml-5">
          <template v-slot="{toggleListening, isListening}">
            <button @click="toggleListening">
              <font-awesome-icon v-if="!isListening" icon="fa-microphone" class="hover:scale-125"/>
              <font-awesome-icon icon="fa-solid fa-stop" v-else class="hover:scale-125"/>
            </button>
          </template>
        </ais-voice-search>
      </div>
      <div class="flex flex-row flex-wrap justify-start lg:flex-nowrap lg:justify-evenly">
        <div class="flex mb-5 flex-col">
        <ais-clear-refinements class="my-3 mr-3"/>
        <ais-refinement-list operator="and" show-more :limit="5" :show-more-limit="15" attribute="ingredients" :class-names="{
            'ais-RefinementList-labelText': 'text-white mx-2'
          }"/>
        </div>
        <div class="flex mx-auto flex-col items-center mr-5">
        <ais-hits>
          <template v-slot="{ items }">
            <ul>
              <li v-for="item in items" :key="item.name">
                  <cocktail :cocktail="item" class="mx-3"/>
              </li>
            </ul>
          </template>
        </ais-hits>
        <ais-pagination :total-pages="15"/>
        </div>
      </div>
    </ais-instant-search>
  </div>
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
