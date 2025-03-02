<template>
  <img 
    :class="'absolute w-1/5 disc-' + Partition"  
    :src="'/zzzoptimizer/_nuxt/assets/images/discs/' + set + '.webp'"
    @click="() => openDisc()"  
  />
</template>
<style>
.disc-1 {
  bottom: 70%;
  left: 19.8%;
}
.disc-2 {
  bottom: 38.5%;
  left: 7%;
}
.disc-3 {
  bottom: 7%;
  left: 19.8%;
}
.disc-4 {
  bottom: 7%;
  left: 59.6%;
}
.disc-5 {
  bottom: 38.5%;
  left: 72.5%;
}
.disc-6 {
  bottom: 70%;
  left: 59.6%;
}
</style>
<script setup>
import { useModal } from 'vue-final-modal';
import AddDisc from '../Modal/AddDisc.vue';
import DiscList from '../Modal/DiscList.vue';

const { DiscID, Partition } = defineProps(["DiscID", "Partition"]);
const discs = (localStorage.getItem("discs") ? JSON.parse(localStorage.getItem("discs")) : {})
const disc = (Object.hasOwn(discs, DiscID) ? discs[DiscID] : {id: -1, set: "empty", part: Partition, main: "empty", sub: []})
const { set, part } = disc

const openDisc = useModal({
  component: AddDisc,
  attrs: {
    DiscID: DiscID
  }
}).open

const openList = useModal({
  component: DiscList,
  attrs: {
    filter: [
      ("part-" + Partition)
    ]
  }
}).open
</script>