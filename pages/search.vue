<template>
  <div class="flex w-3/4 lg:w-1/2 mx-auto">
    <ais-instant-search :search-client="client" index-name="drinks" class="mx-auto w-full" >
      <ais-configure :hits-per-page.camel="4" :distinct="true" :analytics="false" :enable-personalization.camel="true" />
      <ais-stats class="mx-auto" :class-names="{ 'ais-Stats-text': 'text-white', }"/>
      <div class="flex flex-row items-center my-5">
        <ais-search-box class="flex-grow searchbox" select-none show-loading-indicator placeholder="Search for cocktails here…"></ais-search-box>
        <ais-voice-search class="ml-5">
          <template v-slot="{ toggleListening, }">
            <button @click="toggleListening">
              <i class='fas fa-microphone'></i>
            </button>
          </template>
        </ais-voice-search>
      </div>
      <div class="flex flex-row justify-start">
        <div class="flex flex-col">
        <ais-clear-refinements class="my-3 mx-auto"/>
        <ais-refinement-list operator="and" show-more :limit="5" :show-more-limit="15" attribute="ingredients" :class-names="{
            'ais-RefinementList-labelText': 'text-white mx-2'
          }"/>
        </div>
        <div class="flex mx-auto flex-col items-center">
        <ais-hits>
          <template v-slot="{ items }">
            <ul>
              <li class="text-white text-center" v-for="{name} in items" v-bind:key="name">
                <h1>{{ name }}</h1>
              </li>
            </ul>
          </template>
        </ais-hits>
        <ais-pagination :total-pages="10"/>
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
  AisVoiceSearch
} from 'vue-instantsearch/vue3/es'
const client = useMeilisearchClient()
</script>
