<template>
    <Cocktail :cocktail="cocktail" />
</template>

<script setup>
    import Cocktail from '~~/components/cocktail.vue'

    const route = useRoute()
    const {data: cocktail} = await useFetch(`/api/drink/${route.params.slug}`)

    if (!cocktail.value) {
        throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
    }
</script>
