<template>
  <div>
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
          </div>
        </div>
        <div class="flex-grow">
          <div class="form-control w-full">
            <input type="text" :value="currentQuery" @input="newQuery($event.currentTarget.value)" placeholder="Search" class="input input-bordered text-white" autofocus />
          </div>
        </div>
      </div>
      <div>Stats</div>
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
        <button class="btn" :class="{'btn-disabled': currentPage === numberOfPages - 1}" @click="goToPage(numberOfPages)">
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

const {data: allItems} = await useFetch('/api/drinks')
const {data: allIngredients} = await useFetch('/api/ingredients')

const selected = computed(() => store.selectedIngredients)

const items = ref(allItems.value)
const ingredients = ref(allIngredients.value.map(ingredient => {
  return {
    slug: ingredient.slug,
    isFiltered: false,
    isVisible: true
  }
}))
const currentQuery = ref('')
const numberOfPages = ref(1)
const currentPage = ref(0)

const pages = computed(() => range(7, currentPage - 3).filter(x => x >= 0 && x < numberOfPages))


async function newQuery(query) {
    currentQuery.value = query
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
        available: [],
        useAvailable: false,
        filtered: ingredients.value.filter(x => x.isFiltered).map(x => x.slug)
    }

    const searchResult = await $fetch('/api/search', {
        params: searchParams
    })

    items.value = searchResult.drinks
    ingredients.value = allIngredients.value.map((ingredient, index) => {
        return {
            slug: ingredient.slug,
            isFiltered: ingredients.value[index].isFiltered,
            isVisible: searchResult.containedIngredients.find(e => e.ingredient.slug === ingredient.slug) !== undefined
        }
    })
    numberOfPages.value = searchResult.numberOfPages
}


function back(event) {
    const router = useRouter()
    router.back()
}
</script>
