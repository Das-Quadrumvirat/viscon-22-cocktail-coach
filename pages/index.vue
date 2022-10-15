<template>
    <div class="mb-5">
        <div class="sticky top-0 navbar bg-base-100 mb-12 border-b-[0.5px] px-8 py-4 z-50">
            <div class="flex-grow">
                <a href="#" class="btn btn-ghost normal-case text-white text-4xl">Cocktail Coach</a>
            </div>
            <div class="flex-none gap-2">
                <NuxtLink to="/ingredients" class="btn btn-ghost normal-case">
                    My Ingredients
                </NuxtLink>
                <div class="form-control">
                    <input type="text" placeholder="Search Cocktail" class="input input-bordered text-white" @focus="search">
                </div>
            </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12 mx-8">
            <a :href="`/cocktail/${recommendation.slug}`" class="card w-full shadow-xl group transition-[background-size] bg-center bg-[length:100%_auto] hover:bg-[length:105%_auto]" :style="{
                'background-image': 'url(' + recommendation.drinkThumb + ')'
            }" v-for="(recommendation, key) in {'Month': recommendations.month, 'Week': recommendations.week, 'Day': recommendations.day}">
                <div class="absolute w-full h-full bg-black transition-[background-opacity] bg-opacity-50 group-hover:bg-opacity-70 z-10"></div>
                <div class="card-body z-20 py-10">
                    <h2 class="card-title text-white">Cocktail of the {{ key }}</h2>
                    <p>{{ recommendation.name }}</p>
                </div>
            </a>
            <a href="/cocktail/random" class="card w-full shadow-xl group transition-[background-size] bg-center bg-[length:100%_auto] hover:bg-[length:105%_auto]" :style="{
                'background-image': 'url(' + random.drinkThumb + ')'
            }">
                <div class="absolute w-full h-full bg-black transition-[background-opacity] bg-opacity-50 group-hover:bg-opacity-70 z-10"></div>
                <div class="card-body z-20">
                    <h2 class="card-title py-3 text-white">Get a Random Cocktail!</h2>
                </div>
            </a>
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
            router.push('/search')
        }
    }
}
</script>

<script setup>
    const {data: recommendations} = await useFetch('/api/drink/recommendation/all')
    const {data: random} = await useFetch('/api/drink/random')
    const {data: cocktails} = await useFetch('/api/drinks', {
        params: {
            offset: 17,
            limit: 50,
        }
    })
</script>
