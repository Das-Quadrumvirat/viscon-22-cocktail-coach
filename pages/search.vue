<template>
  <div class="flex mx-auto">
    <ais-instant-search
      :search-client="client"
      index-name="ingredients"
      class="mx-auto"
    >
      <ais-configure :hits-per-page.camel="20" />
      <ais-stats
        class="mx-auto"
        :class-names="{
    'ais-Stats-text': 'text-white',
  }"
      >
</ais-stats>
        <ais-voice-search search-as-you-speak/>
      <ais-search-box
        placeholder="Search here…"
        class="searchbox"
      ></ais-search-box>
        <ais-clear-refinements/>
        <ais-refinement-list operator="and" show-more show-more-limit="50" attribute="ingredients" :class-names="{
          'ais-re': ''
        }"/>
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
