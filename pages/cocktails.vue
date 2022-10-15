<template>
    <div>
        <ListCocktail :cocktails="cocktails"/>
    </div>
</template>

<script setup>
    import ListCocktail from '~~/components/list-cocktail.vue';

    const {data: cocktails} = await useFetch('/api/drinks', {
        params: {
            offset: 0,
            limit: 50
        }
    })
</script>

