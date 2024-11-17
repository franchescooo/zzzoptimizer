<template>
  <VueFinalModal
    class="flex justify-center items-center"
    content-class="flex flex-row h-5/6 w-fit max-w-5/6 bg-slate-600 p-8 rounded-xl"
  >
    <img
      :src="'/zzzoptimizer/_nuxt/assets/images/discs/' + set + '.webp'"
      class="h-1/4 m-5"  
    />
    <div
      class="flex flex-col h-fit"
    >
      <div
        v-for="param in params"
        :key="param.value.name"
        class="flex flex-row"
      >
        <USelect
          class="w-96"
          :options="stats"
          option-attribute="name"
          v-model="selected_stat"
        />
        <URange 
          class="p-2"
          v-model="stat_value" 
          :min="1" 
          :max="6"  
        />
      </div>
    </div>
    <UButton 
      class="h-10"
    >Сохранить</UButton>
  </VueFinalModal>
</template>
<script setup lang="js">
import { VueFinalModal } from 'vue-final-modal';

const { DiscID } = defineProps(["DiscID"])
const discs = (localStorage.getItem("discs") ? JSON.parse(localStorage.getItem("discs")) : {})
const disc = (Object.hasOwn(discs, DiscID) ? discs[DiscID] : {set: "ThunderMetal"})
const { set, part, main, props } = disc

const params = [ref({name: "1", val: 1}), ref({name: "2", val: 1}), ref({name: "3", val: 1}), ref({name: "4", val: 1})]
</script>