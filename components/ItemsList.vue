<script setup>
const { items } = defineProps(['items'])
</script>
<template>
<div>
    <a 
        v-for="item in items"
        :key="item"
    >{{ item }}</a>
</div>
</template>