<template>
    <div>
        <h1 class="text-3xl">Hello {{ username }}</h1>
        <NuxtLink to="/">
            <button class="btn btn-primary">HOME</button>
        </NuxtLink>
    </div>
</template>

<script setup>
const username = useCookie("username")
</script>