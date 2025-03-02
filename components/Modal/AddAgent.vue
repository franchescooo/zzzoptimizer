<template>
  <VueFinalModal
    class="flex justify-center items-center"
    content-class="flex flex-row h-5/6 max-w-7xl bg-slate-600 p-8 rounded-xl"
  >
    <img 
      :src="'arts/' + agentName + '.webp'"
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
        <ItemDriver :agentName />
      </div>
    </div>
  </VueFinalModal>
</template>

<script setup lang="js">
import { VueFinalModal } from 'vue-final-modal';
import agentData from '@/assets/data/agentData.json'

const { agentName } = defineProps(["agentName"])

const agentStats = agentData[agentName]["Stats"]
const agentCore = agentData[agentName]["core"]

const agentLVL = ref(60);
const agentProm = ref(6)

const coreStat = (stat) => {
  return (~~((agentProm.value + 1) / 2)) * (agentCore[0][0] == stat) * agentCore[0][1] + (~~(agentProm.value / 2)) * (agentCore[1][0] == stat) * agentCore[1][1]
}

const agentBase = {
  atk: () => (agentLVL * agentStats["atkperlvl"] + agentStats["atk"] + coreStat("atk")),
  hp: () => (agentLVL * agentStats["hpperlvl"] + agentStats["hp"] + coreStat("hp")),
  def: () => (agentLVL * agentStats["defperlvl"] + agentStats["def"] + coreStat("def")),
}
</script>