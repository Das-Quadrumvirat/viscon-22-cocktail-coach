<template>
    <div class="rating">
        <input type="radio" :name="name" class="mask mask-star" checked v-if="ratingValue === 1"  aria-disabled="true" />
        <input type="radio" :name="name" class="mask mask-star" v-if="ratingValue != 1" aria-disabled="true"/>
        <input type="radio" :name="name" class="mask mask-star" checked v-if="ratingValue === 2" aria-disabled="true"/>
        <input type="radio" :name="name" class="mask mask-star" v-if="ratingValue != 2" aria-disabled="true"/>
        <input type="radio" :name="name" class="mask mask-star" checked v-if="ratingValue === 3" aria-disabled="true"/>
        <input type="radio" :name="name" class="mask mask-star" v-if="ratingValue != 3" />
        <input type="radio" :name="name" class="mask mask-star" checked v-if="ratingValue === 4" aria-disabled="true"/>
        <input type="radio" :name="name" class="mask mask-star" v-if="ratingValue != 4" aria-disabled="true"/>
        <input type="radio" :name="name" class="mask mask-star" checked v-if="ratingValue === 5" aria-disabled="true"/>
        <input type="radio" :name="name" class="mask mask-star" v-if="ratingValue != 5" aria-disabled="true"/>
    </div>
</template>

<script setup lang="ts">
    const props = defineProps<{
        value: number,
        idx: number
    }>()
    const ratingValue = Math.round(props.value)
    const name = `rating-${props.idx}` 
</script>