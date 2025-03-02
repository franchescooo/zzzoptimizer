<template>
  <NuxtLayout>
    <button @click="() => openAddDisc()"> Добавить диск </button>
    <ItemsList :items/>
  </NuxtLayout>
</template>
<script setup lang="ts">
import { useModal } from 'vue-final-modal';
import AddDisc from '~/components/Modal/AddDisc.vue';

const items = reactive({Name: "Pudge"})

const openAddDisc = useModal({
  component: AddDisc,
}).open
</script>