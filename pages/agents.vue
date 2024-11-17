<template>
  <NuxtLayout>
    <button @click="() => open()"> Добавить что-то </button>
    <ItemsList :items/>
  </NuxtLayout>
</template>
<script setup lang="ts">
import { useModal } from 'vue-final-modal';
import AgentList from '~/components/Modal/AgentList.vue';

const items = reactive({Name: "Pudge"})

const { open, close } = useModal({
  component: AgentList,
})
</script>