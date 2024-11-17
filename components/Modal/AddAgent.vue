<template>
  <VueFinalModal
    class="flex justify-center items-center"
    content-class="flex flex-row h-5/6 max-w-7xl bg-slate-600 p-8 rounded-xl"
  >
    <img 
      :src="'arts/' + AgentName + '.webp'"
      class="w-1/5 object-cover"
    />
    <div
      class="flex flex-col w-4/5 h-full"
    >
      <div
        class="flex flex-row w-full h-1/5 justify-between"
      >
        <div class="w-full h-20 text-center">1</div>
        <div class="w-full h-20 text-center">2</div>
        <div class="w-full h-20 text-center">3</div>
        <div class="w-full h-20 text-center">4</div>
        <div class="w-full h-20 text-center">5</div>
      </div>
      <div 
        class="flex flex-row h-4/5 w-full"
      >
        <div
          class="flex flex-col w-1/5 bg-gray-800 h-fit rounded-xl p-5 m-5"
        >
          <div>ATK: <span class="text-right">{{ 20 }}</span></div>
          <div>Crit DMG: {{  }}</div>
          <div>Crit Rate: {{  }}</div>
          <div>Anomaly Mastery: {{  }}</div>
          <div>Anomaly Proficiency: {{  }}</div>
          <div>Impact: {{ }}</div>
          <div>HP: {{  }}</div>
          <div>DEF: {{  }}</div>
        </div>
        <ItemDriver :AgentName />
      </div>
    </div>
  </VueFinalModal>
</template>

<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal';
const { AgentName } = defineProps(["AgentName"])
</script>