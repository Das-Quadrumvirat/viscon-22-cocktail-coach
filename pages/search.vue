<template>
  <div>
    <div class="sticky top-0 px-5 py-2 bg-base-100 z-50 border-b-[0.5px]">
      <div class="navbar gap-1 md:gap-2">
        <div>
          <button @click="back" class="btn btn-ghost">
            <font-awesome-icon icon="fa-solid fa-house" />
          </button>
        </div>
        <div class="dropdown">
          <label tabindex="0" class="btn btn-ghost">
            <font-awesome-icon icon="fa-solid fa-sliders" />
          </label>
          <ul tabindex="0" class="mt-3 p-2 menu menu-compact dropdown-content bg-base-100 rounded-box w-96">
            <li class="flex flex-row">
              <input type="checkbox" id="use-available-toggle" class="toggle" v-model="useAvailable" @change="performQuery()" />
              <label for="use-available-toggle">Only show drinks with most ingredients available</label>
            </li>
          </ul>
        </div>
        <div class="flex-grow">
          <div class="form-control w-full">
            <input type="text" :value="currentQuery" @input="newQuery($event.currentTarget.value)" placeholder="Search" class="input input-bordered text-white focus:outline-none" autofocus />
          </div>
        </div>
        <NuxtLink
            to="/ingredients"
            class="btn btn-ghost normal-case text-xl"
        >
            My Ingredients
        </NuxtLink>
      </div>
      <div class="w-full">
        <p class="ml-2 text-gray-500">
          Found {{ numberOfHits }} Drink{{ numberOfHits === 1 ? '' : 's' }}{{ requestTime ? ` in ${(requestTime / 1000).toFixed(3)}s` : '' }}
          {{ actuallyUseAvailable ? ` that ${numberOfHits === 1 ? 'is' : 'are'} mostly made out of ingredients from your fridge` : '' }}
        </p>
      </div>
    </div>
    <div class="mb-5">
      <ListCocktail :cocktails="items"/>
    </div>
    <footer class="footer footer-center">
      <div :class="`btn-group grid grid-flow-col grid-cols-${pages.length + 2} gap-0 mb-5`" v-if="numberOfPages > 1">
        <button class="btn" :class="{'btn-disabled': currentPage === 0}" @click="goToPage(0)">
          <font-awesome-icon icon="fa-solid fa-backward" />
        </button>
        <button class="btn" :class="{'btn-active': page === currentPage}" @click="goToPage(page)" v-for="page in pages" :key="page">
          {{ page + 1 }}
        </button>
        <button class="btn" :class="{'btn-disabled': currentPage === numberOfPages - 1}" @click="goToPage(numberOfPages - 1)">
          <font-awesome-icon icon="fa-solid fa-forward" />
        </button>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { useStore } from '~/stores/state'

import { range } from '~~/util/util'

import ListCocktail from '~~/components/list-cocktail.vue'

const store = useStore()

const selected = computed(() => store.selectedIngredients)

const allIngredients = ref([])
const items = ref([])
const ingredients = ref([])
const currentQuery = ref('')
const numberOfPages = ref(0)
const currentPage = ref(0)
const numberOfHits = ref(0)
const requestTime = ref(0)
const requestCounter = ref(0)
const useAvailable = ref(true)

const actuallyUseAvailable = computed(() => useAvailable.value && selected.value.length > 0)

const pages = computed(() => {
  const pagesBefore = currentPage.value
  const pagesAfter = numberOfPages.value - currentPage.value - 1
  if (pagesBefore >= 3 && pagesAfter >= 3) {
    return range(7, currentPage.value - 3)
  } else if (numberOfPages.value <= 7) {
    return range(numberOfPages.value)
  } else if (pagesBefore < 3) {
    return range(7)
  } else {
    return range(7, numberOfPages.value - 7)
  }
})


async function newQuery(query) {
    currentQuery.value = query
    currentPage.value = 0
    await performQuery()
}

async function goToPage(page) {
    currentPage.value = page
    await performQuery()
}

async function performQuery() {
    const searchParams = {
        q: currentQuery.value,
        page: currentPage.value,
        maxItems: 50,
        available: selected.value,
        useAvailable: actuallyUseAvailable.value,
        filtered: ingredients.value.filter(x => x.isFiltered).map(x => x.slug)
    }

    const counterValue = ++requestCounter.value

    const start = performance.now()
    const searchResult = await $fetch('/api/search', {
        params: searchParams
    })
    const end = performance.now()

    if (requestCounter.value === counterValue) {
      items.value = searchResult.drinks
      ingredients.value = allIngredients.value.map((ingredient, index) => {
          return {
              slug: ingredient.slug,
              isFiltered: ingredients.value[index].isFiltered,
              isVisible: searchResult.containedIngredients.find(e => e.ingredient.slug === ingredient.slug) !== undefined
          }
      })
      numberOfPages.value = searchResult.numberOfPages
      numberOfHits.value = searchResult.numberOfHits
      requestTime.value = end - start

      try {
        scrollTo(0,0)
      } catch {}
    }
}

function back(event) {
    document.location.pathname = '/'
}


onMounted(async () => {
  allIngredients.value = await $fetch('/api/ingredients')

  ingredients.value = allIngredients.value.map(ingredient => {
    return {
      slug: ingredient.slug,
      isFiltered: false,
      isVisible: true
    }
  })

  performQuery()
});
</script>
