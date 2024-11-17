<template>
  <VueFinalModal
    class="flex justify-center items-center"
    content-class="flex justify-center items-center flex-wrap w-5/6"
  >
    <CardAgent 
      v-for="agent in agentList"
      :key="agent.name"
      :AgentName="agent.name"
      :AgentRank="agent.rang"
      :AgentIcon="agent.icon"
    />
  </VueFinalModal>
</template>
<script setup lang="js">
import { VueFinalModal } from 'vue-final-modal';
import agentList from '@/assets/data/agentList.json'
</script>
