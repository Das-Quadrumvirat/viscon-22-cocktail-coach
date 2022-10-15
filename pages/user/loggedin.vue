<template>
    <div>
        <h1>Hello {{ username }}</h1>
    </div>
</template>

<script setup>
const username = useCookie("username")
</script>