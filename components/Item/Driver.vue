<template>
  <div
    class="driver"
  >
    <img class="w-full h-full object-contain object-right box-content" src="~/assets/images/UI/driver.png" />
    <ItemDisc
      v-for="part in 6"
      :key="part"
      :DiscID="discs[part]"
      :Partition="String(part)"
    />
  </div>
</template>

<style>
.driver {
  position: relative;
  height: 100%;
  aspect-ratio: 8 / 7;
}
</style>

<script setup>
const { AgentName } = defineProps(["AgentName"]);
const discs = [0, 0, 0, 0, 0, 0, 0]
</script>