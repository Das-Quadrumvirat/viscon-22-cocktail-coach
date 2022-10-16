<template>
    <div>
        <SingleRatingView :value="num_value" :idx="idx" />
        <h2>{{ rating.username }}</h2>
    </div>
</template>

<script setup>
function ratingToNumber(rating) {
    switch (rating) {
        case 'One':
            return 1.0 
        case 'Two':
            return 2.0
        case 'Three':
            return 3.0
        case 'Four':
            return 4.0
        case 'Five':
            return 5.0
    } 
}

const props = defineProps(['rating', 'idx'])

const num_value = ratingToNumber(props.rating.value)
</script>