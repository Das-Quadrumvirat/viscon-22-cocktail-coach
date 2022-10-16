<template>
    <div
        @click="toggle"
        class="card md:w-56 w-40 md:h-56 h-44 my-4 md:my-6 bg-primary shadow-xl m-2 md:m-4 text-white hover:scale-110 ease-in duration-[50ms] cursor-pointer"
        :class="{ 'bg-secondary': selected }"
    >
        <div class="place-content-center items-center relative card-body">
      <div class="flex flex-row justify-center">
            <h2 class="text-center text-xl md:text-3xl card-title">{{ name }}</h2>
            <a @click.stop class="my-auto hover:text-gray-300 absolute top-2 right-2 hover:scale-125 p-2 rounded-lg" :href="'/ingredient/' + slug">
                <font-awesome-icon class="text-lg md:text-2xl" icon="fa-circle-info" />
            </a>
        </div>
            <img :src="'https://thecocktaildb.com/images/ingredients/' + encodeURI(name) + '.png'"/>
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
