<template>
<div class="hero min-h-screen">
    <div class="hero-content flex flex-col">

        <h1 class="text-7xl mb-8">Cocktail Coach by</h1>
        <h1 class="text-9xl font-bold mb-8">Das &sup2;virat</h1>
        <button class="btn btn-primary text-4xl" @click="go">Go!</button>
    </div>
</div>
</template>

<script setup>
function go() {
    document.location.pathname = '/'
}
</script>
