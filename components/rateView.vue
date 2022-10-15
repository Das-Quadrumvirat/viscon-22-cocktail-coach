<template>
    <div>
        <input type="range" min="1" max="5" v-model="rating_value" class="range" step="1" />
        <div class="w-full flex justify-between text-xs px-2">
            <span>⭐️</span>
            <span>⭐️</span>
            <span>⭐️</span>
            <span>⭐️</span>
            <span>⭐️</span>
        </div>
        <button class="btn btn-primary" @click="submitReview">Review</button>
    </div>
</template>

<script setup>
    const props = defineProps(['cocktail'])

    let rating_value = ref(3)

    function numberToRating(num) {
        switch (Math.round(num)) {
            case 1:
                return 'One'
            case 2:
                return 'Two'
            case 3:
                return 'Three'
            case 4:
                return 'Four'
            case 5:
                return 'Five'
        }
    }
    
    async function submitReview() {
        const val = numberToRating(rating_value.value)
        console.log(val)
        const resp = await $fetch(`/api/user/drink/${props.cocktail.slug}/rating`, {
            method: "POST",
            body: {
                val: val
            }
        })
        console.log(resp)
    }
</script>