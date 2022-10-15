<template>
    <div class="mb-5">
        <div class="sticky top-0 navbar flex-wrap bg-base-100 mb-8 border-b-[0.5px] px-8 z-50">
            <div class="flex-grow">
                <a href="#" class="btn btn-ghost normal-case text-white mt-5 text-4xl">Cocktail Coach</a>
            </div>
            <div class="flex-grow justify-end my-4 sm:my-0">
                <div class="form-control flex-grow ml-4 sm:max-w-sm">
                    <input type="text" placeholder="Search Cocktail" class="input input-bordered text-white" @focus="search">
                </div>
            </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12 mx-8 md:mx-auto md:max-w-[80%]">
            <a :href="`/cocktail/${recommendations.month.slug}`" class="card w-full shadow-xl group transition-[background-size] bg-center bg-[length:100%_auto] hover:bg-[length:105%_auto]" :style="{
                'background-image': 'url(' + recommendations.month.drinkThumb + ')'
            }">
                <div class="absolute w-full h-full bg-black transition-[background-opacity] bg-opacity-50 group-hover:bg-opacity-70 z-10"></div>
                <div class="card-body z-20 md:h-48">
                    <h2 class="card-title text-white md:text-3xl">Cocktail of the Month</h2>
                    <p>{{ recommendations.month.name }}</p>
                </div>
            </a>
            <a :href="`/cocktail/${recommendations.week.slug}`" class="card w-full shadow-xl group transition-[background-size] bg-center bg-[length:100%_auto] hover:bg-[length:105%_auto]" :style="{
                'background-image': 'url(' + recommendations.week.drinkThumb + ')'
            }">
                <div class="absolute w-full h-full bg-black transition-[background-opacity] bg-opacity-50 group-hover:bg-opacity-70 z-10"></div>
                <div class="card-body z-20 md:h-48">
                    <h2 class="card-title text-white md:text-3xl">Cocktail of the Week</h2>
                    <p>{{ recommendations.week.name }}</p>
                </div>
            </a>
            <a :href="`/cocktail/${recommendations.day.slug}`" class="card w-full shadow-xl group transition-[background-size] bg-center bg-[length:100%_auto] hover:bg-[length:105%_auto]" :style="{
                'background-image': 'url(' + recommendations.day.drinkThumb + ')'
            }">
                <div class="absolute w-full h-full bg-black transition-[background-opacity] bg-opacity-50 group-hover:bg-opacity-70 z-10"></div>
                <div class="card-body z-20 md:h-48">
                    <h2 class="card-title text-white md:text-3xl">Cocktail of the Day</h2>
                    <p>{{ recommendations.day.name }}</p>
                </div>
            </a>
            <a href="/cocktail/random" class="card w-full shadow-xl group transition-[background-size] bg-center bg-[length:100%_auto] hover:bg-[length:105%_auto]" :style="{
                'background-image': 'url(' + random.drinkThumb + ')'
            }">
                <div class="absolute w-full h-full bg-black transition-[background-opacity] bg-opacity-50 group-hover:bg-opacity-70 z-10"></div>
                <div class="card-body z-20 md:h-48">
                    <h2 class="card-title py-3 text-white md:text-3xl">Get a Random Cocktail!</h2>
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
            offset: 17,
            limit: 50,
        }
    })
</script>
