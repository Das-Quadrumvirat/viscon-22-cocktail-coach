<template>
    <div>
        <div class="absolute top-0 navbar mb-8 px-8 py-4 z-50">
            <button @click="back" class="btn btn-ghost">
                <font-awesome-icon icon="fa-solid fa-arrow-left" />
            </button>
        </div>
        <Cocktail :cocktail="cocktail" />
    </div>
</template>

<script>
export default {
    methods: {
        back(event) {
            const router = useRouter()
            router.back()
        }
    }
}
</script>

<script setup>
    import Cocktail from '~~/components/cocktail.vue'

    const route = useRoute()
    const {data: cocktail} = await useFetch(`/api/drink/${route.params.slug}`)
</script>
