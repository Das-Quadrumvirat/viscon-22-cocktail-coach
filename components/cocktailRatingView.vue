<template>
    <SingleRatingView :value="average" :idx="0" />

    <RatingFromUserView v-for="single,idx in singles" :rating="single" :idx="idx + 1" />
</template>

<script setup lang="ts">
import { Drink } from '~~/util/types';

const props = defineProps<{
    cocktail: Drink
}>()


const { data } = await useFetch(`/api/user/drink/${props.cocktail.slug}/rating`)
const average = data.value.average

const singles = data.value.singles

console.log(singles)

</script>