<template>
    <div>
        <div class="absolute top-0 navbar flex-wrap bg-base-100 mb-8 mt-4 pb-4 border-b-[0.5px] px-8 z-50">
            <div class="flex-grow">
                <a href="/" class="btn btn-ghost normal-case text-white text-4xl">Cocktail Coach</a>
            </div>
            <div class="flex-none justify-end my-4 md:my-0">
                <NuxtLink to="/ingredients" class="btn btn-ghost normal-case text-xl">
                    My Ingredients
                </NuxtLink>
            </div>
            <div class="flex-grow md:flex-grow-0 justify-end my-4 md:my-0">
                <div class="form-control flex-grow ml-4 md:max-w-sm">
                    <input type="text" placeholder="Search Cocktail" class="input input-bordered text-white"
                        @focus="search" />
                </div>
            </div>
        </div>
        <h1 class="hero min-h-screen text-4xl text-error">⚠️ There was an error logging you in. Please try again.</h1>
    </div>
</template>

<script setup>
</script>