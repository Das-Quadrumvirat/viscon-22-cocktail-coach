<template>
    <Ingredient :ing="ingredient" />
</template>

<script setup>
    import Ingredient from '~~/components/ingredient.vue'

    const route = useRoute()
    const {data: ingredient} = await useFetch(`/api/ingredient/${route.params.slug}`)
</script>
