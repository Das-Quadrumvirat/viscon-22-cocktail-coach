<template>
    <div class="absolute top-0 navbar mb-8 px-8 py-4 z-50">
        <button @click="back" class="btn btn-ghost">
            <font-awesome-icon icon="fa-solid fa-arrow-left" />
        </button>
    </div>
    <Ingredient :ing="ingredient" />
</template>

<script setup>
import Ingredient from '~~/components/ingredient.vue'

const route = useRoute()
const { data: ingredient } = await useFetch(
    `/api/ingredient/${route.params.slug}`
)

function back() {
    document.location.pathname = '/'
}
</script>
