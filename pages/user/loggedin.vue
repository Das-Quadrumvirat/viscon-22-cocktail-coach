<template>
    <div class="hero min-h-screen">
        <div>
            <h1 class="text-3xl">Hello {{ username }}!</h1>
            <NuxtLink to="/" class="grid grid-cols-1 grid-rows-1">
                <button class="btn btn-primary ">HOME</button>
            </NuxtLink>
        </div>
    </div>
</template>

<script setup>
const username = useCookie("username")
</script>