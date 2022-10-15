<template>
    <div class="mb-5">
        <div class="navbar bg-base-100 mb-5 px-5">
            <div class="flex-1">
                <a href="#" class="btn btn-ghost normal-case text-xl">Cocktail Coach</a>
            </div>
            <div class="flex-none">
                <div class="form-control">
                    <input type="text" placeholder="Search Cocktail" class="input input-bordered" @focus="search">
                </div>
            </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-4">
            <NuxtLink :to="`/cocktail/${recommendations.month.slug}`" class="card w-full bg-base-100 shadow-xl image-full">
                <figure><img :src="recommendations.month.drinkThumb" :alt="recommendations.month.name" /></figure>
                <div class="card-body">
                    <h2 class="card-title">Cocktail of the Month</h2>
                    <p>{{ recommendations.month.name }}</p>
                </div>
            </NuxtLink>
            <NuxtLink :to="`/cocktail/${recommendations.week.slug}`" class="card w-full bg-base-100 shadow-xl image-full">
                <figure><img :src="recommendations.week.drinkThumb" :alt="recommendations.week.name" /></figure>
                <div class="card-body">
                    <h2 class="card-title">Cocktail of the Week</h2>
                    <p>{{ recommendations.week.name }}</p>
                </div>
            </NuxtLink>
            <NuxtLink :to="`/cocktail/${recommendations.day.slug}`" class="card w-full bg-base-100 shadow-xl image-full">
                <figure><img :src="recommendations.day.drinkThumb" :alt="recommendations.day.name" /></figure>
                <div class="card-body">
                    <h2 class="card-title">Cocktail of the Day</h2>
                    <p>{{ recommendations.day.name }}</p>
                </div>
            </NuxtLink>
            <div class="card w-full bg-base-100 shadow-xl image-full">
                <figure><img :src="random.drinkThumb" :alt="random.name" /></figure>
                <div class="card-body">
                    <h2 class="card-title">Get a Random Cocktail!</h2>
                    <div class="card-actions justify-end">
                        <NuxtLink to="/cocktail/random" class="btn btn-primary">Go</NuxtLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        search(event) {
            console.log('Foo')
            const router = useRouter();
            //router.push('/search')
        }
    }
}
</script>

<script setup>
    const {data: recommendations} = await useFetch('/api/drink/recommendation/all')
    const {data: random} = await useFetch('/api/drink/random')
</script>
