<template>
  <UIItemCard>
    <div
      class="flex bg-zinc-700 rounded-md agent-card"
      @click="() => open()"
    >
      <img 
        class="flex w-1/3"
        :src="AgentIcon" 
      />
      <div class="bg-sky-300 m-2 p-1 h-fit w-2/3 text-center rounded-md text-m">
        {{ AgentName }}
      </div>
    </div>
  </UIItemCard>
</template>
<script setup>
import { useModal } from 'vue-final-modal';
import AddAgent from '../Modal/AddAgent.vue';


const { AgentName, AgentRank, AgentIcon } = defineProps(['AgentName', 'AgentRank', 'AgentIcon'])

const { open, close } = useModal({
  component: AddAgent,
  attrs: {
    "AgentName": AgentName
  }
})
</script>
<style>
.agent-card {
  width: 260px;
  margin-top: 10px;
  margin-left: 10px;
}
</style>