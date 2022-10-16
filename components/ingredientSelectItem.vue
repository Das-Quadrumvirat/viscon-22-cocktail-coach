<template>
    <div
        @click="toggle"
        class="card md:w-56 w-32 md:h-56 h-44 bg-primary shadow-xl m-4 text-white hover:scale-110 ease-in duration-[50ms] cursor-pointer"
        :class="{ 'bg-secondary': selected }"
    >
        <div class="place-content-center items-center card-body">
            <h2 class="text-center text-xl md:text-3xl card-title">{{ name }}</h2>
      <div class="flex flex-row justify-between">
            <a @click.stop class="bg-black bg-opacity-40 my-auto p-2 rounded-lg" :href="'/ingredient/' + slug">
                <font-awesome-icon class="text-2xl" icon="fa-share-from-square" />
            </a>
            <img :src="'https://thecocktaildb.com/images/ingredients/' + encodeURI(name) + '.png'"/>
        </div>
        </div>
    </div>
</template>

<script setup>
    import { useStore } from '~/stores/state'

    const { slug, name, selected } = defineProps(['slug', 'name', 'selected'])

    const store = useStore()

    function toggle() {
        store.toggleIngredientSelected(slug)
    }
</script>
