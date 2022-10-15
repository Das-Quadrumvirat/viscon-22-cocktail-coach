<template>
    <div
        @click="toggle"
        class="card md:w-56 w-32 md:h-56 h-44 bg-primary shadow-xl m-4 text-white hover:scale-110 ease-in duration-[50ms]"
        :class="{ 'bg-secondary': selected }"
    >
        <div class="place-content-center items-center card-body">
            <h2 class="text-center text-xl card-title">{{ name }}</h2>
            <nuxt-link @click.stop class="bg-black bg-opacity-40 mt-4 p-2 rounded-lg" :to="'/ingredient/' + slug">
                <font-awesome-icon class="text-2xl" icon="fa-share-from-square" />
            </nuxt-link>
        </div>
    </div>
</template>

<script setup>
const { name, slug } = defineProps(['name', 'slug'])

function loadState() {
    return localStorage.getItem(`ing-${slug}-select`) === 'true'
}
function saveState(v) {
    localStorage.setItem(`ing-${slug}-select`, v)
}

let selected = ref(loadState())

function toggle() {
    selected.value = !selected.value
    saveState(selected.value)
}
</script>
