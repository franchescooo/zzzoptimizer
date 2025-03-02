<template>
  <div
    class="flex flex-row bg-zinc-600 p-5 m-5 w-fit"
  >
    <div
      v-for="agent in agents"
      :key="agent.value"
      class=""
      @click="() => 0"
    >
      <img :src="'../' + agentList[agent.value].icon">
    </div>  
  </div> 
</template>
<script setup>
import agentList from "assets/data/agentList.json"
const agents = [
  ref("Yanagi"),
  ref("Seth"),
  ref("Burnice")
]
</script>