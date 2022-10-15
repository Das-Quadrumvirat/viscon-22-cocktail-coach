<template>
    <div class="mb-5">
        <div class="navbar bg-base-100 mb-5 px-5">
            <div class="flex-1">
                <a href="#" class="btn btn-ghost normal-case mt-5 text-2xl">Cocktail Coach</a>
            </div>
            <div class="flex-none">
                <div class="form-control">
                    <input type="text" placeholder="Search Cocktail" class="input input-bordered" @focus="search">
                </div>
            </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 md:gap-12 mt-10 mx-16 md:mx-12">
            <a rel="noopener noreferrer" :href="`/cocktail/${recommendations.month.slug}`" class="card w-full bg-base-100 shadow-xl image-full before:opacity-50">
                <figure><img :src="recommendations.month.drinkThumb" :alt="recommendations.month.name" /></figure>
                <div class="card-body">
                    <h2 class="card-title">Cocktail of the Month</h2>
                    <p>{{ recommendations.month.name }}</p>
                </div>
            </a>
            <a rel="noopener noreferrer" :href="`/cocktail/${recommendations.week.slug}`" class="card w-full bg-base-100 shadow-xl image-full before:opacity-50">
                <figure><img :src="recommendations.week.drinkThumb" :alt="recommendations.week.name" /></figure>
                <div class="card-body">
                    <h2 class="card-title">Cocktail of the Week</h2>
                    <p>{{ recommendations.week.name }}</p>
                </div>
            </a>
            <a rel="noopener noreferrer" :href="`/cocktail/${recommendations.day.slug}`" class="card w-full bg-base-100 shadow-xl image-full before:opacity-50">
                <figure><img :src="recommendations.day.drinkThumb" :alt="recommendations.day.name" /></figure>
                <div class="card-body">
                    <h2 class="card-title">Cocktail of the Day</h2>
                    <p>{{ recommendations.day.name }}</p>
                </div>
            </a>
            <div class="card w-full bg-base-100 shadow-xl image-full before:opacity-60">
                <figure><img :src="random.drinkThumb" :alt="random.name" /></figure>
                <div class="card-body">
                    <h2 class="card-title">Get a Random Cocktail!</h2>
                    <div class="card-actions justify-end">
                        <NuxtLink to="/cocktail/random" class="btn btn-primary">Go</NuxtLink>
                    </div>
                </div>
            </div>
        </div>
      <div class="my-12">
      <ListCocktail :cocktails="cocktails"/>
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
    const {data: cocktails} = await useFetch('/api/drinks', {
        params: {
            offset: 16,
            limit: 50,
        }
    })
</script>
